import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { getAllTableDataListRequest, getDataByIdRequest } from '../modelController';

export default {
    getMenuItemData: async function (data:getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.menuController.getMenu, data,false);
    },
    addMenu: async function (data:any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.menuController.addMenu, data,false);
    },
    editMenu: async function (data:any) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.menuController.editMenu + data.menuItemId, data,false);
    },
    getAllMenu: async function () {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.menuController.getallmenu,false);
    },
    getMenuItemById: async function (data:getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.menuController.getdatabyid + data.id,false);
    },
    
}