import { useState } from "react";
import { Button } from "./Button";



export function Participante({ participante, goalID, onUpdateContribution, id }) {
  const [showDeposit, setShowDeposit] = useState(false);
  const [contributionAmount, setContributionAmount] = useState('');
  const [error, setError] = useState('');

  function showDepositInput() {
    setShowDeposit(pre => !pre);
  }

  function addContribution() {
      if (contributionAmount.trim() === "") {
       setError("Please enter a valid number");
        return;
     }

    onUpdateContribution(parseFloat(contributionAmount), id, goalID);
    setShowDeposit(prev => !prev);
    setContributionAmount('');
  }

  function handleContibutionInput(e) {
    let value = e.target.value;
    

    if (!/^\d*\.?\d*$/.test(value)) {
      setError("Please enter a valid number"); 
      return;
    }
   

    setError('');
    setContributionAmount(value);
  }

 
  return (
    <li>
      <div className="participante">

        <img src={participante.image} alt={participante.id} />
        <h4>{participante.name}</h4>

        <span> contributed: {participante.contribution}$</span>
        <Button onClick={showDepositInput}>
          {showDeposit ? "Close" : " Add Contibution"}</Button>
      </div>
      {showDeposit &&
      <>
        <label>
          <input type="text"
           value={contributionAmount}
            onChange={handleContibutionInput} 
            onFocus={(e) => {
              if (contributionAmount) setContributionAmount(contributionAmount.replace("$", ""));
            }}
            onBlur={(e) => {
              if (contributionAmount && !contributionAmount.endsWith("$")) setContributionAmount(`${contributionAmount}$`);
            }} 
            />
       <p className="error">{error}</p>
          <Button onClick={addContribution}>Add</Button>
        </label>
       </>}
    </li>
  );
}
