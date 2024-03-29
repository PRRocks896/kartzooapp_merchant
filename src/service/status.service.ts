import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {

    /**
     * 
     * @param data : Status Change API
     */
    getStatusChange: async function (data:any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.userController.statusChange, data,false);
    }
}