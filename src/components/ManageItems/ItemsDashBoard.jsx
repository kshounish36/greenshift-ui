// PriceDetails.jsx
import React, { useContext, useEffect, useState } from "react";
import { Container, LeftCard, RightCard } from "../CommonStyles";
import SolarItemInputForm from "./AddItems";
import { SolarItemsGrid } from "./SolarItemsGrid";
import {
  FaSolarPanel,
  FaClipboardList,
  FaTools,
  FaPlusSquare,
} from "react-icons/fa";
import { BOSItemsGrid } from "./BOSItemsGrid";
import AddBOSItemsForm from "./AddBOSItem";
import MenuCard from "../CommonComponents/MenuCard";

export const ItemssDashboard = () => {
  const [selectedComponent, setSelectedComponent] =
    useState("SolarItemInputForm");

  const renderComponent = () => {
    switch (selectedComponent) {
      case "SolarItemInputForm":
        return <SolarItemInputForm />;
      case "SolarItemsGrid":
        return <SolarItemsGrid />;
      case "BOSItemsGrid":
        return <BOSItemsGrid />;
      case "AddBOSItemsForm":
        return <AddBOSItemsForm />;
      default:
        return <SolarItemInputForm />;
    }
  };
  return (
    <Container>
      <LeftCard>
        <nav>
          <ul>
            <li>
              <MenuCard
                title="Add A New Solar Item"
                name="SolarItemInputForm"
                selected={selectedComponent}
                onClick={() => setSelectedComponent("SolarItemInputForm")}
                icon={FaSolarPanel}
                iconColor="#344e41"
              />
            </li>
            <li>
              <MenuCard
                title="Solar Items Details"
                name="SolarItemsGrid"
                selected={selectedComponent}
                onClick={() => setSelectedComponent("SolarItemsGrid")}
                icon={FaClipboardList}
                iconColor="#a7c957"
              />
            </li>
            <li>
              <MenuCard
                title="Add New BOS Item"
                name="AddBOSItemsForm"
                selected={selectedComponent}
                onClick={() => setSelectedComponent("AddBOSItemsForm")}
                icon={FaPlusSquare}
                iconColor="#ffb703"
              />
            </li>
            <li>
              <MenuCard
                title="BOS Items Details"
                name="BOSItemsGrid"
                selected={selectedComponent}
                onClick={() => setSelectedComponent("BOSItemsGrid")}
                icon={FaTools}
                iconColor="#03045e"
              />
            </li>
          </ul>
        </nav>
      </LeftCard>
      <RightCard>{renderComponent()}</RightCard>
    </Container>
  );
};
