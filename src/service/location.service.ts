import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { getDataByIdRequest } from '../modelController';

export default {

    /**
     * 
     * @param data : Add Country
     */
    addCountry: async function (data: any) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.addCountry,data,false);
    },

    /**
     * 
     * @param data : Get Country Data
     */
    getCountryData: async function (data:any) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.getCountry,data,false);
    },

    /**
     * 
     * @param data : Get Country by id data
     */
    getCountryById: async function (data:any) {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getCountryById + data.id,false);
    },

    /**
     * 
     * @param data : delete country
     */
    deleteCountry: async function (data: any) {
        return await WebReqUrl.delete(Constant.mainUrl + apiUrl.locationController.deleteCountry + data,true);
    },

    /**
     * 
     * @param data : edit country data
     * @param id : country id
     */
    editCountry: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.mainUrl + apiUrl.locationController.editCountry + id ,data,false);
    },

    /** Get Country */
    getCountry: async function () {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getCountryList,false);
    },

    /**
     * 
     * @param data : Add State
     */
    addState: async function (data: any) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.addState,data,false);
    },

    /**
     * 
     * @param data : Delete State
     */
    deleteState: async function (data:any) {
        return await WebReqUrl.delete(Constant.mainUrl + apiUrl.locationController.deleteState + data,true);
    },

    /**
     * 
     * @param data : Edit State
     * @param id : state id
     */
    editState: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.mainUrl + apiUrl.locationController.editState + id ,data,false);
    },

    /**
     * 
     * @param data : get state data
     */
    getStateData: async function (data:any) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.getState,data,false);
    },

    /** Get State Data */
    getState: async function () {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getStateList,false);
    },

    /**
     * 
     * @param data : Get state by id
     */
    getStateById: async function (data:any) {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getStateById + data.id,false);
    },

    /**
     * 
     * @param data : Add city 
     */
    addCity: async function (data: any) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.addCity,data,false);
    },

    /**
     * 
     * @param data : delete city
     */
    deleteCity: async function (data:any) {
        return await WebReqUrl.delete(Constant.mainUrl + apiUrl.locationController.deletdCity + data,true);
    },

    /**
     * 
     * @param data : get city data
     */
    getCityData: async function (data: any) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.locationController.getCityData,data,false);
    },

    /**
     * 
     * @param data : edit city data
     * @param id : city id
     */
    editCity: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.mainUrl + apiUrl.locationController.edidCity + id,data,false);
    },

    /**
     * 
     * @param data : get city data with id
     */
    getCityById: async function (data: getDataByIdRequest) {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getCityById + data.id,true);
    },

    /** Get City */
    getCity: async function () {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.locationController.getcitylist,true);
    }
}