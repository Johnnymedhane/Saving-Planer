import { useState } from "react";
import { Button } from "./Button";

export function Participante({ participante, goalID, onUpdateContribution, id }) {
  const [showDeposit, setShowDeposit] = useState(false);
  const [contributionAmount, setContributionAmount] = useState('');
  const [error, setError] = useState('');

  // Toggle deposit input visibility
  function toggleDepositInput() {
    setShowDeposit((prev) => !prev);
  }

  // Add contribution to the participant
  function addContribution() {
    if (contributionAmount.trim() === "") {
      setError("Please enter a valid number");
      return;
    }

    onUpdateContribution(parseFloat(contributionAmount), id, goalID);
    setShowDeposit(false);
    setContributionAmount('');
    setError('')
  }

  // Handle input change for contribution
  function handleContributionInput(e) {
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
        <Button onClick={toggleDepositInput}>
          {showDeposit ? "Close" : "Add Contribution"}
        </Button>
      </div>

      {showDeposit && (
        <>
          <label>
            <input
              type="text"
              value={contributionAmount}
              onChange={handleContributionInput}
              onFocus={() => {
                if (contributionAmount) setContributionAmount(contributionAmount.replace("$", ""));
              }}
              onBlur={() => {
                if (contributionAmount && !contributionAmount.endsWith("$")) {
                  setContributionAmount(`${contributionAmount}$`);
                }
              }}
            />
            <p className="error">{error}</p>
            <Button onClick={addContribution}>Add</Button>
          </label>
        </>
      )}
    </li>
  );
}

