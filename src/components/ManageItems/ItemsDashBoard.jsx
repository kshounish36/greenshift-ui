// PriceDetails.jsx
import React, { useContext, useEffect, useState } from "react";
import { Container, Card, LeftCard, RightCard, Input } from "../CommonStyles";
import SolarItemInputForm from "./AddItems";
import { SolarItemsGrid } from "./SolarItemsGrid";
import { FaSolarPanel, FaClipboardList } from "react-icons/fa";

export const ItemssDashboard = () => {
  const [selectedComponent, setSelectedComponent] =
    useState("SolarItemInputForm");

  const renderComponent = () => {
    switch (selectedComponent) {
      case "SolarItemInputForm":
        return <SolarItemInputForm />;
      case "SolarItemsGrid":
        return <SolarItemsGrid />;
      default:
        return <Component1 />;
    }
  };
  return (
    <Container>
      <LeftCard>
        <nav>
          <ul>
            <li>
              <Card
                style={{
                  color: "black",
                  marginBottom: "10px",
                  fontWeight: "bold",
                  height: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedComponent("SolarItemInputForm")}
              >
                <FaSolarPanel style={{ marginRight: "8px", color: "green" }} />
                Add A New Solar Item
              </Card>
            </li>
            <li>
              <Card
                style={{
                  color: "black",
                  marginBottom: "5px",
                  fontWeight: "bold",
                  height: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedComponent("SolarItemsGrid")}
              >
                <FaClipboardList
                  style={{ marginRight: "8px", color: "#008cba" }}
                />
                Solar Items Details
              </Card>
            </li>
          </ul>
        </nav>
      </LeftCard>
      <RightCard>{renderComponent()}</RightCard>
    </Container>
  );
};
