import { Plan } from "./Plan";

export function Description({ goal, onUpdateContribution, onAddperson }) {
  return (
    <div className="goal-display">
      <ul>
        {goal.map((plan) => <Plan plan={plan} onUpdateContribution={onUpdateContribution} onAddperson={onAddperson} key={plan.id} />)}
      </ul>
    </div>
  );
}
