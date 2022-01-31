export default function GuestListInput({
  firstName,
  handleFirstNameChange,
  lastName,
  handleLastNameChange,
  handleAddClick,
}) {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <h1> Guest List</h1>
      <h2> Enter guests full name</h2>
      <div>
        <label htmlFor="firstName"> First Name</label>
        <input
          id="firstName"
          placeholder="John"
          value={firstName}
          onChange={handleFirstNameChange}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          placeholder="Doe"
          value={lastName}
          onChange={handleLastNameChange}
        />
        <button
          className="addButton"
          onClick={handleAddClick}
          /* type="submit" */
        >
          Add Guest
        </button>
      </div>
    </form>
  );
}
