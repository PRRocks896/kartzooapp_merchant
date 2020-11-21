import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { deleteByIdRequest, getAllTableDataListRequest, bussinessCreateRequest, bussinessUpdateRequest, getDataByIdRequest, profileGetRequest } from '../modelController';

export default {
    addMerchant: async function (data: any) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.merchantController.addMerchant, data,false);
    },

    /**
     * 
     * @param data : Add Merchant Business Hours
     */
    addMerchantBusiness: async function (data: bussinessCreateRequest) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.merchantBusinessController.addMerchantBusiness, data,false);
    },
    addMerchantReview: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.merchantReviewController.addMerchantReview, data,false);
    },

    /**
     * 
     * @param data : Get merchant business hours data
     */
    getBusinessHoursData: async function (data: getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.merchantBusinessController.getBusinessHoursData, data,false);
    },

    /**
     * 
     * @param data : get business data by id
     */
    getBusinessById: async function (data: getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.merchantBusinessController.getBusinessHoursById + data,false);
    },


    getMerchantData: async function (data: any) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.merchantController.getMerchant, data,false);
    },
    getMerchantById: async function (data: profileGetRequest) {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.merchantController.getMerchantById + data.id,false);
    },
    updateMerchant: async function (data: any) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.merchantController.merchantProfile, data,false);
    },
    getMerchantList: async function () {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.merchantController.getMerchantList,false);
    },

    /**
     * 
     * @param data : Get Hours By Id
     */
    getHoursById: async function (data:any) {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.merchantBusinessController.getBusinessHoursById + data.id,false);
    },

    /** Update merchant business hours */
    updateMerchantBusiness: async function (data: bussinessUpdateRequest) {
        return await WebReqUrl.put(Constant.apiMerchantUrl + apiUrl.merchantBusinessController.editMerchantBusiness + data.merchantBusinessHoursId, data,false);
    },

    /** delete business hours */
    deleteBusinessHours: async function (data:deleteByIdRequest) {
        return await WebReqUrl.delete(Constant.apiMerchantUrl + apiUrl.merchantBusinessController.deleteMerchantBusiness + data.id,false);
    }
}