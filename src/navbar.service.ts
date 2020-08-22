export default {
    items: [
      {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'fa fa-desktop fs-16',
        type: 'link',
      },
      {
        name: 'User',
        id: 'usermanagement',
        icon: 'fa fa-user fs-16',
        type: 'dropdown',
        children: [
          {
            name: 'User',
            url: '/users'
          },
          {
            name: 'Role',
            url: '/userrole'
          },
          {
            name: 'Role Privileges',
            url: '/userroletorights'
          },
        ]
      },
      // {
      //   name: 'Category',
      //   id: 'categorymanagement',
      //   icon: 'fa fa-list fs-16',
      //   type: 'dropdown',
      //   children: [
      //     {
      //       name: 'Category',
      //       url: '/category'
      //     }
      //     // {
      //     //   name: 'Sub Category',
      //     //   url: '/subcategory'
      //     // }
      //   ]
      // },
      // {
      //   name: 'Location',
      //   id: 'locationmanagement',
      //   icon: 'fa fa-location-arrow fs-16',
      //   type: 'dropdown',
      //   children: [
      //     {
      //       name: 'Country',
      //       url: '/country'
      //     },
      //     {
      //       name: 'State',
      //       url: '/state'
      //     },
      //     {
      //       name: 'City',
      //       url: '/city'
      //     }
      //   ]
      // },
      // {
      //   name: 'Coupon',
      //   id: 'couponmanagement',
      //   icon: 'fa fa-gift fs-16',
      //   type: 'dropdown',
      //   children: [
      //     {
      //       name: 'Coupon',
      //       url: '/listcoupon'
      //     },
      //     {
      //       name: 'Coupon Mapping',
      //       url: '/list-coupon-map'
      //     }
      //   ]
      // },
      {
        name: 'Merchant',
        id: 'merchantmanagement',
        icon: 'fa fa-location-arrow fs-16',
        type: 'dropdown',
        children: [
          {
            name: 'Merchant',
            url: '/list-merchant'
          },
          {
            name: 'Business',
            url: '/list-business-hours'
          },
          {
            name: 'Review',
            url: '/list-merchant-review'
          }
        ]
      },
      {
        name: 'Product',
        id: 'productmanagement',
        icon: 'fa fa-shopping-cart fs-16',
        type: 'dropdown',
        children: [
          {
            name: 'Product',
            url: '/list-product'
          },
          {
            name: 'Image',
            url: '/list-product-image'
          },
          {
            name: 'Inventory',
            url: '/list-product-inventory'
          },
          {
            name: 'Review',
            url: '/list-product-review'
          },
          {
            name: 'AddOn',
            url: '/product-addondetail'
          }
        ]
      },
      // {
      //   name: 'Delivery',
      //   url: '/delivery',
      //   icon: 'fa fa-truck fs-16',
      //   type: 'link'
      // },
      // {
      //   name: 'Order',
      //   id: 'ordermanagement',
      //   icon: 'fa fa-list-alt fs-16',
      //   type: 'dropdown',
      //   children: [
      //     {
      //       name: 'Order',
      //       url: '/list-order'
      //     },
      //     {
      //       name: 'Cart',
      //       url: '/list-cart'
      //     }
      //   ]
      // },
      // {
      //   name: 'Customer',
      //   id: 'customermanagement',
      //   icon: 'fa fa-users fs-16',
      //   type: 'dropdown',
      //   children: [
      //     {
      //       name: 'User',
      //       url: '/list-user'
      //     },
      //     {
      //       name: 'Address',
      //       url: '/list-address'
      //     },
      //     {
      //       name: 'Card',
      //       url: '/list-card'
      //     }
      //   ]
      // }
    ],
  };