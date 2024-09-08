import React, { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import styled from "styled-components";
import { FiDownload } from "react-icons/fi";
import { AuthContext } from "./AuthContext";
import logo from "../../public/img/Logo2.jpeg";
import { formatDateTime } from "../utilities";

const LetterHeadContainer = styled.div`
  width: 8.5in;
  padding: 20px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
`;

const CompanyInfo = styled.div`
  text-align: right;
`;

const Logo = styled.img`
  height: 80px;
`;

const CompanyName = styled.h1`
  font-size: 24px;
`;

const CompanyDetails = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;

const CustomerInfo = styled.div`
  margin-top: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoLabel = styled.div`
  font-weight: bold;
`;

const InfoValue = styled.div`
  margin-left: 10px;
`;

const SystemConfig = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f9f9f9;
`;

const ConfigRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ConfigLabel = styled.div`
  font-weight: bold;
`;

const ConfigValue = styled.div`
  margin-left: 10px;
`;

const InvoiceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background: #f4f4f4;
  }

  td {
    text-align: right;
  }

  td:first-child {
    text-align: left;
  }
`;

const TotalRow = styled.tr`
  font-weight: bold;
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

const Footer = styled.div`
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
  text-align: center;
  font-size: 12px;
  color: #888;
`;

const GeneratePDF = ({ data, leadsData }) => {
  const componentRef = useRef();
  const { authState } = useContext(AuthContext);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const {
    no_of_modules,
    dc_capacity,
    inv_capacity,
    no_of_phase,
    roof_typ,
    solar_mod_prc,
    subdlr_solar_mod_prc,
    i_and_c_prc,
    bos_prc,
    total,
  } = authState.role === "subdlr" ? data : data[0];

  const invoiceItems =
    authState.role !== "subdlr"
      ? [
          { item: "Solar Module Price", price: solar_mod_prc },
          { item: "I&C Price", price: i_and_c_prc },
          { item: "BOS Price", price: bos_prc },
        ]
      : [
          {
            item: "Solar Module Price",
            price: subdlr_solar_mod_prc,
          },
        ];

  return (
    <>
      <DownloadIcon onClick={handlePrint} />
      <LetterHeadContainer ref={componentRef}>
        <Header>
          <Logo src={logo} alt="Company Logo" />
          <CompanyInfo>
            <CompanyName>GREENSHIFT ENERGY</CompanyName>
            <CompanyDetails>
              123 Business St, Suite 100
              <br />
              Business City, BC 12345
              <br />
              Phone: (123) 456-7890
              <br />
              Email: info@mycompany.com
              <br />
              Date: {formatDateTime(new Date())}
            </CompanyDetails>
          </CompanyInfo>
        </Header>
        {leadsData && (
          <CustomerInfo>
            <InfoRow>
              <InfoLabel>Name:</InfoLabel>
              <InfoValue>{leadsData.name}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Address:</InfoLabel>
              <InfoValue>{leadsData.address}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Phone:</InfoLabel>
              <InfoValue>{leadsData.phone}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Email:</InfoLabel>
              <InfoValue>{leadsData.email}</InfoValue>
            </InfoRow>
          </CustomerInfo>
        )}
        <SystemConfig>
          <ConfigRow>
            <ConfigLabel>No of Modules:</ConfigLabel>
            <ConfigValue>{no_of_modules}</ConfigValue>
          </ConfigRow>
          <ConfigRow>
            <ConfigLabel>DC Capacity (kWp):</ConfigLabel>
            <ConfigValue>{dc_capacity}</ConfigValue>
          </ConfigRow>
          <ConfigRow>
            <ConfigLabel>Solar Inverter Capacity (kW):</ConfigLabel>
            <ConfigValue>{inv_capacity}</ConfigValue>
          </ConfigRow>
          <ConfigRow>
            <ConfigLabel>No. of Phases:</ConfigLabel>
            <ConfigValue>{no_of_phase}</ConfigValue>
          </ConfigRow>
          <ConfigRow>
            <ConfigLabel>Roof Type:</ConfigLabel>
            <ConfigValue>{roof_typ}</ConfigValue>
          </ConfigRow>
        </SystemConfig>
        <InvoiceTable>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {invoiceItems.map((item, index) => (
              <tr key={index}>
                <td>{item.item}</td>
                <td>{item.price}</td>
              </tr>
            ))}
            <TotalRow>
              <td>Total</td>
              {authState.role !== "subdlr" && <td>{total.toFixed(2)}</td>}
              {authState.role === "subdlr" && <td>{subdlr_solar_mod_prc}</td>}
            </TotalRow>
          </tbody>
        </InvoiceTable>
        <Footer>
          Thank you for your business!
          <br />
          If you have any questions about this invoice, please contact us.
        </Footer>
      </LetterHeadContainer>
    </>
  );
};

export default GeneratePDF;
