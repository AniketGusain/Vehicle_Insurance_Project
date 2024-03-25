import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
} from "@/base-components";
import xlsx from "xlsx";
import { useEffect, useRef, createRef, useState } from "react";
import { createIcons, icons } from "lucide";
import Tabulator from "tabulator-tables";
import dom from "@left4code/tw-starter/dist/js/dom";

function Main() {
  const tableRef = createRef();
  const tabulator = useRef();
  const [filter, setFilter] = useState({
    field: "name",
    type: "like",
    value: "",
  });

  const imageAssets = import.meta.globEager(
    `/src/assets/images/*.{jpg,jpeg,png,svg}`
  );
  async function FetchPolicies() {
    let response = await fetch("http://localhost:8081/api/v1/policies/all", {
      headers: { "Content-Type": "application/json" },
      method: "GET",
      // body: JSON.stringify(values),
    });
    let responseData = await response.json();
    tabulator.current.setData(responseData);
  }
  const initTabulator = () => {
    tabulator.current = new Tabulator(tableRef.current, {
      // ajaxURL: "http://localhost:8081/api/v1/policies/all",
      // ajaxFiltering: true,
      // ajaxSorting: true,
      printAsHtml: true,
      printStyled: true,
      pagination: "remote",
      paginationSize: 10,

      paginationSizeSelector: [10, 20, 30, 40],
      layout: "fitColumns",
      responsiveLayout: "collapse",
      placeholder: "No matching records found",
      columns: [
        {
          formatter: "responsiveCollapse",
          width: 40,
          minWidth: 30,
          hozAlign: "center",
          resizable: false,
          headerSort: false,
        },

        // For HTML table
        {
          title: "POLICY ID",
          minWidth: 200,
          responsive: 0,
          field: "id",
          vertAlign: "middle",
          print: false,
          download: false,
          formatter(cell) {
            return `<div>
                ${cell.getData().id}
                </div>`;
          },
        },
        {
          title: "POLICY NAME",
          minWidth: 200,
          responsive: 0,
          field: "policyName",
          vertAlign: "middle",
          print: false,
          download: false,
          formatter(cell) {
            return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().policyName
                }</div>
                
              </div>`;
          },
        },
        {
          title: "POLICY PRICE",
          minWidth: 200,
          field: "policyPrice",
          hozAlign: "center",
          vertAlign: "middle",
          print: false,
          download: false,
          formatter(cell) {
            return `<div>
            <div class="font-medium whitespace-nowrap">${
              cell.getData().policyPrice
            }</div>
            
          </div>`;
          },
        },
        {
          title: "Claims Served",
          minWidth: 200,
          field: "claimsServed",
          hozAlign: "center",
          vertAlign: "middle",
          print: false,
          download: false,
          formatter(cell) {
            return `<div>
            <div class="font-medium whitespace-nowrap">${
              cell.getData().claimsServed
            }</div>
            
          </div>`;
          },
        },
        {
          title: "companyDescriptionved",
          minWidth: 200,
          field: "companyDescription",
          hozAlign: "center",
          vertAlign: "middle",
          print: false,
          download: false,
          formatter(cell) {
            return `<div>
            <div class="font-medium whitespace-nowrap">${
              cell.getData().companyDescription
            }</div>
            
          </div>`;
          },
        },
        {
          title: "policyCompany",
          minWidth: 200,
          field: "policyCompany",
          hozAlign: "center",
          vertAlign: "middle",
          print: false,
          download: false,
          formatter(cell) {
            return `<div>
            <div class="font-medium whitespace-nowrap">${
              cell.getData().policyCompany
            }</div>
            
          </div>`;
          },
        },
        {
          title: "policyDescription",
          minWidth: 200,
          field: "policyDescription",
          hozAlign: "center",
          vertAlign: "middle",
          print: false,
          download: false,
          formatter(cell) {
            return `<div>
            <div class="font-medium whitespace-nowrap">${
              cell.getData().policyDescription
            }</div>
            
          </div>`;
          },
        },
        {
          title: "STATUS",
          minWidth: 200,
          field: "activePolicy",
          hozAlign: "center",
          vertAlign: "middle",
          print: false,
          download: false,
          formatter(cell) {
            return `<div class="flex items-center lg:justify-center ${
              cell.getData().activePolicy ? "text-success" : "text-danger"
            }">
                <i data-lucide="check-square" class="w-4 h-4 mr-2"></i> ${
                  cell.getData().activePolicy ? "Active" : "Inactive"
                }
              </div>`;
          },
        },
        // {
        //   title: "ACTIONS",
        //   minWidth: 200,
        //   field: "actions",
        //   responsive: 1,
        //   hozAlign: "center",
        //   vertAlign: "middle",
        //   print: false,
        //   download: false,
        //   formatter() {
        //     const a = dom(`<div class="flex lg:justify-center items-center">
        //         <a class="flex items-center mr-3" href="javascript:;">
        //           <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
        //         </a>
        //         <a class="flex items-center text-danger" href="javascript:;">
        //           <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> Delete
        //         </a>
        //       </div>`);
        //     dom(a).on("click", function () {
        //       // On click actions
        //     });

        //     return a[0];
        //   },
        // },

        // For print format
        // {
        //   title: "PRODUCT NAME",
        //   field: "name",
        //   visible: false,
        //   print: true,
        //   download: true,
        // },
        // {
        //   title: "CATEGORY",
        //   field: "category",
        //   visible: false,
        //   print: true,
        //   download: true,
        // },
        // {
        //   title: "REMAINING STOCK",
        //   field: "remaining_stock",
        //   visible: false,
        //   print: true,
        //   download: true,
        // },
        // {
        //   title: "STATUS",
        //   field: "status",
        //   visible: false,
        //   print: true,
        //   download: true,
        //   formatterPrint(cell) {
        //     return cell.getValue() ? "Active" : "Inactive";
        //   },
        // },
        // {
        //   title: "IMAGE 1",
        //   field: "images",
        //   visible: false,
        //   print: true,
        //   download: true,
        //   formatterPrint(cell) {
        //     return cell.getValue()[0];
        //   },
        // },
        // {
        //   title: "IMAGE 2",
        //   field: "images",
        //   visible: false,
        //   print: true,
        //   download: true,
        //   formatterPrint(cell) {
        //     return cell.getValue()[1];
        //   },
        // },
        // {
        //   title: "IMAGE 3",
        //   field: "images",
        //   visible: false,
        //   print: true,
        //   download: true,
        //   formatterPrint(cell) {
        //     return cell.getValue()[2];
        //   },
        // },
      ],
      renderComplete() {
        createIcons({
          icons,
          "stroke-width": 1.5,
          nameAttr: "data-lucide",
        });
      },
    });
    tabulator.current.setData("");
  };

  // Redraw table onresize
  const reInitOnResizeWindow = () => {
    window.addEventListener("resize", () => {
      tabulator.current.redraw();
      createIcons({
        icons,
        "stroke-width": 1.5,
        nameAttr: "data-lucide",
      });
    });
  };

  // Filter function
  const onFilter = () => {
    tabulator.current.setFilter(filter.field, filter.type, filter.value);
  };

  // On reset filter
  const onResetFilter = () => {
    setFilter({
      ...filter,
      field: "name",
      type: "like",
      value: "",
    });
    onFilter();
  };

  // Export
  const onExportCsv = () => {
    tabulator.current.download("csv", "data.csv");
  };

  const onExportJson = () => {
    tabulator.current.download("json", "data.json");
  };

  const onExportXlsx = () => {
    const win = window;
    win.XLSX = xlsx;
    tabulator.current.download("xlsx", "data.xlsx", {
      sheetName: "Products",
    });
  };

  const onExportHtml = () => {
    tabulator.current.download("html", "data.html", {
      style: true,
    });
  };

  // Print
  const onPrint = () => {
    tabulator.current.print();
  };

  useEffect(() => {
    initTabulator();
    reInitOnResizeWindow();
    FetchPolicies();
  }, []);

  return (
    <>
      <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Active policies</h2>
        <div className="w-full sm:w-auto flex mt-4 sm:mt-0"></div>
      </div>
      {/* BEGIN: HTML Table Data */}
      <div className="intro-y box p-5 mt-5">
        <div className="flex flex-col sm:flex-row sm:items-end xl:items-start">
          <form id="tabulator-html-filter-form" className="xl:flex sm:mr-auto">
            <div className="sm:flex items-center sm:mr-4">
              <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                Field
              </label>
              <select
                id="tabulator-html-filter-field"
                value={filter.field}
                onChange={(e) => {
                  setFilter({
                    ...filter,
                    field: e.target.value,
                  });
                }}
                className="form-select w-full sm:w-32 2xl:w-full mt-2 sm:mt-0 sm:w-auto"
              >
                <option value="policy_name">Name</option>
                <option value="policy_price">Price</option>
              </select>
            </div>
            <div className="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
              <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                Type
              </label>
              <select
                id="tabulator-html-filter-type"
                value={filter.type}
                onChange={(e) => {
                  setFilter({
                    ...filter,
                    type: e.target.value,
                  });
                }}
                className="form-select w-full mt-2 sm:mt-0 sm:w-auto"
              >
                <option value="like">like</option>
              </select>
            </div>
            <div className="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
              <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                Value
              </label>
              <input
                id="tabulator-html-filter-value"
                value={filter.value}
                onChange={(e) => {
                  setFilter({
                    ...filter,
                    value: e.target.value,
                  });
                }}
                type="text"
                className="form-control sm:w-40 2xl:w-full mt-2 sm:mt-0"
                placeholder="Search..."
              />
            </div>
            <div className="mt-2 xl:mt-0">
              <button
                id="tabulator-html-filter-go"
                type="button"
                className="btn btn-primary w-full sm:w-16"
                onClick={onFilter}
              >
                Go
              </button>
              <button
                id="tabulator-html-filter-reset"
                type="button"
                className="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 sm:ml-1"
                onClick={onResetFilter}
              >
                Reset
              </button>
            </div>
          </form>
          {/* <div className="flex mt-5 sm:mt-0">
            <button
              id="tabulator-print"
              className="btn btn-outline-secondary w-1/2 sm:w-auto mr-2"
              onClick={onPrint}
            >
              <Lucide icon="Printer" className="w-4 h-4 mr-2" /> Print
            </button>
            <Dropdown className="w-1/2 sm:w-auto">
              <DropdownToggle className="btn btn-outline-secondary w-full sm:w-auto">
                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export
                <Lucide
                  icon="ChevronDown"
                  className="w-4 h-4 ml-auto sm:ml-2"
                />
              </DropdownToggle>
              <DropdownMenu className="w-40">
                <DropdownContent>
                  <DropdownItem onClick={onExportCsv}>
                    <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export
                    CSV
                  </DropdownItem>
                  <DropdownItem onClick={onExportJson}>
                    <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export
                    JSON
                  </DropdownItem>
                  <DropdownItem onClick={onExportXlsx}>
                    <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export
                    XLSX
                  </DropdownItem>
                  <DropdownItem onClick={onExportHtml}>
                    <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export
                    HTML
                  </DropdownItem>
                </DropdownContent>
              </DropdownMenu>
            </Dropdown>
          </div> */}
        </div>
        <div className="overflow-x-auto scrollbar-hidden">
          <div
            id="tabulator"
            ref={tableRef}
            className="mt-5 table-report table-report--tabulator"
          ></div>
        </div>
      </div>
      {/* END: HTML Table Data */}
    </>
  );
}

export default Main;
