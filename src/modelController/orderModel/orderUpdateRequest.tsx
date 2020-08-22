export interface orderUpdateRequest {
    id?:string,
    orderdate?:string,
    userid?: string,
    orderno?: string,
    paymentmethod?:string,
    paymentstatus?: string,
    orderstatus?:string,
    totalqty?: string,
    totalamount?: string,
    discountamount?: string,
    taxamount?: string,
    deliveryamount?: string,
    couponid?: string,
    couponamount?: string
}
