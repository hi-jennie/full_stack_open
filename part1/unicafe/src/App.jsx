import Header from "./components/Header";
import Button from "./components/Button";
import Statistics from "./components/Statistics";
import { useState } from "react";
function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    console.log("good clicked");
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    console.log("neutral clicked");
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    console.log("bad clicked");
  };

  return (
    <>
      <Header text="Give Feedback" />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
}

export default App;
