export interface addProductStateRequest {
    merchantid: string,
    maincategoryid: string,
    productname: string,
    productdescription: string,
    price: string,
    discountprice: string,
    isFeatured: boolean,
    metatitle: string,
    metadiscription: string,
    metakeyword: string,
    sortorder: string,
    images: any
}