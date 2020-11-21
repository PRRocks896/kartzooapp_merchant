import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {

    /**
     * 
     * @param data : Add customer
     */
    addCustomer: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.customerController.createData, data,false);
    },

    /** Delete Customer */
    deleteCustomer: async function () {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.customerController.deleteCustomer,false);
    },

    /**
     * 
     * @param data : Edit Customer
     */
    editCustomer: async function (data: any) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.customerController.updateData,data,false);
    }
    
}