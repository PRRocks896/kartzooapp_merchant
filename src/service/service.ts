import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { da } from 'date-fns/locale';
import axios from 'axios';

export default {
    loginUser: async function (data: any) {
        return axios.post(Constant.apiUrl + apiUrl.userController.createData, data);
    },
    signupUser: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.createData, data,false);
    },
    forgotPassword: async function (data: any) {
        console.log("data",data);
        const params = data.email;
        return await axios.post(Constant.apiUrl + apiUrl.userController.forgotpassword + '?email=' +  params);
    },
    resetPassword: async function (data: any) {
        return await axios.post(Constant.apiUrl + apiUrl.userController.resetpassword, data);
    },
    updatePassword: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.updatepassword, data,false);
    },
    
    getProfile: async function (data: any) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userController.getDataById + data.id,false);
    },
    updateProfile: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.updateProfile, data,false);
    },
    getUserCount: async function () {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userController.getCount,false);
    },
    getUserDataPagination: async function (data:any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.getUserPaginationData,data,false);
    },
    deleteUser: async function (data:any) {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.userController.deleteUser + data);
    },
    addUser: async function (data: any) {
        const config = {     
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Access-Control-Allow-Origin': true,
                'content-type': 'multipart/form-data'
         }
        }
        return await axios.post(Constant.apiUrl + apiUrl.userController.createUser, data,config);
    },
    editUser: async function (data: any,id:any) {
        const config = {     
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Access-Control-Allow-Origin': true,
                'content-type': 'multipart/form-data'
         }
        }
        return await axios.put(Constant.apiUrl + apiUrl.userController.updateData + id, data,config);
    },
    getUserById: async function (data:any) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userController.getDataById + data.id,false);
    },
    getToken: async function () {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userController.gettoken,false);
    },
   
    
}