import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";

actor {
  public type Order = {
    customerName : Text;
    whatsapp : Text;
    items : Text;
    total : Text;
    status : Text;
  };

  // Legacy product type (no isBestSeller) — kept for stable variable migration
  type ProductV1 = {
    name : Text;
    description : Text;
    category : Text;
    priceUsd : Text;
    formats : Text;
    imageUrl : Text;
    active : Bool;
  };

  public type Product = {
    name : Text;
    description : Text;
    category : Text;
    priceUsd : Text;
    formats : Text;
    imageUrl : Text;
    active : Bool;
    isBestSeller : Bool;
  };

  public type CustomRequest = {
    name : Text;
    whatsapp : Text;
    description : Text;
    budget : Text;
  };

  public type SiteSettings = {
    whatsappNumber : Text;
    storeName : Text;
    heroText : Text;
  };

  let adminPrincipalMap = Map.empty<Principal, ()>();

  // Old stable map — holds legacy records, used only for one-time migration
  let products : Map.Map<Text, ProductV1> = Map.empty<Text, ProductV1>();
  // New stable map with isBestSeller field
  let productsV2 = Map.empty<Text, Product>();

  let orders = Map.empty<Text, Order>();
  let customRequests = Map.empty<Text, CustomRequest>();
  var siteSettings : SiteSettings = {
    whatsappNumber = "+91 9914902647";
    storeName = "Embroidery Designs";
    heroText = "Premium Embroidery Designs for Professionals";
  };

  // Migrate old products to new map on upgrade
  system func postupgrade() {
    for ((id, p) in products.entries()) {
      if (productsV2.get(id) == null) {
        productsV2.add(id, {
          name = p.name;
          description = p.description;
          category = p.category;
          priceUsd = p.priceUsd;
          formats = p.formats;
          imageUrl = p.imageUrl;
          active = p.active;
          isBestSeller = true;
        });
      };
    };
  };

  public shared func addProduct(id : Text, product : Product) : async () {
    productsV2.add(id, product);
  };

  public shared func updateProduct(id : Text, product : Product) : async () {
    productsV2.add(id, product);
  };

  public shared func deleteProduct(id : Text) : async () {
    productsV2.remove(id);
  };

  public query func getAllProducts() : async [Product] {
    productsV2.values().toArray();
  };

  public shared func placeOrder(id : Text, order : Order) : async () {
    orders.add(id, order);
  };

  public shared func updateOrderStatus(id : Text, status : Text) : async () {
    switch (orders.get(id)) {
      case (?order) {
        let updatedOrder : Order = { order with status };
        orders.add(id, updatedOrder);
      };
      case (null) {};
    };
  };

  public query func getAllOrders() : async [Order] {
    orders.values().toArray();
  };

  public query func getOrdersByWhatsapp(whatsapp : Text) : async [Order] {
    orders.values().filter(func(o) { Text.equal(o.whatsapp, whatsapp) }).toArray();
  };

  public shared func submitCustomRequest(id : Text, request : CustomRequest) : async () {
    customRequests.add(id, request);
  };

  public query func getCustomRequests() : async [CustomRequest] {
    customRequests.values().toArray();
  };

  public query func getSiteSettings() : async SiteSettings {
    siteSettings;
  };

  public shared func updateSiteSettings(settings : SiteSettings) : async () {
    siteSettings := settings;
  };

  // Legacy stubs
  public shared func setAdmin(_p : Principal) : async () {};
  public query func isAdminPrincipal(_p : Principal) : async Bool { true };
  public shared func _initializeAccessControlWithSecret(_s : Text) : async () {};
};
