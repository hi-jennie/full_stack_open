function Part({ exerciseContent }) {
  return (
    <div>
      <p>
        {exerciseContent.name} {exerciseContent.exercises}
      </p>
    </div>
  );
}

export default Part;
