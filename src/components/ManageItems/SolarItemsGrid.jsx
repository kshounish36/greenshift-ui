// PriceDetails.jsx
import React, { useContext, useEffect, useState } from "react";
import Grid from "../CommonComponents/Grid";
import { TabContainer, TabContent, TabTitle } from "../CommonStyles";

const columnDefs = [
  { headerName: "ID", field: "id" },
  { headerName: "Name", field: "name" },
  { headerName: "Age", field: "age" },
];

export const SolarItemsGrid = () => {
  const [activeTab, setActiveTab] = useState("gridsys");
  // Sample row data
  const [rowData, setRowData] = useState([
    { id: 1, name: "John Doe", age: 25 },
    { id: 2, name: "Jane Smith", age: 30 },
    { id: 3, name: "Mike Johnson", age: 35 },
  ]);

  // Function to handle editing a row
  const handleEditRow = (row) => {
    console.log("Editing row:", row);
    // Implement logic to open a form with row data for editing
  };

  // Function to handle deleting a row
  const handleDeleteRow = (rowId) => {
    console.log("Deleting row with ID:", rowId);
    setRowData(rowData.filter((row) => row.id !== rowId));
  };

  useEffect(() => {}, []);

  return (
    <TabContainer>
      <TabTitle
        onClick={() => setActiveTab("gridsys")}
        isActive={activeTab === "gridsys"}
      >
        Grid Tied System
      </TabTitle>
      <TabTitle
        onClick={() => setActiveTab("offgridsys")}
        isActive={activeTab === "offgridsys"}
      >
        Off Grid System
      </TabTitle>
      <TabTitle
        onClick={() => setActiveTab("hybridsys")}
        isActive={activeTab === "hybridsys"}
      >
        Off Grid System
      </TabTitle>
      <TabContent>
        {activeTab === "gridsys" && (
          <>
            <Grid
              columnDefs={columnDefs}
              rowData={rowData}
              onEditRow={handleEditRow}
              onDeleteRow={handleDeleteRow}
            />
          </>
        )}
        {activeTab === "offgridsys" && (
          <>
            <Grid
              columnDefs={columnDefs}
              rowData={rowData}
              onEditRow={handleEditRow}
              onDeleteRow={handleDeleteRow}
            />
          </>
        )}
        {activeTab === "hybridsys" && (
          <>
            <Grid
              columnDefs={columnDefs}
              rowData={rowData}
              onEditRow={handleEditRow}
              onDeleteRow={handleDeleteRow}
            />
          </>
        )}
      </TabContent>
    </TabContainer>
  );
};
