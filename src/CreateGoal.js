import { useState } from "react";
import { Button } from "./Button";

export function CreateGoal({ onSubmit }) {
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [deposit, setDeposit] = useState('');
  const [depositIsValid, setDepositIsValid] = useState(false);
  const [targetAmountIsValid, setTrgetAmountIsValid] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();

    if (!goalName || !targetAmount || !deadline) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }
    const newGoal = {
      id: crypto.randomUUID(),
      goalName,
      targetAmount: parseFloat(targetAmount),
      deadline,
      description,
      savedAmount: parseFloat(deposit), // Default to 0 at the start
      participants: [
        {
          name: "Admin",
          contribution: parseFloat(deposit),
          id: crypto.randomUUID(),
          image: "https://i.pravatar.cc/48?id",
        }
      ]
    };
    onSubmit(newGoal);

    setErrorMessage(""); // Clear error if fields are valid
    console.log("Goal submitted:", { goalName, targetAmount, deadline, description });
    setDeadline('');
    setDescription('');
    setGoalName('');
    setTargetAmount('');
    setDeposit('');
  }

  function handleDepositField(e) {
    let value = e.target.value.replace("$", '');
    if (!/^\d*\.?\d*$/.test(value)) {
      setErrorMessage("Please enter a valid number");
      setDepositIsValid(!depositIsValid);
      return;
    }
    if (value.length > 15) {
      setErrorMessage("Number is too large");
      return;
    }
    if(parseFloat(value) >= parseFloat(targetAmount)) {
      setErrorMessage("Initial contribution should less than TargetAmout");
      return;
    }
    setErrorMessage("");
    setDeposit(value);
    setDepositIsValid(false);
  }

  function handleTargetAmountitField(e) {
    let value = e.target.value.replace("$", "");
    if (!/^\d*\.?\d*$/.test(value)) {
      setErrorMessage("Please enter a valid number");
      setTrgetAmountIsValid(!targetAmountIsValid);
      return;
    }
    if (value.length > 15) {
      setErrorMessage("Number is too large");
      return;
    }
    setErrorMessage("");
    setTargetAmount(value);
    setTrgetAmountIsValid(false);
  }
  
  function handleDateInput(e) {
    const selectDate = e.target.value;
    const today = new Date().toISOString().split('T')[0];
    console.log(today)
    if (selectDate < today) {
      setErrorMessage('Deadline must be a future date.')
      return;
    }
    setErrorMessage('');
    setDeadline(selectDate);
  }

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <h2>Create a Savings Goal</h2>
      <label>
        Goal Name:
        <input
          type="text"
          placeholder="Enter Goal name"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)} />
      </label>
      <label>
        Target Amount $:
        <input
          type="text" className={targetAmountIsValid ? "invalid" : ''}
          style={{ width: "140px" }}
          placeholder="Enter target amount"
          value={targetAmount}
          onChange={handleTargetAmountitField}
          onFocus={(e) => {
            if (targetAmount) setTargetAmount(targetAmount.replace("$", ""));
          }}
          onBlur={(e) => {
            if (targetAmount && !targetAmount.endsWith("$")) setTargetAmount(`${targetAmount}$`);
          }} />
      </label>
      <label>
        Deadline:
        <input
          type="date"
          value={deadline}
          min={new Date().toISOString().split('T')[0]}
          onChange={handleDateInput} />
      </label>
      <label>Initial Deposit:
        <input
          className={depositIsValid ? "invalid" : ''}
          type="text" style={{ width: "140px" }}
          placeholder="Deposit"
          value={deposit}
          onChange={handleDepositField}
          onFocus={(e) => {
            if (deposit) setDeposit(deposit.replace("$", ""));
          }}
          onBlur={(e) => {
            if (deposit && !deposit.endsWith("$")) setDeposit(`${deposit}$`);
          }} />
      </label>
      <label>
        Description:
        <textarea
          placeholder="Add a brief description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} />
      </label>
      <p>{errorMessage}</p>
      <Button type="submit">Add Goal</Button>
    </form>
  );
}
