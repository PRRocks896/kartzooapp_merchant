import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {
    addUserRole: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userRoleController.addRole, data,false);
    },
    getUserRole: async function () {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userRoleController.getRole,false);
    },
    getRoles: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userRoleController.getRoles,data,false);
    },
    deleteRole: async function (data: any) {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.userRoleController.deleteRole + data);
    },
    getRoleById: async function (data: any) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userRoleController.getRoleById + data.id,false );
    },
    editUserRole: async function (data: any) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.userRoleController.editRole + data.roleId ,data,false);
    },
    getRolePreveliges: async function (data:any) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userRoleController.rolepreveliges + data.id,false);
    },
    updateRolePreveliges: async function (data:any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userRoleController.updateRolePreveliges,data,false);
    }
    
}