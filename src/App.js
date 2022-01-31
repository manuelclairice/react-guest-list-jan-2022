import './App.css';
import { useEffect, useState } from 'react';
import GuestListInput from './GuestListInput';

function App() {
  const baseUrl = 'https://manuel-guest.herokuapp.com/';
  const [list, setList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guestData, setGuestData] = useState('');
  const [filteredGuestData, setFilteredGuestData] = useState('');



  console.log(filteredGuestData);

  useEffect(() => {
    async function fetchGuestdata () {
      const response = await fetch(`${baseUrl}/`);
      const allGuests = await response.json();

      setGuestData(allGuests);
      setFilteredGuestData(allGuests)
    }
    fetchGuestDta();

  }, []);

if (!filteredGuestData) {
  return (
    <div style={{ color: 'white', fontsize: '20px',}}>Loading...</div>
  );
}

const handleFirstNameChange = (event) => setFirstName(event.currentTarget.value);
const handleLastNameChange = (event) => setLastName(event.currentTarget.value);

  // CREATE NEW GUEST
  async function newGuest() {
    const response = await fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    });
    const createdGuest = await response.json();
    const stateCopy = [...filteredGuestData];
    stateCopy.push(createdGuest);
    setFilteredGuestData(stateCopy);
    setGuestData(stateCopy);
  }
    const handleAddclick = () => {
      setFirstName(firstName);
      setLastName(lastName);
      createNewGuest();
    };
    // return createdGuest;
  // }

  // const handleSubmit = (event) => {
  //   newGuest().catch((err) => {
  //     console.error(err);
  //   });
  //   event.preventDefault();
  };

  // DELETE GUEST
    async function removeGuest(id) {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
      });
      const removedGuest = await response.json();
      setFilteredGuestData(
        filteredGuestData.filter((deleteGuest) => deleteGuest.id !== removedGuest.id),
      );
      setGuestData(
        filteredGuestData.filter((deleteGuest) => deleteGuest.id !== removedGuest.id),
      );
    }
    const handleDeleteClick = (id) => {
      removeGuest(id);
    };

    const handleSelectChange = (event) =>{
      console.log(event.target);
      if (event.target.value === 'Attending') {
        setFilteredGuestData(guestData.filter((guest) => guest.attending === true));
      } else if (event.target.value === 'nonAttending') {
        setFilteredGuestData( guestData.filter((guest) => guest.attending === false),);
      } else {
        setFilteredGuestData(guestData);
      }
    };



  // EDIT GUEST

    async function editGuest(id, isAttending) {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attending: true }),
      });

      const updatedGuest = await response.json();
      const copyGuest = [...filteredGuestData];
      const findGuest = copyGuest.find(
        (foundGuest) => foundGuest.id === updatedGuest.id,);
      findGuest.attending = isAttending;

      setFilteredGuestData(copyGuest);
      setGuestData(copyGuest);
    }

    const handleEditClick = (id, guestAttending) => {
      if (!guestAttending) {
        editGuest(id, true);
      } else {
        editGuest(id, false);
      }
    };




  return (
    <div>
      <section>
        <div>
          <h1>Guest List</h1>
        </div>
        <div data-test-id="guest">
          <GuestListInput
          firstName={firstName}
          lastName={lastName}
          handleFirstNameChange={handleFirstNameChange}
          handleLastNameChange={handleLastNameChange}
          handleAddClick={handleAddClick} />
          <form onSubmit={event => event.preventDefault()}>
            <select></select>
            <div>
              {filterGuestData.map((guest) => {
                return(
                  <div key={guest.id}>
                <button onClick={() => handleDeleteClick(guest.id)} type="submit"></button>
                <button className={
                  guest.attending === true ? 'attendingTrue' : 'attendingFalse'
                } type="submit" onClick={() =>
                handleEditClick(guest.id, guest.attending)}>
                  {guest.attending === true ? ('') : ('')}
                </button>
                {`${guest.firstName} ${guest.lastName}`}
              </div>
                );

              } )}

            </div>
          </form>
          <form className={guest.data.length > 1 ? 'deleteAll' : 'none'}>
            <button
            type="submit"
            onClick={handleDeleteClick}>{`Delete all`}
            </button>
          </form>
          </div>

      </section>
    </div>
  );
            }

export default App
