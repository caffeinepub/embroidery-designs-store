import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Order {
    customerName: string;
    status: string;
    total: string;
    whatsapp: string;
    items: string;
}
export interface Product {
    active: boolean;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    priceUsd: string;
    formats: string;
    isBestSeller: boolean;
}
export interface CustomRequest {
    name: string;
    whatsapp: string;
    description: string;
    budget: string;
}
export interface SiteSettings {
    whatsappNumber: string;
    storeName: string;
    heroText: string;
}
export interface backendInterface {
    _initializeAccessControlWithSecret(secret: string): Promise<void>;
    addProduct(id: string, product: Product): Promise<void>;
    deleteProduct(id: string): Promise<void>;
    getAllOrders(): Promise<Array<Order>>;
    getAllProducts(): Promise<Array<Product>>;
    getCustomRequests(): Promise<Array<CustomRequest>>;
    getOrdersByWhatsapp(whatsapp: string): Promise<Array<Order>>;
    getSiteSettings(): Promise<SiteSettings>;
    isAdminPrincipal(principal: Principal): Promise<boolean>;
    placeOrder(id: string, order: Order): Promise<void>;
    setAdmin(principal: Principal): Promise<void>;
    submitCustomRequest(id: string, request: CustomRequest): Promise<void>;
    updateOrderStatus(id: string, status: string): Promise<void>;
    updateProduct(id: string, product: Product): Promise<void>;
    updateSiteSettings(settings: SiteSettings): Promise<void>;
}
