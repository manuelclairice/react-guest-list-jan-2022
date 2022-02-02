/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import Buttons from './Components/GuestListButtons';
import GuestListInput from './Components/GuestListInput';
import GuestList from './Components/GuestListResult';

const loadingDiv = css`
  display: flex;
  margin: 20% 0 0 600px;
  background-color: #1e247a;
`;
const bodyStyle = css`
  background-color: #1e247a;
  width: 100vw;
  height: 120vh;
`;
export function App() {
  const baseUrl = 'https://manuel-react-guestlist-jan2022.herokuapp.com';

  const [guestList, setGuestList] = useState([]);
  const [newGuestList, setNewGuestList] = useState([]);
  const [fetch1, setFetch1] = useState(false);
  const [listUpdate, setListUpdate] = useState(true);
  const [filter, setFilter] = useState('all Guests:');

  useEffect(() => {
    fetch(`${baseUrl}/guests`)
      .then(
        (guestListApp) =>
          guestListApp.json().then((data) => {
            setGuestList(data);
            setNewGuestList(data);
          }),
        setFetch1(false),
      )
      .catch((err) => {
        console.error(err);
      });
  }, [listUpdate]);

  if (fetch1) {
    return (
      <div>
        <h1 css={loadingDiv}>Loading...</h1>
      </div>
    );
  }
  return (
    <div css={bodyStyle}>
      <div data-test-id="guest">
        <GuestListInput
          baseUrl={baseUrl}
          listUpdate={listUpdate}
          setListUpdate={setListUpdate}
          onClick={() => setListUpdate(!listUpdate)}
        />

        <GuestList
          baseUrl={baseUrl}
          listUpdate={listUpdate}
          setListUpdate={setListUpdate}
          newGuestList={newGuestList}
          filter={filter}
        />
        <Buttons
          baseUrl={baseUrl}
          listUpdate={listUpdate}
          setListUpdate={setListUpdate}
          newGuestList={newGuestList}
          setFilter={setFilter}
          setNewGuestList={setNewGuestList}
          setGuestList={setGuestList}
          guestList={guestList}
        />
      </div>
    </div>
  );
}

export default App;
