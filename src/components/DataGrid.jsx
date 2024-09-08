import React, { useContext, useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import styled from "styled-components";
import { AuthContext } from "./AuthContext";
import { FiDownload } from "react-icons/fi";

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

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-top: 10px;
  margin-left: auto;
  display: block;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    margin-left: 0;
    width: 100%;
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

const DataGrid = ({ bosItems, onSubmit, leadsData }) => {
  const [rowData, setRowData] = useState([]);
  const { authState } = useContext(AuthContext);
  const gridRef = useRef(null);

  useEffect(() => {
    setRowData(bosItems);
  }, [bosItems]);

  const columnDefs =
    authState.role === "admin"
      ? [
          { headerName: "Item ID", field: "item_id", editable: false },
          {
            headerName: "Item Name",
            field: "item_nm",
            editable: true,
            filter: true,
          },
          { headerName: "Item Rate", field: "item_rate", editable: true },
          { headerName: "Item UOM", field: "item_uom", editable: true },
          { headerName: "Quantity", field: "quantity", editable: true },
        ]
      : [
          { headerName: "Item ID", field: "item_id", editable: false },
          {
            headerName: "Item Name",
            field: "item_nm",
            editable: false,
            filter: "agTextColumnFilter",
          },
          { headerName: "Item UOM", field: "item_uom", editable: false },
          { headerName: "Quantity", field: "quantity", editable: true },
        ];

  const handleButtonClick = () => {
    const updatedData = [];
    gridRef.current.api.forEachNode((node) => {
      const { item_id, item_rate, quantity } = node.data;
      updatedData.push({
        item_id,
        item_rate: parseFloat(item_rate),
        quantity: parseInt(quantity, 10),
      });
    });
    onSubmit(updatedData);
  };

  const exportToExcel = () => {
    gridRef.current.api.exportDataAsCsv({
      fileName: leadsData ? `BOS_data_${leadsData.name}.csv` : "BOS_data.csv",
    });
  };

  return (
    <>
      <DownloadIcon onClick={exportToExcel} />
      <Banner>Review Required BOS Items For This Configuration</Banner>
      <GridContainer>
        <div className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{ flex: 1, minWidth: 150, editable: true }}
          />
        </div>
        <Button
          onClick={handleButtonClick}
          disabled={rowData.length > 0 ? false : true}
        >
          Calculate Total Price
        </Button>
      </GridContainer>
    </>
  );
};

export default DataGrid;
