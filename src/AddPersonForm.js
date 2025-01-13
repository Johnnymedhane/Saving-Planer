import { useState } from "react";
import { Button } from "./App";



export function AddPersonForm({ onAddperson, id, closeForm }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [amount, setAmount] = useState('');

  const newPerson = {
    name,
    contribution: parseFloat(amount),
    id: crypto.randomUUID(),
    image: image || "https://i.pravatar.cc/48",
  };



  function handleAddPerson() {
    onAddperson(newPerson, id);
    setAmount('');
    setImage("https://i.pravatar.cc/48id");
    setName('');
    closeForm(pre => !pre);
  }

  return (
    <form>
      <h4> Add new participant to your goal</h4>
      <label> Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /></label>
      <label> Image: <input type="text" value={image} onChange={(e) => setImage(e.target.value)} /></label>
      <label> Contribution:<input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} /></label>
      <Button onclick={handleAddPerson}>Add Person</Button>
    </form>
  );
}
