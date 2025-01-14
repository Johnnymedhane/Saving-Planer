export function Button({ children, onClick, type = "buttn" }) {
  return <button className="button" type={type} onClick={onClick}>{children}</button>;
}
