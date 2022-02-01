/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const filterStyle = css`
  display: flex;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 50px; */
  margin-bottom: 50px;
`;
const filterButtonStyle = css`
  width: 150px;
  background-color: #fff;
  border-radius: 3px;
  color: #000;
  margin: 1px;
  padding: 2px;
`;
const deleteButtonStyle = css`
  width: 150px;
  background-color: red;
  border-radius: 3px;
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
          Delete All
        </button>
      </div>
    </div>
  );
}
