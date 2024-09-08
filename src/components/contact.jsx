import React, { useState } from "react";
import styled from "styled-components";
import { sendLeadDetails } from "../api/postLead";

// Define the styled components

const Selector = styled.div`
  position: relative;
  width: 60%;
  background-color: white;
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 9999px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    width: 90%;
  }
`;

const SelectorItem = styled.div`
  position: relative;
  flex-basis: calc(70% / 3);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const SelectorItemRadio = styled.input`
  appearance: none;
  display: none;

  &:checked + label {
    background-color: #5ca9fb;
    color: white;
    transform: translateY(-2px);
    margin-top: 20px;
    padding-bottom: 50px;
  }
`;

const SelectorItemLabel = styled.label`
  position: relative;
  height: 80%;
  width: 100%;
  text-align: center;
  border-radius: 9999px;
  line-height: 400%;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  transition-duration: 0.5s;
  transition-property: transform, box-shadow;
  transform: none;
  margin-bottom: 25px;
  color: black;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Column = styled.div`
  flex: 0 0 48%;
`;

const initialState = {
  name: "",
  email: "",
  message: "",
  phone: "",
  address: "",
  electricityBillDetails: "",
  typeOfRoof: "",
  subsidy: "No",
  financing: "No",
};

export const Contact = (props) => {
  const [formState, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const clearState = () => setState({ ...initialState });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);

    try {
      await sendLeadDetails(formState);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Get In Touch</h2>
                <p>
                  Please fill out the form below to send us an email and we will
                  get back to you as soon as possible.
                </p>
              </div>
              <form name="sentMessage" validate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-control"
                    placeholder="Phone Number"
                    required
                    onChange={handleChange}
                    pattern="[1-9]{1}[0-9]{9}"
                  />
                  <p className="help-block text-danger"></p>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-control"
                    placeholder="Address / Google location of building"
                    required
                    onChange={handleChange}
                  />
                  <p className="help-block text-danger"></p>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="electricityBillDetails"
                    name="electricityBillDetails"
                    className="form-control"
                    placeholder="Electricity Bill Details"
                    required
                    onChange={handleChange}
                  />
                  <p className="help-block text-danger"></p>
                </div>
                <div className="form-group">
                  <select
                    id="typeOfRoof"
                    name="typeOfRoof"
                    className="form-control"
                    required
                    onChange={handleChange}
                  >
                    <option value="" disabled selected>
                      Type of Roof
                    </option>
                    <option value="RCC">RCC</option>
                    <option value="Sheet Roof">Sheet Roof</option>
                    <option value="Without MMS">Without MMS</option>
                  </select>
                  <p className="help-block text-danger"></p>
                </div>
                <Row>
                  <Column>
                    <div className="form-group">
                      <label style={{ fontSize: "25px", marginRight: "10px" }}>
                        Subsidy:
                      </label>
                      <Selector>
                        <SelectorItem>
                          <SelectorItemRadio
                            type="radio"
                            id="subsidyYes"
                            name="subsidy"
                            value="Yes"
                            checked={formState.subsidy === "Yes"}
                            onChange={handleChange}
                          />
                          <SelectorItemLabel htmlFor="subsidyYes">
                            Yes
                          </SelectorItemLabel>
                        </SelectorItem>
                        <SelectorItem>
                          <SelectorItemRadio
                            type="radio"
                            id="subsidyNo"
                            name="subsidy"
                            value="No"
                            checked={formState.subsidy === "No"}
                            onChange={handleChange}
                          />
                          <SelectorItemLabel htmlFor="subsidyNo">
                            No
                          </SelectorItemLabel>
                        </SelectorItem>
                      </Selector>
                      <p className="help-block text-danger"></p>
                    </div>
                  </Column>
                  <Column>
                    <div className="form-group">
                      <label style={{ fontSize: "25px", marginRight: "10px" }}>
                        Financing:
                      </label>
                      <Selector>
                        <SelectorItem>
                          <SelectorItemRadio
                            type="radio"
                            id="financingYes"
                            name="financing"
                            value="Yes"
                            checked={formState.financing === "Yes"}
                            onChange={handleChange}
                          />
                          <SelectorItemLabel htmlFor="financingYes">
                            Yes
                          </SelectorItemLabel>
                        </SelectorItem>
                        <SelectorItem>
                          <SelectorItemRadio
                            type="radio"
                            id="financingNo"
                            name="financing"
                            value="No"
                            checked={formState.financing === "No"}
                            onChange={handleChange}
                          />
                          <SelectorItemLabel htmlFor="financingNo">
                            No
                          </SelectorItemLabel>
                        </SelectorItem>
                      </Selector>
                      <p className="help-block text-danger"></p>
                    </div>
                  </Column>
                </Row>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="Message"
                    required
                    onChange={handleChange}
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Contact Info</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> Address
                </span>
                {props.data ? props.data.address : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Phone
                </span>{" "}
                {props.data ? props.data.phone : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email
                </span>{" "}
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <a href={props.data ? props.data.facebook : "/"}>
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.twitter : "/"}>
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.youtube : "/"}>
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>&copy; 2024 Greenshift Energy</p>
        </div>
      </div>
    </div>
  );
};
