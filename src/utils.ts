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
    return " | Merchant Panel";
  },
  getMerchantHeaderDetail: () => {
    return {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      "Access-Control-Allow-Origin": "*",
      crossdomain: true,
    };
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
  },
  compareByDesc(key: any,sort:any) {
    if (sort) {
      return function (a: any, b: any) {
        if (a[key] < b[key]) return -1; // check for value if the second value is bigger then first return -1
        if (a[key] > b[key]) return 1; //check for value if the second value is bigger then first return 1
        return 0;
      };
    } else {
      return function (a: any, b: any) {
        if (a[key] > b[key]) return -1;
        if (a[key] < b[key]) return 1;
        return 0;
      };
    }
  },
  pageNumber(count:string,perpage:string) {
    var pageNumbers = [];
    for (
      let i = 1;
      i <=
      Math.ceil(
        parseInt(count) / parseInt(perpage)
      );
      i++
    ) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
};

export default utils;
