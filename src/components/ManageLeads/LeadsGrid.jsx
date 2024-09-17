import React, { useContext, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import styled from "styled-components";
import api from "../../api/api";
import { FiDownload } from "react-icons/fi";
import { formatDateTime } from "../../utilities";
import { fetchLeads } from "../../api/postLead";
import { AuthContext } from "../AuthContext";

const Banner = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #024950;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;
  text-align: center;
  align-items: center;

  &:hover {
    background-color: #0fa4fa;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const GridContainer = styled.div`
  .ag-theme-alpine {
    height: 400px;
    width: 100%;

    @media (max-width: 768px) {
      height: auto;
      overflow-x: auto;
    }
  }
`;

const DownloadIcon = styled(FiDownload)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
  color: #007bff;

  &:hover {
    color: #0056b3;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const LeadsGrid = () => {
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef(null);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    const fetchLeadDetails = async () => {
      const leads = await fetchLeads();
      setRowData(leads);
    };
    fetchLeadDetails();
  }, []);

  const handleCellEditingStopped = async (event) => {
    const { data, colDef, newValue } = event;
    if (colDef.field === "notes") {
      try {
        // Update the notes on the server
        const updatedLead = {
          ...data,
          id: data.id,
          notes: newValue,
          updatedBy: authState.username,
        };

        await api.put(`/leads`, updatedLead);

        // Optionally update the rowData to reflect the change immediately
        const updatedRowData = rowData.map((row) =>
          row.id === data.id
            ? {
                ...row,
                notes: newValue,
                updatedBy: authState.username,
                updatedAt: formatDateTime(new Date()),
              }
            : row
        );
        setRowData(updatedRowData);
      } catch (error) {
        console.error("Error updating notes:", error);
      }
    }
  };

  const exportToExcel = () => {
    gridRef.current.api.exportDataAsCsv({
      fileName: `leads_data_${formatDateTime(new Date())}.csv`,
    });
  };

  const columnDefs = [
    { headerName: "Name", field: "name", filter: true, editable: false },
    { headerName: "Email", field: "email", filter: true, editable: false },
    { headerName: "Phone", field: "phone", filter: true, editable: false },
    { headerName: "Address", field: "address", filter: true, editable: false },
    {
      headerName: "Electricity Bill Details",
      field: "electricityBillDetails",
      filter: true,
      editable: false,
    },
    {
      headerName: "Type Of Roof",
      field: "typeOfRoof",
      filter: true,
      editable: false,
    },
    {
      headerName: "Subsidy",
      field: "subsidy",
      filter: true,
      editable: false,
    },
    {
      headerName: "Financing",
      field: "financing",
      filter: true,
      editable: false,
    },
    {
      headerName: "Message",
      field: "message",
      filter: true,
      editable: false,
    },
    {
      headerName: "Created At",
      field: "createdAt",
      filter: true,
      valueFormatter: (params) => formatDateTime(params.value),
      editable: false,
    },
    {
      headerName: "Updated At",
      field: "updatedAt",
      filter: true,
      valueFormatter: (params) => formatDateTime(params.value),
      editable: false,
    },
    {
      headerName: "Updated By",
      field: "updatedBy",
      filter: true,
      editable: false,
    },
    {
      headerName: "Notes",
      field: "notes",
      filter: true,
      editable: true,
    },
  ];

  return (
    <>
      <Banner>Lead Details</Banner>
      <DownloadIcon onClick={exportToExcel} />
      <GridContainer>
        <div className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{
              flex: 1,
              minWidth: 150,
              editable: true,
              sortable: true,
              filter: true,
            }}
            onCellEditingStopped={handleCellEditingStopped}
          />
        </div>
      </GridContainer>
    </>
  );
};

export default LeadsGrid;
