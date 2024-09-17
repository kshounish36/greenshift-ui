// PriceDetails.jsx
import React, { useContext, useEffect, useState } from "react";
import Grid from "../CommonComponents/Grid";
import { TabContainer, TabContent, TabTitle } from "../CommonStyles";
import { fetchSolarModuleDetails } from "../../api/ManageItems/solarModuleSysDetails";
import SolarItemInputForm from "./AddItems";

const columnDefs = [
  {
    headerName: "No Of Modules",
    field: "no_of_modules",
    filter: true,
    editable: false,
  },
  {
    headerName: "DC Capacity",
    field: "dc_capacity",
    filter: true,
    editable: false,
  },
  {
    headerName: "Inverter Capacity",
    field: "inv_capacity",
    filter: true,
    editable: false,
  },
  {
    headerName: "No Of Phase",
    field: "no_of_phase",
    filter: true,
    editable: false,
  },
  {
    headerName: "Type of Roof",
    field: "roof_typ",
    filter: true,
    editable: false,
  },
  {
    headerName: "Solar Module Price",
    field: "solar_mod_prc",
    filter: true,
    editable: false,
  },
  {
    headerName: "Sub Dealer Solar Module Price",
    field: "subdlr_solar_mod_prc",
    filter: true,
    editable: false,
  },
  {
    headerName: "Installation Cost",
    field: "i_and_c_prc",
    filter: true,
    editable: false,
  },
  {
    headerName: "BOS Cost",
    field: "bos_prc",
    filter: true,
    editable: false,
  },
];

export const SolarItemsGrid = () => {
  const [activeTab, setActiveTab] = useState("grid-tied");
  // Sample row data
  const [rowData, setRowData] = useState([]);
  const [editingRowData, setEditingRowData] = useState(null);

  // Function to handle editing a row
  const handleEditRow = (row) => {
    console.log("Editing row:", row);
    setEditingRowData({ ...row, sysType: activeTab });
    // Implement logic to open a form with row data for editing
  };

  // Function to handle deleting a row
  const handleDeleteRow = (rowId) => {
    console.log("Deleting row with ID:", rowId);
    setRowData(rowData.filter((row) => row.dcCapacity !== rowId.dcCapacity));
  };

  useEffect(() => {
    const fetchSolarSysDetails = async () => {
      const solarModuleDetails = await fetchSolarModuleDetails(activeTab);
      setRowData(solarModuleDetails);
    };
    fetchSolarSysDetails();
  }, [activeTab]);

  const handleUpdateRow = (updatedData) => {
    console.log(updatedData);
    const updatedSolarItemData = {
      no_of_modules: updatedData.noOfModules,
      dc_capacity: updatedData.dcCapacity,
      inv_capacity: updatedData.invCapacity,
      no_of_phase: updatedData.noOfPhase,
      roof_typ: updatedData.roofTyp,
      solar_mod_prc: updatedData.solarModPrc,
      subdlr_solar_mod_prc: updatedData.subdlrSolarModPrc,
      i_and_c_prc: updatedData.iAndCPrc,
      bos_prc: updatedData.bosPrc,
    };
    // This function will handle updating the row after form submission
    const updatedRowData = rowData.map((row) =>
      row.dc_capacity === updatedSolarItemData.dc_capacity
        ? updatedSolarItemData
        : row
    );
    setRowData(updatedRowData);
    setEditingRowData(null); // Exit edit mode after update
  };

  return (
    <TabContainer>
      <TabTitle
        onClick={() => setActiveTab("grid-tied")}
        isActive={activeTab === "grid-tied"}
      >
        Grid Tied System
      </TabTitle>
      <TabTitle
        onClick={() => setActiveTab("offGridSys")}
        isActive={activeTab === "offGridSys"}
      >
        Off Grid System
      </TabTitle>
      <TabTitle
        onClick={() => setActiveTab("hybridSys")}
        isActive={activeTab === "hybridSys"}
      >
        Off Grid System
      </TabTitle>
      <TabContent>
        {activeTab === "grid-tied" && (
          <>
            {editingRowData ? (
              // Conditionally render the form when editingRowData is not null
              <SolarItemInputForm
                initialValues={editingRowData}
                onSubmit={handleUpdateRow} // Pass the update function as onSubmit
              />
            ) : (
              <Grid
                columnDefs={columnDefs}
                rowData={rowData}
                onEditRow={handleEditRow} // This will pass the row to be edited
                onDeleteRow={handleDeleteRow} // Handle delete
              />
            )}
          </>
        )}
        {activeTab === "offGridSys" && (
          <>
            {editingRowData ? (
              // Conditionally render the form when editingRowData is not null
              <SolarItemInputForm
                initialValues={editingRowData}
                onSubmit={handleUpdateRow} // Pass the update function as onSubmit
              />
            ) : (
              <Grid
                columnDefs={columnDefs}
                rowData={rowData}
                onEditRow={handleEditRow} // This will pass the row to be edited
                onDeleteRow={handleDeleteRow} // Handle delete
              />
            )}
          </>
        )}
        {activeTab === "hybridSys" && (
          <>
            {editingRowData ? (
              // Conditionally render the form when editingRowData is not null
              <SolarItemInputForm
                initialValues={editingRowData}
                onSubmit={handleUpdateRow} // Pass the update function as onSubmit
              />
            ) : (
              <Grid
                columnDefs={columnDefs}
                rowData={rowData}
                onEditRow={handleEditRow} // This will pass the row to be edited
                onDeleteRow={handleDeleteRow} // Handle delete
              />
            )}
          </>
        )}
      </TabContent>
    </TabContainer>
  );
};
