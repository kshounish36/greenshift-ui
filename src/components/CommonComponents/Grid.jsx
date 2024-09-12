import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import styled from "styled-components";

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
        <button onClick={() => onEditRow(params.data)}>Edit</button>
        <button onClick={() => onDeleteRow(params.data.id)}>Delete</button>
      </div>
    );
  };

  // Modify columnDefs to include the action buttons
  const modifiedColumnDefs = [
    ...columnDefs,
    {
      headerName: "Actions",
      field: "actions",
      cellRendererFramework: actionCellRenderer,
      sortable: false,
      filter: false,
    },
  ];

  return (
    <GridWrapper className="ag-theme-alpine">
      <AgGridReact
        columnDefs={modifiedColumnDefs}
        rowData={rowData}
        pagination={true}
        paginationPageSize={10}
      />
    </GridWrapper>
  );
};

export default Grid;
