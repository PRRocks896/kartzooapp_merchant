import axios from "axios";
import constant from "./constant/constant";
import utils from "./utils";
const publicIp = require("public-ip");
let oldRequest: any;
let reqCount = 0;

interface axios {
  [key: string]: any; // Add index signature
}

axios.interceptors.request.use(
  (req: any) => {
    // const users:any = localStorage.getItem('user');
    // let auth =  JSON.parse(users);
    // req.headers['Authorization'] = 'Barier ' + (auth ? auth.token : '');
    //config.data['end_user_key'] = auth ? auth.secret_key : '';

    if (req.url !== constant.apiUrl + "token") {
      oldRequest = {};
      oldRequest["url"] = req.url;
      oldRequest["body"] = req.data;
      oldRequest["method"] = req.method;
      oldRequest["headers"] = req.headers;
    } else {
      //reqCount = 0;
      //console.log("auth".auth)
      console.log("config", req);
    }
    return req;
  },
  function (error) {
    console.log("error: ", error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log("res", response);
    return response;
  },
  (err: any) => {
    console.log("err", err.response);
    if(err.response !== undefined) {
      if(err.response.data !== null) {
        if(err.response.data.message.length>0 && err.response.data.status === 400) {
          const msg1 = err.response.data.message[0].message;
          utils.showError(msg1);
        } else if( err.response.data.message.length>0 && err.response.data.status === 500) {
          const msg1 = err.response.data.message[0].message;
          utils.showError(msg1);
        } else if(err.response.data.status === 401) {
          const users: any = localStorage.getItem("user");
          let user = JSON.parse(users);
          return new Promise(async (resolve, reject) => {
            const ipaddress = publicIp.v4();
            const originalReq = err.config;
            originalReq._retry = true;
            let oldCount = 0;
      
            // if(err.response)
            const data = {
              deviceType: 1,
              deviceId: "deviceId",
              ipAddress: await ipaddress,
              loginToken: user.token,
              refreshToken: user.refreshToken,
            };
      
            // let res = axios
            //   .post(constant.apiUrl + "token", data)
            //   .then((res: any) => {
            //     console.log("res", res);
            //     localStorage.setItem("token", JSON.stringify(res.data.token));
            //     // oldRequest
            //     if (oldCount === 0) {
            //       oldCount = 1;
            //       oldRequest.headers["Authorization"] =
            //         "Barier " + (res.data ? res.data.token : "");
            //       console.log("oldRequest", oldRequest);
            //       // console.log("oldRequest.url",oldRequest.url)
            //       switch (oldRequest['method']) {
            //         case "GET":
            //           axios
            //             .get(oldRequest.url, { headers: oldRequest.headers })
            //             .then((result: any) => {
            //               // console.log("oldrequest result ", result1)
            //               // console.log("oldrequest result response", response)
            //               //return result1;
            //               return result;
            //             })
            //             .catch((error1: any) => {
            //               // console.log("oldrequest error ", error1)
            //               return error1;
            //             });
            //           break;
            //         case "POST":
            //           axios
            //             .post(oldRequest.url, oldRequest.body, {
            //               headers: oldRequest.headers,
            //             })
            //             .then((result: any) => {
            //               // console.log("oldrequest result ", result1)
            //               // console.log("oldrequest result response", response)
            //               //return result1;
            //               return result;
            //             })
            //             .catch((error1: any) => {
            //               // console.log("oldrequest error ", error1)
            //               return error1;
            //             });
            //           break;
            //         case "PUT":
            //           axios
            //             .put(oldRequest.url, oldRequest.body, {
            //               headers: oldRequest.headers,
            //             })
            //             .then((result: any) => {
            //               // console.log("oldrequest result ", result1)
            //               // console.log("oldrequest result response", response)
            //               //return result1;
            //               return result;
            //             })
            //             .catch((error1: any) => {
            //               // console.log("oldrequest error ", error1)
            //               return error1;
            //             });
            //           break;
            //         case "DELETE":
            //           axios
            //             .delete(oldRequest.url, {
            //               headers: oldRequest.headers,
            //             })
            //             .then((result: any) => {
            //               // console.log("oldrequest result ", result1)
            //               // console.log("oldrequest result response", response)
            //               //return result1;
            //               return result;
            //             })
            //             .catch((error1: any) => {
            //               // console.log("oldrequest error ", error1)
            //               return error1;
            //             });
            //           break;
            //       }
            //     }
            //     return axios(originalReq);
            //   })
            //   .catch((error) => {
            //     window.location.href = "/#/login";
            //     return Promise.reject(error);
            //   });
            // resolve(res);
          });
        } else {
          const msg1 = "Internal server error";
          utils.showError(msg1);
        }
      } else {
        const msg1 = "Internal server error";
        utils.showError(msg1);
      }
    } else {
      // localStorage.removeItem('token');
      // localStorage.removeItem('user');
      // window.location.href = "/#/login";
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }
  }
);
