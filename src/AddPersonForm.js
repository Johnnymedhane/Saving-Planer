import { useState } from "react";
import { Button } from "./Button";

export function AddPersonForm({ onAddPerson, id, closeForm, plan }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const amountLeft = plan.targetAmount - plan.savedAmount;

  const handleAddPerson = (e) => {
    e.preventDefault();

    if (!name || !amount) {
      setError("Please fill out all required fields.");
      return;
    }

    const newPerson = {
      name,
      contribution: parseFloat(amount),
      id: crypto.randomUUID(),
      image: `${image}?=${id}`,
    };

    onAddPerson(newPerson, id);
    resetForm();
    closeForm(prev => !prev);
  };

  const handleContribution = (e) => {
    let value = e.target.value.replace("$", '');

    if (!/^\d*\.?\d*$/.test(value)) {
      setError("Please enter a valid number");
      return;
    }

    if (value.length > 15 || value > amountLeft) {
      setError("Number is too large");
      return;
    }

    setError("");
    setAmount(value);
  };

  const resetForm = () => {
    setAmount('');
    setImage("https://i.pravatar.cc/48");
    setName('');
    setError('');
  };

  return (
    <form onSubmit={handleAddPerson}>
      <h4>Add new participant to your goal</h4>

      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </label>

      <label>
        Image:
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://i.pravatar.cc/48"
        />
      </label>

      <label>
        Contribution:
        <input
          className={error ? "invalid" : ""}
          type="text"
          value={amount}
          onChange={handleContribution}
          onFocus={() => amount && setAmount(amount.replace("$", ''))}
          onBlur={() => amount && !amount.endsWith("$") && setAmount(`${amount}$`)}
          placeholder="Contribution Amount"
        />
      </label>

      {error && <p className="error">{error}</p>}
      
      <Button type="submit">Add Person</Button>
    </form>
  );
}
