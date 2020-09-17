export interface menuStateRequest {
    count: string,
    currentPage: string,
    items_per_page: string,
    upperPageBound: number,
    lowerPageBound: number,
    pageBound: number,
    onItemSelect: string,
    menudata: any,
    switchSort: boolean,
    isStatus: boolean
}