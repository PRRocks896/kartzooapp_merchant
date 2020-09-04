import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {
    addCountry: async function (data: any) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.addCountry,data,false);
    },
    getCountryData: async function (data:any) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.getCountry,data,false);
    },
    getCountryById: async function (data:any) {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getCountryById + data.id,false);
    },
    deleteCountry: async function (data: any) {
        return await WebReqUrl.delete(Constant.mainUrl + apiUrl.locationController.deleteCountry + data,true);
    },
    editCountry: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.mainUrl + apiUrl.locationController.editCountry + id ,data,false);
    },
    getCountry: async function () {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getCountryList,false);
    },
    addState: async function (data: any) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.addState,data,false);
    },
    deleteState: async function (data:any) {
        return await WebReqUrl.delete(Constant.mainUrl + apiUrl.locationController.deleteState + data,true);
    },
    editState: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.mainUrl + apiUrl.locationController.editState + id ,data,false);
    },
    getStateData: async function (data:any) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.getState,data,false);
    },
    getState: async function () {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getStateList,false);
    },
    getStateById: async function (data:any) {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getStateById + data.id,false);
    },
    addCity: async function (data: any) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.addCity,data,false);
    },
    deleteCity: async function (data:any) {
        return await WebReqUrl.delete(Constant.mainUrl + apiUrl.locationController.deletdCity + data,true);
    },
    getCityData: async function (data: any) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.getCityData,data,false);
    },
    editCity: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.mainUrl + apiUrl.locationController.edidCity + id,data,false);
    },
    getCityById: async function (data: any) {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getCityById + data.id,true);
    },
    getCity: async function () {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getcitylist,true);
    },
       
}