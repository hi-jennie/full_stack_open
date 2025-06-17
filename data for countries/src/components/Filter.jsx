function Filter({ searchTerm, setSearchTerm }) {
  return (
    <form>
      <div>
        find countries{" "}
        <input
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            console.log("Search term:", e.target.value);
          }}
        />
      </div>
    </form>
  );
}
export default Filter;
