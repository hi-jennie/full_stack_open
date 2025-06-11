import Part from "./Part.jsx";
function Content({ parts }) {
  return (
    <>
      {parts.map((exerciseContent, index) => (
        <Part key={index} exerciseContent={exerciseContent} />
      ))}
    </>
  );
}
export default Content;
