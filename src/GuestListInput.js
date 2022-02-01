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
  display: block;
  width: 150px;
  height: 40px;
  /* margin-bottom: 20px; */
  padding-left: 10px;
  border-radius: 2px;
`;
const buttonStyle = css`
  height: 45px;
  /* border: none; */
  border-radius: 3px;
  background-color: #fff;
  color: #000;
  width: 100px;
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
          type="text"
          value={firstName}
          placeholder="Enter First Name"
          onChange={(e) => {
            setFirstName(e.currentTarget.value);
          }}
        />
        <input
          css={inputStyle}
          type="text"
          value={lastName}
          placeholder="Enter Last Name"
          onChange={(e) => {
            setLastName(e.currentTarget.value);
          }}
        />
        <button
          css={buttonStyle}
          onClick={async (e) => {
            e.preventDefault();
            await fetch(`${baseUrl}`, {
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
