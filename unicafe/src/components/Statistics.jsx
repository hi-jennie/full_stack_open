import Header from "./Header";
import StatisticLine from "./StatisticLine";
function Statistics({ good, neutral, bad }) {
  const calAverage = () => {
    const totalFeedback = good + neutral + bad;
    if (totalFeedback === 0) return 0;
    return (good - bad) / totalFeedback;
  };

  const calPositive = () => {
    const totalFeedback = good + neutral + bad;
    if (totalFeedback === 0) return 0;
    return (good / totalFeedback) * 100;
  };

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <Header text="Statistics" />
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <Header text="Statistics" />
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + neutral + bad} />
          <StatisticLine text="average" value={calAverage()} />
          <StatisticLine text="positive" value={`${calPositive()}%`} />
        </tbody>
      </table>
    </div>
  );
}
export default Statistics;
