import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { deleteByIdRequest, getAllTableDataListRequest, getDataByIdRequest, userRoleCreateRequest, userRoleUpdateRequest, updateRightsRequest } from '../modelController';

export default {

    /**
     * 
     * @param data : add user role
     */
    addUserRole: async function (data: userRoleCreateRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userRoleController.addRole, data,false);
    },

    /** Get user role */
    getUserRole: async function () {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userRoleController.getRole,false);
    },

    /**
     * 
     * @param data : Get roles
     */
    getRoles: async function (data: getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userRoleController.getRoles,data,false);
    },

    /**
     * 
     * @param data : delete role
     */
    deleteRole: async function (data: deleteByIdRequest) {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.userRoleController.deleteRole + data.id,false);
    },

    /**
     * 
     * @param data : get role by id data
     */
    getRoleById: async function (data: getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userRoleController.getRoleById + data.id,false );
    },

    /**
     * 
     * @param data : edit user role data
     */
    editUserRole: async function (data: userRoleUpdateRequest) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.userRoleController.editRole + data.roleId ,data,false);
    },

    /**
     * 
     * @param data : get role preveliges
     */
    getRolePreveliges: async function (data:getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userRoleController.rolepreveliges + data.id,false);
    },

    /**
     * 
     * @param data : update role previliges
     */
    updateRolePreveliges: async function (data:updateRightsRequest) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userRoleController.updateRolePreveliges,data,false);
    }
    
}