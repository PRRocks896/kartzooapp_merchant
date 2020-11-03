import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { da } from 'date-fns/locale';
import axios from 'axios';
import { resetPasswordRequest } from '../modelController';

export default {

    /**
     * 
     * @param data : Login User
     */
    loginUser: async function (data: any) {
        return axios.post(Constant.apiUrl + apiUrl.userController.createData, data);
    },

    /**
     * 
     * @param data : sign up user
     */
    signupUser: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.createData, data,false);
    },

    /**
     * 
     * @param data : forgot password
     */
    forgotPassword: async function (data: any) {
        // console.log("data",data);
        const params = data.email;
        return await axios.post(Constant.apiUrl + apiUrl.userController.forgotpassword + '?email=' +  params);
    },
    
    /**
     * 
     * @param data : reset password
     */
    resetPassword: async function (data: resetPasswordRequest) {
        return await axios.post(Constant.apiUrl + apiUrl.userController.resetpassword, data);
    },

    /**
     * 
     * @param data : update password
     */
    updatePassword: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.updatepassword, data,false);
    },
    
    /**
     * 
     * @param data : get Profile
     */
    getProfile: async function (data: any) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userController.getDataById + data.id,false);
    },
    
    /**
     * 
     * @param data : update profile
     */
    updateProfile: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.updateProfile, data,false);
    },

    /** Get User Count */
    getUserCount: async function () {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userController.getCount,false);
    },

    /**
     * 
     * @param data : Get user data
     */
    getUserDataPagination: async function (data:any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.getUserPaginationData,data,false);
    },

    /**
     * 
     * @param data : delete user
     */
    deleteUser: async function (data:any) {
        // return await WebReqUrl.delete(Constant.apiUrl + apiUrl.userController.deleteUser + data,false);
    },

    /**
     * 
     * @param data : add user
     */
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

    /**
     * 
     * @param data : edit user
     * @param id : user id
     */
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

    /**
     * 
     * @param data : get user by id
     */
    getUserById: async function (data:any) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userController.getDataById + data.id,false);
    },

    /** Get Token */
    getToken: async function () {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userController.gettoken,false);
    }
}