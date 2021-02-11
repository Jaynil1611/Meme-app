import styled from "styled-components";

export const Error = styled.span`
  color: #ff4136;
  font-size: small;
`;

export const Center = styled.div`
  text-align: center;

  h5 {
    font-weight: normal;
  }
`;

export const InputField = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

export const Wrapper = styled.div`
  .submit-btn {
    background: #d97706;
    border: 1px solid white;
    font-weight: bold;
  }

  display: flex;
  flex-direction: column;
  margin: auto;
  width: 50vw;
`;

export const Button = styled.button`
  cursor: pointer;
  border-radius: 3px;
  padding: 0.7rem 2rem;
  border: none;
  -webkit-appearance: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #fff;
  background: #0074d9;

  &:focus {
    outline: none;
  }

  &:disabled {
    background: gray;
  }

  ${({ secondary }) =>
    secondary &&
    `
		background: #001F3F;
	`}

  ${({ disabled }) =>
    !disabled &&
    `&:hover,&:focus{
    background-color:white;
    border: 2px solid #D97706;
    color:#D97706;`}}
`;

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #005554;
  padding: 0.5rem 0.5rem;
  border-radius: 7px;
  margin: 0.5rem 0rem;
  transition: 0.3s;
  ${({ error }) =>
    error &&
    `
		border-color: #ff4136;
	`}
  &:focus {
    outline: none;
    transition: all 0.2s;
    border-color: #fcd34d;
  }
  &::placeholder {
    color: #a7a7a7;
  }
`;
