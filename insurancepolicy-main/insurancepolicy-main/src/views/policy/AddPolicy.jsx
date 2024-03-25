import React, { useState } from "react";
import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TinySlider,
  PreviewComponent,
  Preview,
  Source,
  Highlight,
} from "@/base-components";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { AddPolicySchema } from "../../schemas";
import Tabulator from "../tabulator/Main";
import { helper } from "../../utils/helper";
function AddPolicy() {
  const [superlargeModalSizePreview, setSuperlargeModalSizePreview] =
    useState(false);
  const navigate = useNavigate();
  const initialValues = {
    policyName: "",
    policyPrice: 0,
    policyDescription: "",
    policyCompany: "",
    policyCompanyDescription: "",
    activePolicy: "",
    claimsServed: 0,
  };
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: AddPolicySchema,
      onSubmit: async (values, action) => {
        console.log("values: ", values);
        // your form submission logic here(endpoint call)
        let response = await fetch(
          "http://localhost:8081/api/v1/policies/create",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            method: "POST",
            body: JSON.stringify(values),
          }
        );
        let responseData = await response.json();
        if (response.ok) {
          console.log("success");
          action.resetForm();
          helper.fireToast("success", "Policy Added");
          setSuperlargeModalSizePreview(false);
          return;
        }
        helper.fireToast("error", "Policy Not Added");
        console.log("responseData: ", responseData);
        // reset form
        // action.resetForm();

        // set current user in state
        // dispatch(addUser(responseData));
        // navigate to signup on success
        // navigate("/dashboard");
      },
    });
  return (
    <>
      <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
        <h2 className="font-medium text-base mr-auto"></h2>
        <a
          href="#"
          onClick={() => {
            setSuperlargeModalSizePreview(true);
          }}
          className="btn btn-primary mr-1 mb-2"
        >
          Add New Policy
        </a>
      </div>
      <div className="p-5">
        {/* BEGIN: Super Large Modal Content */}
        <Modal
          backdrop="static" // Prevents closing on click outside the modal
          keyboard={false} // Prevents closing with the keyboard (e.g., pressing Esc key)
          size="modal-xl"
          show={superlargeModalSizePreview}
          onHidden={() => {
            setSuperlargeModalSizePreview(false);
          }}
        >
          <ModalBody className="p-10 text-center">
            <div className="flex justify-end w-full">
              <button onClick={() => setSuperlargeModalSizePreview(false)}>
                <Lucide icon="X"></Lucide>
              </button>
            </div>
            <h1 className="text-2xl">Add Policy</h1>
            {/* POLICY FIELDS */}
            <form onSubmit={handleSubmit}>
              <div className="intro-x mt-8">
                <div className="flex-col items-start form-check form-switch w-full  mt-3 sm:mt-0 ">
                  <label
                    htmlFor="policyName"
                    className="form-check-label ml-0 mt-4"
                  >
                    Policy name
                  </label>
                  <input
                    type="text"
                    name="policyName"
                    className="intro-x login__input form-control py-3 px-4 block "
                    placeholder="Policy name"
                    value={values.policyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.policyName && touched.policyName && (
                    <p className="text-red-800">{errors.policyName}</p>
                  )}
                </div>
                <div className="flex-col items-start form-check form-switch w-full  mt-3 sm:mt-0 ">
                  <label
                    htmlFor="policyPrice"
                    className="form-check-label ml-0 mt-4"
                  >
                    Policy price
                  </label>
                  <input
                    type="number"
                    name="policyPrice"
                    className="intro-x login__input form-control py-3 px-4 block "
                    placeholder="Policy price"
                    value={values.policyPrice}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.policyPrice && touched.policyPrice && (
                    <p className="text-red-800 ">{errors.policyPrice}</p>
                  )}
                </div>
                <div className="flex-col items-start form-check form-switch w-full  mt-3 sm:mt-0 ">
                  <label
                    htmlFor="policyDescription"
                    className="form-check-label ml-0 mt-4"
                  >
                    Policy description
                  </label>
                  <textarea
                    name="policyDescription"
                    className="intro-x login__input form-control py-3 px-4 block "
                    placeholder="Policy description"
                    value={values.policyDescription}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.policyDescription && touched.policyDescription && (
                    <p className="text-red-800">{errors.policyDescription}</p>
                  )}
                </div>
                <div className="flex-col items-start form-check form-switch w-full  mt-3 sm:mt-0 ">
                  <label
                    htmlFor="policyCompanyDescription"
                    className="form-check-label ml-0 mt-4"
                  >
                    Company Description
                  </label>
                  <textarea
                    name="policyCompanyDescription"
                    className="intro-x login__input form-control py-3 px-4 block "
                    placeholder="Policy company description"
                    value={values.policyCompanyDescription}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.policyCompanyDescription &&
                    touched.policyCompanyDescription && (
                      <p className="text-red-800">
                        {errors.policyCompanyDescription}
                      </p>
                    )}
                </div>
                <div className="flex-col items-start form-check form-switch w-full  mt-3 sm:mt-0 ">
                  <label
                    htmlFor="policyCompany"
                    className="form-check-label ml-0 mt-4"
                  >
                    Policy company
                  </label>
                  <input
                    type="text"
                    name="policyCompany"
                    className="intro-x login__input form-control py-3 px-4 block "
                    placeholder="Policy company"
                    value={values.policyCompany}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.policyCompany && touched.policyCompany && (
                    <p className="text-red-800">{errors.policyCompany}</p>
                  )}
                </div>
                <div className="flex-col items-start form-check form-switch w-full  mt-3 sm:mt-0 ">
                  <label
                    htmlFor="claimsServed"
                    className="form-check-label ml-0 mt-4"
                  >
                    Claims served
                  </label>
                  <input
                    type="number"
                    name="claimsServed"
                    className="intro-x login__input form-control py-3 px-4 block "
                    value={values.claimsServed}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.claimsServed && touched.claimsServed && (
                    <p className="text-red-800">{errors.claimsServed}</p>
                  )}
                </div>
                <div className="flex-col items-start form-check form-switch w-full mt-3 sm:mt-0">
                  <label
                    htmlFor="activePolicy"
                    className="form-check-label ml-0 mt-4"
                  >
                    Policy Status
                  </label>
                  <select
                    name="activePolicy"
                    className="intro-x login__input form-control py-3 px-4 block"
                    value={values.activePolicy}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                  {errors.activePolicy && touched.activePolicy && (
                    <p className="text-red-800">{errors.activePolicy}</p>
                  )}
                </div>
              </div>
              <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                <button className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top">
                  Submit
                </button>
              </div>
            </form>
          </ModalBody>
        </Modal>
        {/* END: Super Large Modal Content */}
      </div>
      {/* TABULATOR */}
      <div>
        <Tabulator />
      </div>
    </>
  );
}

export default AddPolicy;
