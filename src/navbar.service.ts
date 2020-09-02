export default {
    items: [
      {
        name:'General',
        type:'header'
      },
      {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'fa fa-desktop fs-16',
        type: 'link',
      },
      {
        name:'User Management',
        type:'header'
      },
      {
        name: 'Role',
         icon: 'fa fa-user fs-16',
        url: '/userrole'
      },
      {
        name: 'Role Privileges',
         icon: 'fa fa-user fs-16',
        url: '/userroletorights'
      },
      {
        name:'Merchant Management',
        type:'header'
      },
      {
        name: 'Business',
           icon: 'fa fa-location-arrow fs-16',
        url: '/list-business-hours'
      },
      // {
      //   name: 'Review',
      //      icon: 'fa fa-location-arrow fs-16',
      //   url: '/list-merchant-review'
      // },
      {
        name:'Product Management',
        type:'header'
      },
      {
        name: 'Product',
         icon: 'fa fa-shopping-cart fs-16',
        url: '/list-product'
      },
      // {
      //   name: 'Image',
      //    icon: 'fa fa-shopping-cart fs-16',
      //   url: '/list-product-image'
      // },
      {
        name: 'Inventory',
         icon: 'fa fa-shopping-cart fs-16',
        url: '/list-product-inventory'
      },
      // {
      //   name: 'Review',
      //    icon: 'fa fa-shopping-cart fs-16',
      //   url: '/list-product-review'
      // },
      // {
      //   name: 'AddOn',
      //    icon: 'fa fa-shopping-cart fs-16',
      //   url: '/product-addondetail'
      // },
    
    ],
  };