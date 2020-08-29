import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {
    addMerchant: async function (data: any) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.merchantController.addMerchant, data);
    },
    addMerchantBusiness: async function (data: any) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.merchantBusinessController.addMerchantBusiness, data);
    },
    addMerchantReview: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.merchantReviewController.addMerchantReview, data);
    },
    getBusinessHoursData: async function (data: any) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.merchantBusinessController.getBusinessHoursData, data);
    },
    getBusinessById: async function (data: any) {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.merchantBusinessController.getBusinessHoursById + data);
    },
    getMerchantData: async function (data: any) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.merchantController.getMerchant, data);
    },
    getMerchantById: async function (data: any) {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.merchantController.getMerchantById + data.id);
    },
    updateMerchant: async function (data: any) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.merchantController.merchantProfile, data);
    },
    getMerchantList: async function () {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.merchantController.getMerchantList);
    },
    getHoursById: async function (data:any) {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.merchantBusinessController.getBusinessHoursById + data.id );
    },
    updateMerchantBusiness: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.apiMerchantUrl + apiUrl.merchantBusinessController.editMerchantBusiness + id, data);
    },
    
    
    
}