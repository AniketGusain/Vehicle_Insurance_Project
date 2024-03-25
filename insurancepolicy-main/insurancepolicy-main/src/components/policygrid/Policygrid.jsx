import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  Modal,
  ModalBody,
} from "@/base-components";
// import IMAGES from "../../assets/images/Images";
import { useEffect, useState } from "react";
import { helper } from "../../utils/helper";
import { useSelector } from "react-redux";

function Policygrid() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [availablePolicies, setAvailablePolicies] = useState([]);
  const [currentPolicy, setCurrentPolicy] = useState({
    policyId: "",
    policyName: "",
    policyPrice: 0,
    policyDescription: "",
    policyCompany: "",
    policyCompanyDescription: "",
    activePolicy: "",
    claimsServed: 0,
  });
  const initialState = {
    policyId: "",
    policyName: "",
    policyPrice: 0,
    policyDescription: "",
    policyCompany: "",
    policyCompanyDescription: "",
    activePolicy: "",
    claimsServed: 0,
  };
  const [staticBackdropModalPreview, setStaticBackdropModalPreview] =
    useState(false);
  // function fetch policies
  async function fetchpolicies() {
    // call your api here
    let response = await fetch("http://localhost:8081/api/v1/policies/all", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      // body: JSON.stringify(values),
    });
    let responseData = await response.json();

    // handle response and set jsonData into the state
    var PolicyData = responseData;
    setAvailablePolicies(PolicyData);

    console.log("policies fetched and set in state" + responseData);
  }
  // open modal to apply policy
  function openApplyModal(policy) {
    console.log("current policy: ", policy);
    setCurrentPolicy({
      ...currentPolicy,
      policyId: policy.id,
      policyName: policy.policyName,
      policyPrice: policy.policyPrice,
      policyDescription: policy.policyDescription,
      policyCompany: policy.policyCompany,
      policyCompanyDescription: policy.policyCompanyDescription,
      activePolicy: policy.activePolicy,
      claimsServed: policy.claimsServed,
    });
    setStaticBackdropModalPreview(true);
  }
  // submit policy request
  const currentUserId = useSelector((state) => state.user.value.id);
  const submitRequest = async () => {
    console.log("policy submitted: ", currentPolicy);
    // handle api call here

    var data = {};
    data["userId"] = currentUserId;
    data["policyId"] = currentPolicy.policyId;
    console.log(data);
    // your form submission logic here(endpoint call)
    let response = await fetch(
      "http://localhost:8081/api/v1/proposals/create",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    let responseData = await response.json();
    if (response.ok) {
      console.log("success");
      helper.fireToast("success", "Policy request submitted");
      setStaticBackdropModalPreview(false);
      return;
      // localStorage.setItem("jwt", responseData.jwt);
    }
    helper.fireToast("error", "Invalid");
    console.log("responseData: ", responseData);
    // reset form

    // show success on that bases

    // close modal here
  };
  // fetch all the policies when the page loads at once
  useEffect(() => {
    if (availablePolicies.length == 0) {
      console.log("policy state set");
      fetchpolicies();
    }
    console.log("available polices: ", availablePolicies);
  }, [availablePolicies]);
  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Available policies</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        {/* BEGIN: Users Layout */}
        {availablePolicies.length &&
          availablePolicies.map((policy) => (
            <div
              key={policy.policyId}
              className="intro-y col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
            >
              <div className="box">
                <div className="p-5">
                  <div className="h-40 2xl:h-56 image-fit rounded-md overflow-hidden before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10">
                    <img
                      alt="No image available"
                      className="rounded-md"
                      src=""
                    />
                    {/* {faker.trueFalse[0] && (
                      <span className="absolute top-0 bg-pending/80 text-white text-xs m-5 px-2 py-1 rounded z-10">
                        Featured
                      </span>
                    )} */}
                    <div className="absolute bottom-0 text-white px-5 pb-6 z-10">
                      <a href="" className="block font-medium text-base">
                        {policy.policyName}
                      </a>
                      <span className="text-white/90 text-xs mt-3">
                        {policy.policyCompany}
                      </span>
                    </div>
                  </div>
                  <div className="text-slate-600 dark:text-slate-500 mt-5">
                    <div className="flex items-center">
                      <Lucide icon="Link" className="w-4 h-4 mr-2" /> Price:
                      &#8377;
                      {policy.policyPrice}
                    </div>
                    {/* <div className="flex items-center mt-2">
                      <Lucide icon="Layers" className="w-4 h-4 mr-2" /> Remaining
                      Stock:
                      {faker.stocks[0]}
                    </div> */}
                    <div className="flex items-center mt-2">
                      <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />{" "}
                      Status:
                      {policy.activePolicy == true ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center lg:justify-end items-center p-5 border-t border-slate-200/60 dark:border-darkmode-400">
                  {policy.activePolicy == true ? (
                    <button
                      className="flex items-center btn btn-success mr-auto"
                      onClick={() => openApplyModal(policy)}
                    >
                      <Lucide icon="Check" className="w-4 h-4 mr-1" /> Apply
                    </button>
                  ) : (
                    ""
                  )}
                  {/* <a className="flex items-center mr-3" href="#">
                    <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" /> Edit
                  </a>
                  <a
                    className="flex items-center text-danger"
                    href="#"
                    onClick={() => {
                      setDeleteConfirmationModal(true);
                    }}
                  >
                    <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                  </a> */}
                </div>
              </div>
            </div>
          ))}
        {/* END: Users Layout */}
        {/* BEGIN: Pagination */}
        {/* <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
            <nav className="w-full sm:w-auto sm:mr-auto">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#">
                    <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    <Lucide icon="ChevronLeft" className="w-4 h-4" />
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    ...
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    ...
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    <Lucide icon="ChevronRight" className="w-4 h-4" />
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    <Lucide icon="ChevronsRight" className="w-4 h-4" />
                  </a>
                </li>
              </ul>
            </nav>
            <select className="w-20 form-select box mt-3 sm:mt-0">
              <option>10</option>
              <option>25</option>
              <option>35</option>
              <option>50</option>
            </select>
          </div> */}
        {/* END: Pagination */}
      </div>
      {/* BEGIN: Delete Confirmation Modal */}
      <Modal
        show={deleteConfirmationModal}
        onHidden={() => {
          setDeleteConfirmationModal(false);
        }}
      >
        <ModalBody className="p-0">
          <div className="p-5 text-center">
            <Lucide
              icon="XCircle"
              className="w-16 h-16 text-danger mx-auto mt-3"
            />
            <div className="text-3xl mt-5">Are you sure?</div>
            <div className="text-slate-500 mt-2">
              Do you really want to delete these records? <br />
              This process cannot be undone.
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <button
              type="button"
              onClick={() => {
                setDeleteConfirmationModal(false);
              }}
              className="btn btn-outline-secondary w-24 mr-1"
            >
              Cancel
            </button>
            <button type="button" className="btn btn-danger w-24">
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
      {/* END: Delete Confirmation Modal */}

      {/* BEGIN: Apply Policy Modal */}
      <Modal
        backdrop="static"
        show={staticBackdropModalPreview}
        onHidden={() => {
          setStaticBackdropModalPreview(false);
        }}
      >
        <ModalBody className="px-5 py-10">
          <div className="text-center">
            <div className="mb-5">
              {/* POLICY CONTENT HERE */}
              <div class="px-4 pt-8">
                <p className="text-xl font-medium">Order Summary</p>
                <p className="text-gray-400">
                  Check your policy details before checkout.
                </p>
                <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                  <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                    <img
                      className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                      src=""
                      alt=""
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="font-semibold text-3xl">
                        {currentPolicy.policyName}
                      </span>
                      <span className="float-right text-gray-400">
                        Claims Served : {currentPolicy.claimsServed}
                      </span>
                      <p className="mt-auto text-lg font-bold">
                        &#8377; {currentPolicy.policyPrice}
                      </p>
                      <p className="float-right text-gray-400">
                        Description: {currentPolicy.policyDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* POLICY CONTENT HERE */}
            </div>
            <button
              type="button"
              onClick={() => {
                setStaticBackdropModalPreview(false);
              }}
              className="btn btn-danger mr-2"
            >
              close
            </button>
            <button
              type="button"
              onClick={() => {
                submitRequest();
              }}
              className="btn btn-success "
            >
              Submit Request
            </button>
          </div>
        </ModalBody>
      </Modal>
      {/* END: Apply Policy Modal */}
    </>
  );
}
export default Policygrid;
