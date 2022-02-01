/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const listDivStyle = css`
  display: flex;
  justify-content: center;
  margin-top: 35px;
`;
const pStyle = css`
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;
const deleteButtonStyle = css`
  border-radius: 5px;
  background-color: #fff;
  border: 0.5px solid;
  padding: 1 2.5px;
  cursor: pointer;
  :hover {
    background-color: grey;
  }
`;
const listItemGridStyle = css`
  background-color: #eee;
  width: 300;
  padding: 5px 50px;
  border-bottom: solid 1px black;
  border-top: solid 1px black;
  border-right: solid 1px black;
  border-left: solid 1px black;
  border-radius: 10px;
  box-shadow: 2px 4px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;
const listGridStyle = css`
  display: grid;
  justify-content: stretch;
  background-color: #eee;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const listStyle = css`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

export default function GuestList({
  baseUrl,
  setListUpdate,
  listUpdate,
  newGuestList,
  filter,
}) {
  return (
    <div>
      <div css={listDivStyle}>
        <ul css={listStyle}>
          {newGuestList.map((guest) => {
            return (
              <div key={guest.id} css={listGridStyle}>
                <div key={guest.id} css={listItemGridStyle}>
                  <li key={guest.id}>
                    Guest {guest.id}: {'            '}
                    {guest.firstName.firstName}
                    {'            '}
                    {guest.lastName.lastName}
                    {'            '}
                    <br />
                    status:{guest.attending ? ' attending' : ' not coming'}
                    {'            '}
                    <br />
                    <button
                      css={deleteButtonStyle}
                      onClick={async () => {
                        await fetch(`${baseUrl}/guests/${guest.id}`, {
                          method: 'DELETE',
                        });
                        setListUpdate(!listUpdate);
                      }}
                    >
                      {' '}
                      Remove{' '}
                    </button>
                    <button
                      css={deleteButtonStyle}
                      onClick={async () => {
                        await fetch(`${baseUrl}/guests/${guest.id}`, {
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ attending: !guest.attending }),
                        });
                        setListUpdate(!listUpdate);
                      }}
                    >
                      {' '}
                      Update Status{' '}
                    </button>
                  </li>{' '}
                </div>
              </div>
            );
          })}
        </ul>
      </div>
      <p css={pStyle}>
        Number of {filter} {newGuestList.length}
      </p>
    </div>
  );
}
