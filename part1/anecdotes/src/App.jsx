import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [maxVotes, setMaxVotes] = useState([]);

  const [selected, setSelected] = useState(0);

  const handleNextAnecdote = () => {
    // Math.random() generates a random number between 0 (inclusive) and 1 (exclusive).
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  // 这个需要稍微琢磨一下，有点tricky
  // 每次投票后，更新votes数组和maxVotes数组
  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    const newMaxVotes = [];
    for (let i = 0; i < votes.length; i++) {
      if (newVotes[i] === Math.max(...newVotes)) {
        newMaxVotes.push(i);
      }
    }
    setMaxVotes(newMaxVotes);
    setVotes(newVotes);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <br></br>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>

      <h1>Anecdote with the most votes</h1>
      {maxVotes.length > 0 &&
        maxVotes.map((index) => (
          <div key={index}>
            <p>{anecdotes[index]}</p>
          </div>
        ))}
    </div>
  );
};

export default App;
