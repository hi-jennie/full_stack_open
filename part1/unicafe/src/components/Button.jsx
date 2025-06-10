function Button({ onClick, text }) {
  const buttonStyle = {
    backgroundColor: "lightgrey",
    border: "1px solid #ccc",
    padding: "5px 10px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
    margin: "3px",
    transition: "background-color 0.3s ease",
  };

  return (
    <button onClick={onClick} style={buttonStyle}>
      {text}
    </button>
  );
}
export default Button;
