import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { getAllTableDataListRequest, getDataByIdRequest } from '../modelController';

export default {

    /**
     * 
     * @param data : Get Menu Item Data
     */
    getMenuItemData: async function (data:getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.menuController.getMenu, data,false);
    },

    /**
     * 
     * @param data : Add Menu Item Data
     */
    addMenu: async function (data:any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.menuController.addMenu, data,false);
    },

    /**
     * 
     * @param data : Edit menu item data
     */
    editMenu: async function (data:any) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.menuController.editMenu + data.menuItemId, data,false);
    },

    /** Get All menu */
    getAllMenu: async function () {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.menuController.getallmenu,false);
    },

    /**
     * 
     * @param data : Get menu item by id
     */
    getMenuItemById: async function (data:getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.menuController.getdatabyid + data.id,false);
    }
}