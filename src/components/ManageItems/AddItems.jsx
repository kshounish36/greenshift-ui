import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CustomSelect from "../ManageItems/../CustomSelect"; // The CustomSelect component for the dropdown
import { Select, Input, Banner, Button } from "../CommonStyles";
import { useLocation } from "react-router-dom";
import {
  createSolarItemDetails,
  updateSolarItemDetails,
} from "../../api/ManageItems/solarModuleSysDetails";
import { fetchBosItemsDetails } from "../../api/ManageItems/bosItemsDetasils";

// Styled components
const FormWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Field = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  width: 100%;
`;

const NumberInput = styled.input`
  width: 70px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-left: 10px;
`;

const AddButton = styled.button`
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const RemoveButton = styled.button`
  padding: 10px 15px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #e41f1f;
  }
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  background-color: #008cba;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005f6a;
  }
`;

const BosItemRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1.5fr 0.5fr 0.5fr;
  justify-content: start;
  align-items: stretch;
  padding: 10px;
`;

const initialState = {
  noOfModules: "",
  dcCapacity: "",
  invCapacity: "",
  noOfPhase: "",
  roofTyp: "",
  solarModPrc: "",
  subdlrSolarModPrc: "",
  iAndCPrc: "",
  bosPrc: "",
  sysType: "",
  bosItems: [{ item_id: "", quantity: "" }],
};

const SolarItemInputForm = ({ initialValues, onSubmit }) => {
  const [formState, setFormState] = useState(initialValues || initialState);
  const [bosItems, setBosItems] = useState([]);

  useEffect(() => {
    if (initialValues) {
      setFormState({
        noOfModules: initialValues.no_of_modules,
        dcCapacity: initialValues.dc_capacity,
        invCapacity: initialValues.inv_capacity,
        noOfPhase: initialValues.no_of_phase,
        roofTyp: initialValues.roof_typ,
        solarModPrc: initialValues.solar_mod_prc,
        subdlrSolarModPrc: initialValues.subdlr_solar_mod_prc,
        iAndCPrc: initialValues.i_and_c_prc,
        bosPrc: initialValues.bos_prc,
        sysType: initialValues.sysType,
        bosItems: initialValues.bos_itm_qty.map((item) => ({
          item_id: Object.keys(item)[0],
          quantity: Object.values(item)[0],
        })),
      });
    }
    const fetchBOSItems = async () => {
      const bosItemDetails = await fetchBosItemsDetails();
      setBosItems(bosItemDetails);
    };
    fetchBOSItems();
  }, [initialValues]);

  const handleInputChange = (e) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [e.target.name]: e.target.value,
    }));
    console.log(formState);
  };

  const handleBosItemChange = (index, field, value) => {
    const bosItems = [...formState.bosItems];
    bosItems[index][field] = value;
    setFormState({ ...formState, bosItems });
  };

  const removeBosItemRow = (index) => {
    const bosItems = formState.bosItems.filter((_, i) => i !== index);
    setFormState({ ...formState, bosItems });
  };

  const addBosItemRow = () => {
    setFormState({
      ...formState,
      bosItems: [...formState.bosItems, { item_id: "", quantity: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bos_itm_qty = formState.bosItems.reduce((acc, item) => {
      if (item.item_id && item.quantity) {
        acc.push({ [item.item_id]: parseInt(item.quantity) });
      }
      return acc;
    }, []);

    const payload = {
      ...formState,
      bos_itm_qty,
    };

    try {
      if (initialValues) {
        // Update mode
        await updateSolarItemDetails(payload);
        onSubmit(payload);
      } else {
        // Add new record
        await createSolarItemDetails(payload);
      }
    } catch (error) {
      console.error("Error submitting solar item details form::", error);
    }
  };

  const resetForm = () => {
    setFormState(initialState);
  };

  return (
    <div>
      <Banner>Solar Installation Items & Cost Details</Banner>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <Field>
            <Label>No of Modules</Label>
            <Input
              type="number"
              name="noOfModules"
              value={formState.noOfModules}
              onChange={handleInputChange}
            />
          </Field>
          <Field>
            <Label>DC Capacity</Label>
            <Input
              type="number"
              name="dcCapacity"
              value={formState.dcCapacity}
              onChange={handleInputChange}
            />
          </Field>
          <Label>Type of System:</Label>
          <Select
            required
            name="sysType"
            onChange={handleInputChange}
            value={formState.sysType}
          >
            <option value="" disabled selected hidden>
              Select Type of System
            </option>
            <option value="grid-tied">On Grid</option>
            <option value="off-grid">Off Grid</option>
            <option value="hybrid">Hybrid</option>
          </Select>
          <Label>Inverter Capacity</Label>
          <Input
            type="number"
            name="invCapacity"
            value={formState.invCapacity}
            onChange={handleInputChange}
          />
          <Label>No Of Phase</Label>
          <Select
            required
            name="noOfPhase"
            onChange={handleInputChange}
            value={formState.noOfPhase}
          >
            <option value="" disabled selected hidden>
              Select Phase
            </option>
            <option value="1">Single Phase</option>
            <option value="3">Three Phase</option>
          </Select>
          <Label>Type of Roof:</Label>
          <Select
            required
            name="roofTyp"
            value={formState.roofTyp}
            onChange={handleInputChange}
          >
            <option value="" disabled selected hidden>
              Select Type of Roof
            </option>
            <option value="rcc">RCC</option>
            <option value="sheet roof">Sheet Roof</option>
            <option value="w/o mms">Without MMS</option>
          </Select>
          <Label>Solar Module Price</Label>
          <Input
            type="number"
            name="solarModPrc"
            value={formState.solarModPrc}
            onChange={handleInputChange}
          />
          <Label>Sub Dealer Solar Module Price</Label>
          <Input
            type="number"
            name="subdlrSolarModPrc"
            value={formState.subdlrSolarModPrc}
            onChange={handleInputChange}
          />
          <Label>Installation Cost</Label>
          <Input
            type="number"
            name="iAndCPrc"
            value={formState.iAndCPrc}
            onChange={handleInputChange}
          />
          <Label>BOS Cost</Label>
          <Input
            type="number"
            name="bosPrc"
            value={formState.bosPrc}
            onChange={handleInputChange}
          />
          <Field>
            <Label>
              Select BOS Items and Qty. Required For This Configuration
            </Label>
            {bosItems &&
              formState?.bosItems?.map((item, index) => (
                <BosItemRow key={index}>
                  <CustomSelect
                    placeholder={
                      initialValues
                        ? bosItems
                            ?.find(
                              (i) =>
                                parseInt(i.item_id) === parseInt(item.item_id)
                            )
                            ?.item_nm.toString()
                        : "Select BOS Item"
                    }
                    component="addsolaritems"
                    data={bosItems}
                    onChange={(selectedOption) =>
                      handleBosItemChange(
                        index,
                        "item_id",
                        selectedOption.value
                      )
                    }
                  />
                  <NumberInput
                    placeholder="Qty."
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleBosItemChange(index, "quantity", e.target.value)
                    }
                  />
                  <AddButton type="button" onClick={addBosItemRow}>
                    +
                  </AddButton>
                  {index === 0 && (
                    <RemoveButton
                      type="button"
                      onClick={() => removeBosItemRow(index)}
                      style={{ visibility: "hidden" }}
                    >
                      -
                    </RemoveButton>
                  )}
                  {index !== 0 && (
                    <RemoveButton
                      type="button"
                      onClick={() => removeBosItemRow(index)}
                    >
                      -
                    </RemoveButton>
                  )}
                </BosItemRow>
              ))}
          </Field>

          <SubmitButton type="submit">
            {initialValues ? "Update" : "Add"}
          </SubmitButton>
        </form>
      </FormWrapper>
    </div>
  );
};

export default SolarItemInputForm;
