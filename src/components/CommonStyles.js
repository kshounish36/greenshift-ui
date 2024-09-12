import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  height: calc(100vh - 20px); /* Adjust height to account for navigation bar */
  padding-top: 100px; /* Add padding to ensure content is below navigation bar */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding-top: 60px; /* Adjust padding for smaller screens */
  }
`;

export const Card = styled.div`
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  @media (max-width: 768px) {
    padding: 15px;
    box-shadow: none;
  }
`;

export const LeftCard = styled(Card)`
  background-color: #212f3d;
  color: white;
  margin-right: 5px;
  margin-left: 3px;

  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;

export const RightCard = styled(Card)`
  position: relative;
  margin-right: 3px;

  &:before,
  &:after {
    z-index: -1;
    position: absolute;
    content: "";
    bottom: 25px;
    left: 10px;
    width: 50%;
    top: 80%;
    max-width: 300px;
    background: #777;
    box-shadow: 0 35px 20px #777;
    transform: rotate(-8deg);

    @media (max-width: 768px) {
      display: none; /* Hide shadows on smaller screens */
    }
  }

  &:after {
    transform: rotate(8deg);
    right: 10px;
    left: auto;

    @media (max-width: 768px) {
      display: none; /* Hide shadows on smaller screens */
    }
  }
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: black;

  @media (max-width: 768px) {
    padding: 8px;
    margin: 8px 0;
  }
`;

export const Select = styled.select`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: black;

  &:required:invalid {
    color: gray;
  }
  option[value=""][disabled] {
    display: none;
  }
  option {
    color: black;
  }

  @media (max-width: 768px) {
    padding: 8px;
    margin: 8px 0;
  }
`;

export const Banner = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #024950;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;
  text-align: center;
  align-items: center;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    width: 100%; /* Make the button full-width on smaller screens */
  }
`;

export const TabContainer = styled.div``;

export const TabTitle = styled.button`
  font-size: 1rem;
  background-color: #f0f0f0;
  padding: 8px 16px;
  margin: 5px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #ddd; /* Change color on hover */
  }

  /* Active tab styles */
  ${({ isActive }) =>
    isActive &&
    `
    background-color: #90AEAD;
    color: white;
  `}
`;

export const TabContent = styled.div`
  padding: 10px;
  margin: 10px;
`;
