import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import styled from "styled-components";
import { FaEdit, FaTrash } from "react-icons/fa";

// Styled wrapper for AG Grid
const GridWrapper = styled.div`
  height: 400px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
`;

const Grid = ({ columnDefs, rowData, onEditRow, onDeleteRow }) => {
  // Action cell renderer for edit and delete buttons
  const actionCellRenderer = (params) => {
    return (
      <div>
        <FaEdit
          style={{ margin: "10px", color: "#a2d2ff" }}
          onClick={() => onEditRow(params.data)}
        />
        <FaTrash
          style={{ margin: "10px", color: "#e76f51" }}
          onClick={() => onDeleteRow(params.data)}
        />
      </div>
    );
  };

  // Modify columnDefs to include the action buttons
  const modifiedColumnDefs = [
    ...columnDefs,
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: actionCellRenderer,
      sortable: false,
      filter: false,
    },
  ];
  const frameworkComponents = {
    buttonCellRenderer: actionCellRenderer,
  };

  return (
    <GridWrapper className="ag-theme-alpine">
      <AgGridReact
        columnDefs={modifiedColumnDefs}
        rowData={rowData}
        pagination={true}
        paginationPageSize={10}
        frameworkComponents={frameworkComponents}
      />
    </GridWrapper>
  );
};

export default Grid;
