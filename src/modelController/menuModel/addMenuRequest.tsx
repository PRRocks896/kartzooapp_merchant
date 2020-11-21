export interface addMenuRequest {
    menuItemId?: number,
    menuItemName: string,
    menuItemController: string,
    menuItemView: string,
    sortOrder: number,
    parentID: number,
    isActive: boolean
}