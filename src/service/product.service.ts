import Constant from '../constant/constant';
import WebReqUrl from '../web-req/web-req';
import apiUrl from '../apicontroller/apicontrollers';
import { deleteByIdRequest, getAllTableDataListRequest, getDataByIdRequest, inventoryCreateRequest, inventoryUpdateRequest } from '../modelController';

export default {
    addProduct: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.productController.addproduct, data,false);
    },
    deleteProduct: async function () {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.productController.deleteproduct,false);
    },
    deleteProductInventory: async function (data:deleteByIdRequest) {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.productController.deleteproductInventory + data.id,false);
    },
    
    editProduct: async function (data: any) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.productController.editproduct,data,false);
    },
    getProduct: async function () {
        return await WebReqUrl.get(Constant.apiUrl + apiUrl.productController.getproduct,false);
    },
    addProductImage: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.productController.addImage,data,false);
    },
    addProductInventory: async function (data: inventoryCreateRequest) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.productController.addInventory,data,false);
    },
    addProductReview: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.productController.addReview,data,false);
    },
    addOnProduct: async function (data: any) {
        return await WebReqUrl.post(Constant.apiUrl + apiUrl.productController.addOnProduct,data,false);
    },
    deleteImageProduct: async function () {
        return await WebReqUrl.delete(Constant.apiUrl + apiUrl.productController.deleteproductImage,false);
    },
    editProductImage: async function (data: any) {
        return await WebReqUrl.put(Constant.apiUrl + apiUrl.productController.editproductImage,data,false);
    },
    getProductData: async function (data:getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.productController.getproduct,data,false);
    },
    getProductById: async function (data:getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.productController.getProductById + data,false);
    },
    getAllProduct: async function () {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.productController.getproductlist,false);
    },
    getProductInventoryData: async function (data:getAllTableDataListRequest) {
        return await WebReqUrl.post(Constant.apiMerchantUrl + apiUrl.productController.getproductinventory,data,false);
    },
    getInventoryData: async function (data:getDataByIdRequest) {
        return await WebReqUrl.get(Constant.apiMerchantUrl + apiUrl.productController.getInventoryById + data.id,false);
    },
    editProductInventory: async function (data: inventoryUpdateRequest) {
        return await WebReqUrl.put(Constant.apiMerchantUrl + apiUrl.productController.editinventory + data.productInventoryId,data,false);
    },
    
    
    
}