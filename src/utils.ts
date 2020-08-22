import Swal from "sweetalert2";
const $ = require("jquery");
$.DataTable = require("datatables.net");

const utils = {
  showSuccess: (msg: string) => {
    Swal.fire({
      text: msg,
      icon: "success",
    });
  },
  showError: (msg: string) => {
    Swal.fire({
      title: "Cancelled",
      text: msg,
      icon: "error",
    });
  },
  getAppName: () => {
    return " | Kartzoo App";
  },
  getHeaderDetail: () => {
    return {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Access-Control-Allow-Origin": "*",
      crossdomain: true,
    };
  },
  alertMessage: async (text:string,btext:string) => {
    let response = false;
    let result = await Swal.fire({
        title: "Are you sure?",
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: btext,
        cancelButtonText: "No, keep it",
    });
    if(result.value) {
        response = true
    } else if (result.dismiss === Swal.DismissReason.cancel) {
        const msg1 = "safe";
        utils.showError(msg1);
        response = false;
    }
    return response;
  },
  dataTable: () => {
  let table = $("#dtBasicExample").DataTable({
      paging: false,
      info: false,
      searching: false,
      sorting: false,
      ordering: false,
    });
    return table;
  }
};

export default utils;
