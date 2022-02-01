/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const filterStyle = css`
  display: flex;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  flex-direction: column;
  align-items: center;
  /* padding: 50px; */
  margin-bottom: 50px;
`;
const filterButtonStyle = css`
  height: 45px;
  border-radius: 10px;
  background-color: #fd576c;
  border-color: #fd435a;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  /* box-shadow: 0 0 0 6px rgb(253 87 108 / 25%); */
  transition: box-shadow 0.3s, background-color 0.3s;
  cursor: pointer;
  :hover {
    background-color: gold;
  }
  color: #fff;
  font-size: 15px;
  font-style: bold;
  text-align: center;
  font-weight: 500;
  width: 200px;
`;
const deleteButtonStyle = css`
  width: 100px;
  background-color: red;
  border-radius: 10px;
  color: #fff;
  margin: 20px;
  padding: 2px;
`;
export default function GuestListButtons({
  baseUrl,
  setListUpdate,
  listUpdate,
  setFilter,
  setNewGuestList,
  guestList,
  setGuestList,
}) {
  return (
    <div css={filterStyle}>
      <p>Filter by: </p>
      {'                                                  '}
      <button
        css={filterButtonStyle}
        onClick={() => {
          setFilter('all Guests: ');
          setListUpdate(!listUpdate);
          setNewGuestList(guestList);
        }}
      >
        All
      </button>
      <button
        css={filterButtonStyle}
        onClick={() => {
          setFilter('not Attending: ');
          setNewGuestList(
            guestList.filter((value) => value.attending === false),
          );
        }}
      >
        Not Attending
      </button>
      <button
        css={filterButtonStyle}
        onClick={() => {
          setFilter('attending Guests: ');
          setNewGuestList(
            guestList.filter((value) => value.attending === true),
          );
        }}
      >
        Attending
      </button>
      <div>
        <button
          css={deleteButtonStyle}
          onClick={async (guest) => {
            await fetch(`${baseUrl}${guest.id}`, {
              method: 'DELETE',
            });
            setGuestList([]);
            setListUpdate(!listUpdate);
          }}
        >
          {' '}
          Delete All{' '}
          {/* css={deleteButtonStyle}
          onClick={async () => {
            guestList.map(async (guest) => {
              await fetch(`${baseUrl}${guest.id}`, {
                method: 'DELETE',
              });
              setGuestList([]);
              setNewGuestList([]);
            });
            setListUpdate(!listUpdate);
            setFilter('all Guests: ');
          }}
        >
          Delete All */}
        </button>
      </div>
    </div>
  );
}
