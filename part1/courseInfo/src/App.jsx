import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
function App() {
  const contents = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];
  return (
    <>
      <Header />
      <Content contents={contents} />
      <Total
        total={contents.reduce((sum, content) => sum + content.exercises, 0)}
      />
    </>
  );
}

export default App;
