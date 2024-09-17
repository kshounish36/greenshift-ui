// PriceDetails.jsx
import React, { useContext, useEffect, useState } from "react";
import { Container, LeftCard, RightCard } from "../CommonStyles";
import { FaUsers, FaUserPlus } from "react-icons/fa";
import LeadsGrid from "./LeadsGrid";
import MenuCard from "../CommonComponents/MenuCard";

export const LeadsDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState("LeadsGrid");

  const renderComponent = () => {
    switch (selectedComponent) {
      case "LeadsGrid":
        return <LeadsGrid />;
      case "CreateNewLead":
        return <LeadsGrid />;
      default:
        return <LeadsGrid />;
    }
  };
  return (
    <Container>
      <LeftCard>
        <nav>
          <ul>
            <li>
              <MenuCard
                title="Manage Leads"
                name="LeadsGrid"
                selected={selectedComponent}
                onClick={() => setSelectedComponent("LeadsGrid")}
                icon={FaUsers}
                iconColor="#344e41"
              />
            </li>
            <li>
              <MenuCard
                title="Create A New Lead"
                name="CreateNewLead"
                selected={selectedComponent}
                onClick={() => setSelectedComponent("CreateNewLead")}
                icon={FaUserPlus}
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
