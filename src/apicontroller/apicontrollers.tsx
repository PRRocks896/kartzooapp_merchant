const apiUrl = {
    userController: {
        createData:'merchant/login',
        getData:'merchant',
        getDataById:'merchant/',
        forgotpassword:'merchant/forgot-password',
        updateProfile:'merchant/update-profile',
        updateData:'users/',
        getCount:'User',
        getUserPaginationData:'merchant/get-merchant-list',
        createUser:'users',
        deleteUser:'users/',
        updatepassword:'merchant/change-password',
        resetpassword:'merchant/reset-password',
        statusChange:'status'

    },
    customerController: {
        createData:'user',
        getData:'user',
        getDataById:'user/',
        forgotpassword:'',
        updateData:'user',
        getCount:'user',
        getUserPaginationData:'user',
        deleteCustomer:'user'

    },
    userRoleController: {
        addRole:'roles',
        getRole:'roles/get-role-list-dropdown',
        editRole:'roles/',
        deleteRole:'roles/',
        rolepreveliges:'roleprivileges/',
        updateRolePreveliges:'roleprivileges',
        getRoles:'roles/get-role-list',
        getRoleById:'roles/'
    },
    locationController: {
        addCountry:'country',
        getCountry:'country/get-country-list',
        getCountryList:'country/get-country-list-dropdown',
        editCountry:'country/',
        deleteCountry:'country/',
        getStateById:'state/',
        getCountryById:'country/',
        getStateList:'state/get-state-list-dropdown',
        addState:'state',
        getState:'state/get-state-list',
        editState:'state/',
        deleteState:'state/',
        addCity:'city',
        getCityData:'city/get-city-list',
        gedCity:'city',
        edidCity:'city/',
        deletdCity:'city/',
        getCityById:'city/',
        getcitylist:'city/get-city-list-dropdown'
    },
    categoryController: {
        addCatergory:'category',
        getCategory:'category/get-category-list',
        editCategory:'category/',
        deleteCategory:'category/',
        addsubCategory:'subcategory',
        getCategoryById:'category/',
        getAllCategory:'category/get-category-list-dropdown'
    },
    couponController: {
        addCoupon:'coupon',
        getCoupon:'coupon/get-coupon-list',
        editCoupon:'coupon/',
        getCouponById:'coupon/',
        deleteCoupon:'coupon',
        getList:'coupon/get-coupon-list-dropdown',
        getCouponMapping:'couponmapping/get-couponmapping-list',
        getCouponMappingById:'',
        addCouponMapping:'',
        editCouponMapping:''
    },
    merchantController: {
        addMerchant:'merchant',
        getMerchant:'merchant/get-merchant-list',
        editMerchant:'merchant',
        deleteMerchant:'merchant',
        getMerchantById:'merchant/',
        merchantProfile:'merchant/update-profile',
        getMerchantList:'merchant/get-merchant-list-dropdown'
    },
    merchantBusinessController: {
        addMerchantBusiness:'merchantbusinesshour',
        getMerchantBusiness:'merchant',
        editMerchantBusiness:'merchantbusinesshour/',
        deleteMerchantBusiness:'merchant',
        getBusinessHoursData:'merchantbusinesshour/get-merchantbusinesshour-list',
        getBusinessHoursById:'merchantbusinesshour/'
    },
    merchantReviewController: {
        addMerchantReview:'merchant',
        getMerchantReview:'merchant',
        editMerchantReview:'merchant',
        deleteMerchantReview:'merchant',
    },
    productController: {
        addproduct:'product',
        getproduct:'products/get-product-list',
        editproduct:'product',
        deleteproduct:'product',
        addImage:'product',
        addInventory:'productinventory',
        addReview:'product',
        addOnProduct:'product',
        deleteproductImage:'product',
        editproductImage:'product',
        getProductById:'products/',
        getproductlist:'products/get-product-list-dropdown',
        getproductinventory:'productinventory/get-productinventory-list',
        getInventoryById:'productinventory/',
        editinventory:'productinventory/'
    },
    deliveryController: {
        addDelivery:'delivery',
        getDelivery:'delivery',
        editDelivery:'delivery',
        deleteDelivery:'delivery'
    },
    orderController: {
        addOrder:'order',
        getOrder:'order',
        editOrder:'order',
        deleteOrder:'order',
        addOrderCart:'order'
    },
    addressController: {
        addAddress:'address',
        getAddress:'address',
        editAddress:'address',
        deleteAddress:'address'
    },
}

export default apiUrl;