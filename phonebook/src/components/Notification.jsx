function Notification({ message }) {
  if (message === null || message.content === "") {
    return null;
  }
  // 如果没有type，默认是"info"
  const type = message?.type ?? "info";
  const notificationStyle = {
    color: type === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return <div style={notificationStyle}>{message.content}</div>;
}
export default Notification;
