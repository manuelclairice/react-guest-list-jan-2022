/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

const headerStyle = css`
  background-color: #eee;
  text-align: center;
  padding: 10px 15px;
  margin: 8px 8px 20px;
  border-radius: 10px;
`;

const formStyle = css`
  display: flex;
  justify-content: center;
`;

const inputStyle = css`
  color: grey;
  display: inline-flex;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  width: 200px;
  height: 40px;
  padding-left: 10px;
  border-radius: 10px;
`;
const buttonStyle = css`
  height: 45px;
  border-radius: 10px;
  background-color: #fd576c;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  /* box-shadow: 0 0 0 6px rgb(253 87 108 / 25%); */
  transition: box-shadow 0.3s, background-color 0.3s;
  cursor: pointer;
  :hover {
    background-color: gold;
  }
  color: #fff;
  border-color: #fd435a;
  font-size: 15px;
  font-style: normal;
  text-align: center;
  font-weight: 500;
  width: 200px;
`;
export default function GuestInputField({
  listUpdate,
  setListUpdate,
  baseUrl,
}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  return (
    <div>
      <h1 css={headerStyle}>Guest List</h1>
      <form css={formStyle}>
        <input
          css={inputStyle}
          // type="text"
          value={firstName}
          placeholder="First Name"
          onChange={(event) => {
            setFirstName(event.currentTarget.value);
          }}
        />
        <input
          css={inputStyle}
          // type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={(event) => {
            setLastName(event.currentTarget.value);
          }}
        />
        <button
          css={buttonStyle}
          onClick={async (event) => {
            event.preventDefault();
            await fetch(`${baseUrl}/guests`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                firstName: { firstName },
                lastName: { lastName },
              }),
            });
            setListUpdate(!listUpdate);
            setFirstName('');
            setLastName('');
          }}
        >
          {' '}
          Add Guest{' '}
        </button>
      </form>
    </div>
  );
}
