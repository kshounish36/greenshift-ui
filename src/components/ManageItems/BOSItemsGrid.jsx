// PriceDetails.jsx
import React, { useContext, useEffect, useState } from "react";
import Grid from "../CommonComponents/Grid";
import {
  deleteBOSItem,
  fetchBosItemsDetails,
} from "../../api/ManageItems/bosItemsDetasils";
import AddBOSItemsForm from "./AddBOSItem";

const columnDefs = [
  {
    headerName: "Item Name",
    field: "item_nm",
    filter: true,
    editable: false,
  },
  {
    headerName: "Item Rate",
    field: "item_rate",
    filter: true,
    editable: false,
  },
  {
    headerName: "Unit Of Measurement",
    field: "item_uom",
    filter: true,
    editable: false,
  },
];

export const BOSItemsGrid = () => {
  // Sample row data
  const [rowData, setRowData] = useState([]);
  const [editingRowData, setEditingRowData] = useState(null);

  // Function to handle editing a row
  const handleEditRow = (row) => {
    console.log("Editing row:", row);
    setEditingRowData(row);
    // Implement logic to open a form with row data for editing
  };

  // Function to handle deleting a row
  const handleDeleteRow = async (rowId) => {
    console.log("Deleting row with ID:", rowId.item_id);
    await deleteBOSItem(rowId.item_id);
    setRowData(rowData.filter((row) => row.item_id !== rowId.item_id));
  };

  const handleUpdateRow = (updatedData) => {
    console.log(updatedData);
    // This function will handle updating the row after form submission
    const updatedRowData = rowData.map((row) =>
      row.item_id === updatedData.item_id ? updatedData : row
    );
    setRowData(updatedRowData);
    setEditingRowData(null); // Exit edit mode after update
  };

  useEffect(() => {
    const fetchBosDetails = async () => {
      const bosItemsDetails = await fetchBosItemsDetails();
      setRowData(bosItemsDetails);
    };
    fetchBosDetails();
  }, []);

  return (
    <>
      {editingRowData ? (
        // Conditionally render the form when editingRowData is not null
        <AddBOSItemsForm
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
  );
};
