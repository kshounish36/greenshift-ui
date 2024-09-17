// PriceDetails.jsx
import React, { useContext, useEffect, useState } from "react";
import Grid from "../CommonComponents/Grid";
import { fetchUsersDetails } from "../../api/ManageUsers/userDetails";
import AddUsersForm from "./AddNewUser";

const columnDefs = [
  {
    headerName: "User Name",
    field: "user_name",
    filter: true,
    editable: false,
  },
  {
    headerName: "Role",
    field: "role",
    filter: true,
    editable: false,
  },
];

export const UsersGrid = () => {
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
  const handleDeleteRow = (rowId) => {
    console.log("Deleting row with ID:", rowId);
    setRowData(rowData.filter((row) => row.id !== rowId));
  };

  const handleUpdateRow = (updatedData) => {
    console.log(updatedData);
    // This function will handle updating the row after form submission
    const updatedRowData = rowData.map((row) =>
      row.id === updatedData.id ? updatedData : row
    );
    setRowData(updatedRowData);
    setEditingRowData(null); // Exit edit mode after update
  };

  useEffect(() => {
    const getUsersDetails = async () => {
      const usersDetails = await fetchUsersDetails();
      setRowData(usersDetails);
    };
    getUsersDetails();
  }, []);

  return (
    <>
      {editingRowData ? (
        // Conditionally render the form when editingRowData is not null
        <AddUsersForm
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
