import { useState } from "react";
import { CreateGoal } from "./CreateGoal";
import { Description } from "./Description";
import { Button } from "./Button";
/*
let goalList = [
   {
    id: crypto.randomUUID(),
    goalName: "Vacation",
    targetAmount: parseFloat(200),
    deadline: "02/07/25",
    description: "Travel to Japan",
    savedAmount: parseFloat(50), // Default to 0 at the start
    participants: [
      {
        name: "Admin",
        contribution: 50,
        id: crypto.randomUUID(),
        image: "https://i.pravatar.cc/48?u=499476",
      }
    ],
    
  },
] */

function App() {
  const [goals, setGoals]= useState([]);
  const [showForm, setShowForm] = useState(false);

  function handleGoalForm(newItem){
    setGoals(pre => [...pre, newItem]);
    console.log(goals)
    alert(`Saved Amount so far ${newItem.savedAmount}$`);
    setShowForm((prev) => !prev);
  }
  function toggleFormVisibility() {
    setShowForm((prev) => !prev);
  }
  
  function updateContribution(amount, participantId, goalId){
    setGoals((prevGoals) => prevGoals.map((goal) =>goal.id === goalId ?
    {
      ...goal,
      participants: goal.participants.map((participant) =>
      participant.id === participantId ? {
        ...participant, contribution: participant.contribution + parseFloat(amount)
      } : participant
    ), 
    savedAmount: goal.participants.reduce(
      (total, participant) =>
        participant.id === participantId
          ? total + participant.contribution + parseFloat(amount)
          : total + participant.contribution,
      0
    ),
  }
: goal
)
);
}

function addNewParticipante(newPerson, goalId) {
  setGoals((prev) =>
    prev.map((goal) => {
      if (goal.id === goalId) {
        const updatedParticipants = [...goal.participants, newPerson];
      
        // Calculate the new savedAmount
        const updatedSavedAmount = updatedParticipants.reduce(
          (total, participant) => total + participant.contribution,
          0
        );

        return {
          ...goal,
          participants: updatedParticipants,
          savedAmount: updatedSavedAmount, // Update savedAmount
        };
      }
      return goal;
    })
  );
}


  return (
    <div className="App">
       <Header onClick={toggleFormVisibility} formIsOpen={showForm} />   
   {showForm && <CreateGoal onSubmit={handleGoalForm}/>}
    <Description goal={goals} onAddperson={addNewParticipante}   onUpdateContribution={updateContribution}/>
    </div>

  );
}
function Header({onClick, formIsOpen}) {
  return (
    <div className="header">
      <h1>Welcome to Goal Tracker</h1>
      <p>
        Goal Tracker helps you set and track your financial savings goals.
        Create goals, monitor progress, and work towards achieving your dreams.
      </p>
      <Button onClick={onClick}>
        {formIsOpen ? "Close Form" : "Add New Goal"}
      </Button>
    </div>
  );
}


export default App;
