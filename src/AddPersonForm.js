import { useState } from "react";
import { Button } from "./Button";




export function AddPersonForm({ onAddperson, id, closeForm, plan }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');
  const [amount, setAmount] = useState('');
  const [error, setError] =useState('')
  
   const amountLeft = plan.targetAmount - plan.savedAmount;
  

  function handleAddPerson(e) {
    e.preventDefault();

    if (!name || !amount) {
      setError("Please fill out all required fields.");
      return;
    }
    const newPerson = {
      name,
      contribution: parseFloat(amount),
      id: crypto.randomUUID(),
      image:  `${image}?=${id}`,
    };

    onAddperson(newPerson, id);
    setAmount('');
    setImage("https://i.pravatar.cc/48id");
    setName('');
    setError('')
    closeForm(pre => !pre);

    
  }

  function handleContribution(e) {
    let value = e.target.value.replace("$", '');
    if(!/^\d*\.?\d*$/.test(value)){
      setError("Please enter a valid number");
      return;
    }
    if (value.length > 15 || value > amountLeft) {
      setError("Number is too large");
      return;
    }

    setError("");
    setAmount(value);
  }

  return (
    <form onSubmit={handleAddPerson}>
      <h4> Add new participant to your goal</h4>
      <label> Name: 
        <input type="text"
         value={name} 
         onChange={(e) => setName(e.target.value)}
         placeholder="name" />
         </label>
      <label> Image: 
        <input type="text"
         value={image}
         onChange={(e) => setImage(e.target.value)} 
         placeholder="https://i.pravatar.cc/48"/>
         </label>
      <label> Contribution:
        <input className={error ? "invalid" : ""}
        type="text" 
        value={amount} 
        onChange={handleContribution}
       onFocus={(e) => {
        if(amount) setAmount(amount.replace("$", ''))
       }}
      onBlur={(e) => {
        if(amount && !amount.endsWith("$")) setAmount(`${amount}$`)
      }}
        placeholder="contribut Amount" />
        </label>
      {error && <p className="error">{error}</p>}
      <Button type="submit">Add Person</Button>
    </form>
  );
}
