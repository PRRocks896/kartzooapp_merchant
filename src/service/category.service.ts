import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';

export default {
    addCategory: async function (data: any) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.categoryController.addCatergory,data);
    },
    editCategory: async function (data: any,id:any) {
        return await WebReqUrl.put(Constant.mainUrl + apiUrl.categoryController.editCategory + id,data);
    },
    deleteCategory: async function (data: any) {
        return await WebReqUrl.delete(Constant.mainUrl + apiUrl.categoryController.deleteCategory + data);
    },
    getCategory: async function (data:any) {
        return await WebReqUrl.post(Constant.mainUrl + apiUrl.categoryController.getCategory,data);
    },
    getCategoryById: async function (data:any) {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.categoryController.getCategoryById + data.id);
    },
    getAllCategory: async function () {
        return await WebReqUrl.get(Constant.mainUrl + apiUrl.categoryController.getAllCategory);
    },
    addSubCategory: async function (data:any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.categoryController.addsubCategory,data);
    }
    
}