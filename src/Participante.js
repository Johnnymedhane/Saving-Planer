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
    if (contributionAmount.trim() === "" || isNaN(contributionAmount)) {
      setError("Please enter a valid number");
      return;
    }

    onUpdateContribution(contributionAmount, id, goalID);
    setShowDeposit(prev => !prev);
    setContributionAmount('');
  }
  return (
    <li>
      <div className="participante">

        <img src={participante.image} alt={participante.id} />
        <h3>{participante.name}</h3>

        <span> contributed: {participante.contribution}$</span>
        <Button onClick={showDepositInput}>
          {showDeposit ? "Close" : " Add Contibution"}</Button>
      </div>
      {showDeposit &&
        <label>
          <input type="number" value={contributionAmount}
            onChange={(e) => setContributionAmount(e.target.value)} />
          <Button onClick={addContribution}>Add</Button>
          <p className="error">{error}</p>
        </label>}
    </li>
  );
}
