import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {
    addAddress: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.addressController.addAddress, data);
    },
    editAddress: async function (data: any) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.addressController.editAddress,data);
    },
    deleteAddress: async function () {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.addressController.deleteAddress);
    }
}