import Part from "./Part.jsx";
function Content(props) {
  return (
    <>
      {props.contents.map((content, index) => (
        <Part key={index} content={content} />
      ))}
    </>
  );
}
export default Content;
