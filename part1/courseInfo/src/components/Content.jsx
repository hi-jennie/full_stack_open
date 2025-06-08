import Part from "./Part.jsx";
function Content(props) {
  return (
    <>
      {props.parts.map((content, index) => (
        <Part key={index} content={content} />
      ))}
    </>
  );
}
export default Content;
