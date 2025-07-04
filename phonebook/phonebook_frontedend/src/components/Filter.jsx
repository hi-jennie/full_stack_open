function Filter({ filter, setFilter }) {
  return (
    <form>
      <div>
        filter shown with:{" "}
        <input
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </div>
    </form>
  );
}
export default Filter;
