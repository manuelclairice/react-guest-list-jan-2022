/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

const headerStyle = css`
  text-align: center;
  padding-top: 50px;
  margin-top: 0;
`;

const formStyle = css`
  display: flex;
  justify-content: center;
`;

const inputStyle = css`
  color: grey;
  display: inline-flex;
  width: 200px;
  height: 40px;
  /* margin-bottom: 20px; */
  padding-left: 10px;
  border-radius: 10px;
`;
const buttonStyle = css`
  height: 45px;
  /* border: none; */
  border-radius: 10px;
  background-color: #008a00;
  color: white;
  width: 200px;
  /* margin-bottom: 10px; */
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
