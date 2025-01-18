import { useState, useEffect } from "react";
import { Button } from "./Button";
import { AddPersonForm } from "./AddPersonForm";
import { Participante } from "./Participante";

export function Plan({ plan, onUpdateContribution, onAddperson }) {
  const [addPersonForm, setAddPersonForm] = useState(false);
  const [star, setStar] = useState(0);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(plan.deadline));

  const percentage = (plan.savedAmount / plan.targetAmount) * 100;

  // Calculate time left
  function calculateTimeLeft(deadline) {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    const timeDiff = deadlineDate - currentDate;

    if (timeDiff <= 0 || plan.savedAmount === plan.targetAmount) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(plan.deadline));
    }, 1000);

    return () => clearInterval(timer);
  }, [plan.deadline]);

  // Animate progress
  useEffect(() => {
    if (star < percentage) {
      const progress = setInterval(() => {
        setStar((prev) => {
          if (prev < percentage) return prev + 1;
          clearInterval(progress);
          return prev;
        });
      }, 50);
      return () => clearInterval(progress);
    }
  }, [percentage, star]);

  const showCelebration = star === 100;

  return (
    <li>
      <h1>🎯 Saving Goal for {plan.goalName}</h1>
      <p>{plan.description}</p>

      <div className="indication">
        <h3>Your plan for {plan.goalName} is ready!</h3>

        <div className="description">
          <div className="contributions">
            <h4>Contributions</h4>
            <ul>
              {plan.participants.map((p) => {
                const contributionPercentage =
                  plan.savedAmount > 0 ? (p.contribution / plan.targetAmount) * 100 : 0;

                return (
                  <li key={p.id}>
                    <div className="percentage-contribution">
                      <p>
                        <strong>{p.name}</strong>
                      </p>
                      <div
                        className="contribution-bar"
                        style={{ width: `${contributionPercentage + 10}px` }}
                      >
                        <span>{contributionPercentage.toFixed()}%</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p>💰 Saved Amount: {plan.savedAmount}$</p>
          </div>

          <div
            className="chart"
            style={{
              background: `conic-gradient(${showCelebration ? "gold" : "darkblue"} ${
                star * 3.6
              }deg, #ededed 0deg)`,
              boxShadow: showCelebration ? "0 0 20px gold" : "none",
            }}
          >
            <span>{star}%</span>
            <span>Completed</span>
          </div>
        </div>

        <p>
          You have <strong>{timeLeft.days}</strong> days, <strong>{timeLeft.hours}</strong> hours,{" "}
          <strong>{timeLeft.minutes}</strong> minutes, and <strong>{timeLeft.seconds}</strong>{" "}
          seconds left to complete your goal.
        </p>

        {showCelebration && <h3 style={{ color: "gold" }}>🎉 Congratulations! Goal achieved! 🎉</h3>}
      </div>

      <h2 className="icon">
        <span className="material-symbols-outlined">groups_2</span> Group Management
      </h2>

      <div className="group-management">
        <h3>Participants</h3>
        <ul>
          {plan.participants.map((participante) => (
            <Participante
              key={participante.id}
              participante={participante}
              id={participante.id}
              goalID={plan.id}
              onUpdateContribution={onUpdateContribution}
            />
          ))}
        </ul>
        <Button onClick={() => setAddPersonForm((prev) => !prev)}>
          {addPersonForm ? "Close Form" : "Add New Participant"}
        </Button>
      </div>

      {addPersonForm && (
        <AddPersonForm
          onAddperson={onAddperson}
          id={plan.id}
          closeForm={setAddPersonForm}
          plan={plan}
        />
      )}
    </li>
  );
}

