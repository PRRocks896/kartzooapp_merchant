import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {
    addCountry: async function (data: any) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.addCountry,data);
    },
    getCountryData: async function (data:any) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.getCountry,data);
    },
    getCountryById: async function (data:any) {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getCountryById + data.id);
    },
    deleteCountry: async function (data: any) {
        return await WebReqUrl.delete(Constant.mainUrl + apiUrl.locationController.deleteCountry + data);
    },
    editCountry: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.mainUrl + apiUrl.locationController.editCountry + id ,data);
    },
    getCountry: async function () {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getCountryList);
    },
    addState: async function (data: any) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.addState,data);
    },
    deleteState: async function (data:any) {
        return await WebReqUrl.delete(Constant.mainUrl + apiUrl.locationController.deleteState + data);
    },
    editState: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.mainUrl + apiUrl.locationController.editState + id ,data);
    },
    getStateData: async function (data:any) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.getState,data);
    },
    getState: async function () {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getStateList);
    },
    getStateById: async function (data:any) {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getStateById + data.id);
    },
    addCity: async function (data: any) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.addCity,data);
    },
    deleteCity: async function (data:any) {
        return await WebReqUrl.delete(Constant.mainUrl + apiUrl.locationController.deletdCity + data);
    },
    getCityData: async function (data: any) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.getCityData,data);
    },
    editCity: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.mainUrl + apiUrl.locationController.edidCity + id,data);
    },
    getCityById: async function (data: any) {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getCityById + data.id);
    },
    getCity: async function () {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getcitylist);
    },
       
}