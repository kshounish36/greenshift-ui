// Card.js
import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  padding: 20px;
  height: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  color: black;
  margin-bottom: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? "8ecae6" : "white")};
  transform: ${({ isSelected }) => (isSelected ? "scale(1.04)" : "scale(1)")};
  transition: all 0.3s ease;
`;

const MenuCard = ({ name, selected, onClick, title, icon, iconColor }) => {
  const IconComponent = icon;
  return (
    <StyledCard isSelected={name === selected} onClick={() => onClick(name)}>
      {IconComponent && (
        <IconComponent style={{ marginRight: "8px", color: `${iconColor}` }} />
      )}
      {title}
    </StyledCard>
  );
};

export default MenuCard;
