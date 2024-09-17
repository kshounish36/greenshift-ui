// PriceDetails.jsx
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import DataGrid from "./DataGrid";
import {
  fetchSearchResults,
  fetchUpdatedSearchResults,
} from "../api/fetchSearchResults";
import GeneratePDF from "./GeneratePDF";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
import { fetchLeads } from "../api/postLead";
import CustomSelect from "./CustomSelect";

const Container = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  height: calc(100vh - 20px); /* Adjust height to account for navigation bar */
  padding-top: 100px; /* Add padding to ensure content is below navigation bar */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding-top: 60px; /* Adjust padding for smaller screens */
  }
`;

const Card = styled.div`
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  @media (max-width: 768px) {
    padding: 15px;
    box-shadow: none;
  }
`;

const LeftCard = styled(Card)`
  background-color: #212f3d;
  color: white;
  margin-right: 5px;
  margin-left: 3px;

  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;

const RightCard = styled(Card)`
  position: relative;
  margin-right: 3px;

  &:before,
  &:after {
    z-index: -1;
    position: absolute;
    content: "";
    bottom: 25px;
    left: 10px;
    width: 50%;
    top: 80%;
    max-width: 300px;
    background: #777;
    box-shadow: 0 35px 20px #777;
    transform: rotate(-8deg);

    @media (max-width: 768px) {
      display: none; /* Hide shadows on smaller screens */
    }
  }

  &:after {
    transform: rotate(8deg);
    right: 10px;
    left: auto;

    @media (max-width: 768px) {
      display: none; /* Hide shadows on smaller screens */
    }
  }
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: black;

  @media (max-width: 768px) {
    padding: 8px;
    margin: 8px 0;
  }
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: black;

  &:required:invalid {
    color: gray;
  }
  option[value=""][disabled] {
    display: none;
  }
  option {
    color: black;
  }

  @media (max-width: 768px) {
    padding: 8px;
    margin: 8px 0;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    width: 100%; /* Make the button full-width on smaller screens */
  }
`;

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
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

export const PriceDetails = () => {
  const [systemType, setSystemType] = useState("");
  const [roofType, setRoofType] = useState("");
  const [systemCapacity, setSystemCapacity] = useState("");
  const [phase, setPhase] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [bosItems, setBosItems] = useState([]);
  const [searchPayload, setSearchPayloadPayload] = useState({});
  const [btndsbld, setBtndsbld] = useState(false);
  const { authState } = useContext(AuthContext);
  const [leadsData, setLeadsData] = useState([]);
  const [selectedLeadDetails, setSelectedLeadDetails] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    const fetchLeadDetails = async () => {
      const leads = await fetchLeads();
      setLeadsData(leads);
    };
    fetchLeadDetails();

    const leadDetails =
      leadsData.length > 0 &&
      selectedLead &&
      leadsData.find((obj) => obj.id === selectedLead);
    setSelectedLeadDetails(leadDetails);

    if (systemCapacity.length === 0 || systemCapacity === "0") {
      setBtndsbld(false);
    }
    if (
      systemType !== "" &&
      roofType !== "" &&
      systemCapacity.length !== 0 &&
      systemCapacity !== "0" &&
      phase !== ""
    ) {
      setBtndsbld(true);
    }
  }, [systemType, roofType, systemCapacity, phase, selectedLead]);

  const handleSubmit = async (updatedItems) => {
    const updatedData = {
      updatedItems,
      systemType: searchPayload.type,
      roof_typ: searchPayload.roof_typ,
      dc_capacity: searchPayload.dc_capacity,
      no_of_phase: searchPayload.no_of_phase,
    };

    console.log("Payload:", updatedData);

    const res = await fetchUpdatedSearchResults(updatedData);
    console.log(res);
    setSearchResult(res);
  };

  const handleSearch = async () => {
    setSearchResult(null);
    let payload = {};
    payload.type = systemType;
    payload.dc_capacity = systemCapacity;
    payload.no_of_phase = phase;
    payload.roof_typ = roofType;
    setSearchPayloadPayload(payload);
    const res = await fetchSearchResults(payload);
    if (res.length === 0) {
      setBosItems([]);
    }
    if (
      res.length > 0 &&
      res[0].bosItems.length > 0 &&
      authState.role !== "subdlr"
    ) {
      setBosItems(res[0].bosItems);
    }
    if (res.length > 0 && authState.role === "subdlr") {
      console.log(res[0]);
      setBosItems(res[0]);
    }
    if (res[0] && res[0].bosItems.length === 0) {
      toast.warn("No BOS Item found for this search configuration.");
      setBosItems([]);
    }
  };

  const handleLeadDetails = (selectedOption) => {
    setSelectedLead(selectedOption.value);
  };

  return (
    <Container>
      <LeftCard>
        {authState.role !== "subdlr" && (
          <>
            <h3 style={{ color: "white" }}>Customer Name</h3>
            {leadsData.length > 0 && (
              <CustomSelect
                component="pricedetails"
                data={leadsData}
                placeholder="Select Customer Name"
                defaultValue={selectedLead}
                onChange={handleLeadDetails}
              />
            )}
          </>
        )}
        <h3 style={{ color: "white" }}>System Configuration</h3>
        <label>Type of System:</label>
        <Select
          required
          value={systemType}
          onChange={(e) => setSystemType(e.target.value)}
        >
          <option value="" disabled selected hidden>
            Select Type of System
          </option>
          <option value="grid-tied">On Grid</option>
          <option value="off-grid">Off Grid</option>
          <option value="hybrid">Hybrid</option>
        </Select>
        <label>Type of Roof:</label>
        <Select
          required
          value={roofType}
          onChange={(e) => setRoofType(e.target.value)}
        >
          <option value="" disabled selected hidden>
            Select Type of Roof
          </option>
          <option value="rcc">RCC</option>
          <option value="sheet roof">Sheet Roof</option>
          <option value="w/o mms">Without MMS</option>
        </Select>
        <label>System Capacity:</label>
        <Input
          type="number"
          min={1}
          placeholder="Enter system capacity"
          value={systemCapacity}
          onChange={(e) => setSystemCapacity(e.target.value)}
        />
        <label>Phase:</label>
        <Select
          required
          value={phase}
          onChange={(e) => setPhase(e.target.value)}
        >
          <option value="" disabled selected hidden>
            Select Phase
          </option>
          <option value="1">Single Phase</option>
          <option value="3">Three Phase</option>
        </Select>
        <Button onClick={handleSearch} disabled={!btndsbld}>
          Search
        </Button>
      </LeftCard>
      <RightCard>
        <>
          {!searchResult && bosItems && authState.role !== "subdlr" && (
            <DataGrid
              bosItems={bosItems}
              onSubmit={handleSubmit}
              leadsData={selectedLeadDetails}
            />
          )}
          {searchResult && authState.role !== "subdlr" && (
            <GeneratePDF data={searchResult} leadsData={selectedLeadDetails} />
          )}
          {Object.keys(bosItems).length === 0 &&
            authState.role === "subdlr" && (
              <div style={{ alignItems: "center", textAlign: "center" }}>
                <Banner>Solar Installation Cost Details</Banner>
                <hr />
                <p>
                  Please use left serach pannel to input system configuration
                  and get desired price details!!
                </p>
              </div>
            )}
          {Object.keys(bosItems).length > 0 && authState.role === "subdlr" && (
            <GeneratePDF data={bosItems} />
          )}
        </>
      </RightCard>
    </Container>
  );
};
