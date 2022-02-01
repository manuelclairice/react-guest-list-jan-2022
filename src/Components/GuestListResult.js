/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const listDivStyle = css`
  display: flex;
  justify-content: center;
  margin-top: 35px;
`;
const pStyle = css`
  text-align: center;
`;
const deleteButtonStyle = css`
  border-radius: 5px;
  background-color: #fff;
  border: 0.5px solid;
  padding: 1 2.5px;
`;
const listItemGridStyle = css`
  background-color: #f5f5f5;
  width: 300;
  padding: 5px 50px;
  border-bottom: solid 1px black;
  border-top: solid 1px black;
  border-right: solid 1px black;
  border-left: solid 1px black;
  border-radius: 8px;
  box-shadow: 2px 4px;
`;
const listGridStyle = css`
  display: grid;
  justify-content: stretch;
  background-color: #f5f5f5;
`;

const listStyle = css`
  list-style-type: none;
  display: flex;
  flex-direction: column;
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
                        await fetch(`${baseUrl}${guest.id}`, {
                          method: 'DELETE',
                        });
                        setListUpdate(!listUpdate);
                      }}
                    >
                      {' '}
                      Delete Guest{' '}
                    </button>
                    <button
                      css={deleteButtonStyle}
                      onClick={async () => {
                        await fetch(`${baseUrl}${guest.id}`, {
                          method: 'PATCH',
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
