import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {
    addUserRole: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userRoleController.addRole, data);
    },
    getUserRole: async function () {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userRoleController.getRole);
    },
    getRoles: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userRoleController.getRoles,data);
    },
    deleteRole: async function (data: any) {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.userRoleController.deleteRole + data);
    },
    getRoleById: async function (data: any) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userRoleController.getRoleById + data.id );
    },
    editUserRole: async function (data: any) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.userRoleController.editRole + data.roleId ,data);
    },
    getRolePreveliges: async function (data:any) {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.userRoleController.rolepreveliges + data.id);
    },
    updateRolePreveliges: async function (data:any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userRoleController.updateRolePreveliges,data);
    }
    
}