// PriceDetails.jsx
import React, { useContext, useEffect, useState } from "react";
import { Container, LeftCard, RightCard } from "../CommonStyles";
import {
  FaSolarPanel,
  FaClipboardList,
  FaUserTie,
  FaUserEdit,
} from "react-icons/fa";
import { UsersGrid } from "./UsersGrid";
import AddUsersForm from "./AddNewUser";
import MenuCard from "../CommonComponents/MenuCard";

export const UsersDashboard = () => {
  const [selectedComponent, setSelectedComponent] =
    useState("SolarItemInputForm");

  const renderComponent = () => {
    switch (selectedComponent) {
      case "UserGrid":
        return <UsersGrid />;
      case "CreateUser":
        return <AddUsersForm />;
      default:
        return <UsersGrid />;
    }
  };
  return (
    <Container>
      <LeftCard>
        <nav>
          <ul>
            <li>
              <MenuCard
                title="Manage Users"
                name="UserGrid"
                selected={selectedComponent}
                onClick={() => setSelectedComponent("UserGrid")}
                icon={FaUserTie}
                iconColor="#344e41"
              />
            </li>
            <li>
              <MenuCard
                title="Create A New User"
                name="CreateUser"
                selected={selectedComponent}
                onClick={() => setSelectedComponent("CreateUser")}
                icon={FaUserEdit}
                iconColor="#a7c957"
              />
            </li>
          </ul>
        </nav>
      </LeftCard>
      <RightCard>{renderComponent()}</RightCard>
    </Container>
  );
};
