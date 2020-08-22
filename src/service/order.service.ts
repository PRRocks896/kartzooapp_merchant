import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {
    addOrder: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.orderController.addOrder, data);
    },
    editOrder: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.orderController.editOrder, data);
    },
    deleteOrder: async function () {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.orderController.deleteOrder);
    },
    addOrderCart: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.orderController.addOrderCart,data);
    }
}