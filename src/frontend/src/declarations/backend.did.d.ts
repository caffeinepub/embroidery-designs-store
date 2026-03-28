import type { Principal } from '@icp-sdk/core/principal';
import type { IDL } from '@icp-sdk/core/candid';

export interface Product {
  'active' : boolean,
  'name' : string,
  'description' : string,
  'imageUrl' : string,
  'category' : string,
  'priceUsd' : string,
  'formats' : string,
  'isBestSeller' : boolean,
}
export interface Order {
  'customerName' : string,
  'status' : string,
  'total' : string,
  'whatsapp' : string,
  'items' : string,
}
export interface CustomRequest {
  'name' : string,
  'whatsapp' : string,
  'description' : string,
  'budget' : string,
}
export interface SiteSettings {
  'whatsappNumber' : string,
  'storeName' : string,
  'heroText' : string,
}
export interface _SERVICE {
  'addProduct' : (id: string, product: Product) => Promise<undefined>,
  'deleteProduct' : (id: string) => Promise<undefined>,
  'getAllOrders' : () => Promise<Array<Order>>,
  'getAllProducts' : () => Promise<Array<Product>>,
  'getCustomRequests' : () => Promise<Array<CustomRequest>>,
  'getOrdersByWhatsapp' : (whatsapp: string) => Promise<Array<Order>>,
  'getSiteSettings' : () => Promise<SiteSettings>,
  'isAdminPrincipal' : (principal: Principal) => Promise<boolean>,
  'placeOrder' : (id: string, order: Order) => Promise<undefined>,
  'setAdmin' : (principal: Principal) => Promise<undefined>,
  'submitCustomRequest' : (id: string, request: CustomRequest) => Promise<undefined>,
  'updateOrderStatus' : (id: string, status: string) => Promise<undefined>,
  'updateProduct' : (id: string, product: Product) => Promise<undefined>,
  'updateSiteSettings' : (settings: SiteSettings) => Promise<undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
