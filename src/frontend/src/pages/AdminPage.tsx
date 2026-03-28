import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ImageIcon,
  Loader2,
  Lock,
  LogOut,
  MessageCircle,
  Pencil,
  Plus,
  Save,
  Settings,
  Star,
  Trash2,
  Upload,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend";
import { useActor } from "../hooks/useActor";

const ADMIN_USERNAME = "harpal";
const ADMIN_PASSWORD = "harpal";

const EMPTY_PRODUCT: Product = {
  name: "",
  description: "",
  category: "Floral",
  priceUsd: "",
  formats: "DST, PES, JEF, EXP",
  imageUrl: "",
  active: true,
  isBestSeller: true,
};

const CATEGORIES = ["Floral", "Logo", "Traditional", "Kids", "Custom"];

export default function AdminPage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("admin_logged_in") === "1",
  );
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [productDialog, setProductDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<Product>(EMPTY_PRODUCT);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [settingsForm, setSettingsForm] = useState({
    whatsappNumber: "+91 9914902647",
    storeName: "Embroidery Designs",
    heroText: "Premium Embroidery Designs for Professionals",
  });

  const ordersQuery = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => actor!.getAllOrders(),
    enabled: !!actor && isLoggedIn,
    retry: false,
  });

  const productsQuery = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => actor!.getAllProducts(),
    enabled: !!actor,
  });

  const customRequestsQuery = useQuery({
    queryKey: ["admin-custom"],
    queryFn: () => actor!.getCustomRequests(),
    enabled: !!actor && isLoggedIn,
    retry: false,
  });

  const settingsQuery = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const s = await actor!.getSiteSettings();
      setSettingsForm(s);
      return s;
    },
    enabled: !!actor && isLoggedIn,
    retry: false,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      actor!.updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast.success("Status updated");
    },
    onError: () => toast.error("Failed to update status"),
  });

  const saveProductMutation = useMutation({
    mutationFn: async () => {
      if (!actor)
        throw new Error("Backend not connected. Please refresh and try again.");
      const id = editingId || `product-${Date.now()}`;
      if (editingId) {
        await actor.updateProduct(id, productForm);
      } else {
        await actor.addProduct(id, productForm);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      setProductDialog(false);
      setEditingId(null);
      setProductForm(EMPTY_PRODUCT);
      setImagePreview(null);
      toast.success(editingId ? "Product updated" : "Product added");
    },
    onError: (err) => {
      console.error("Save product error:", err);
      toast.error(
        `Failed to save product: ${err instanceof Error ? err.message : String(err)}`,
      );
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => actor!.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Product deleted");
    },
    onError: () => toast.error("Failed to delete product"),
  });

  const saveSettingsMutation = useMutation({
    mutationFn: () => actor!.updateSiteSettings(settingsForm),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
      toast.success("Settings saved successfully");
    },
    onError: () => toast.error("Failed to save settings"),
  });

  const handleLogin = () => {
    if (loginUsername === ADMIN_USERNAME && loginPassword === ADMIN_PASSWORD) {
      localStorage.setItem("admin_logged_in", "1");
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid username or password.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    setIsLoggedIn(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      const MAX = 200;
      let { width, height } = img;
      if (width > MAX || height > MAX) {
        const ratio = Math.min(MAX / width, MAX / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.5);
      URL.revokeObjectURL(objectUrl);
      setImagePreview(dataUrl);
      setProductForm((prev) => ({ ...prev, imageUrl: dataUrl }));
    };
    img.src = objectUrl;
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      deleteProductMutation.mutate(id);
    }
  };

  const orders = ordersQuery.data ?? [];
  const products = productsQuery.data ?? [];
  const customRequests = customRequestsQuery.data ?? [];

  // ── Login Screen ──
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[oklch(0.08_0_0)] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="border border-[oklch(0.19_0_0)] bg-[oklch(0.11_0_0)] rounded-sm p-8 space-y-6">
            {/* Icon */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full border border-[oklch(var(--gold-border))] flex items-center justify-center">
                <Lock className="w-6 h-6 text-gold" />
              </div>
              <h1 className="font-cinzel text-xl font-bold tracking-wider text-foreground uppercase">
                Admin Panel
              </h1>
              <p className="text-[oklch(var(--text-muted))] text-xs text-center">
                Enter your credentials to continue
              </p>
            </div>

            {/* Fields */}
            <div className="space-y-4">
              <div>
                <Label className="font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(var(--text-muted))]" />
                  <Input
                    data-ocid="admin.login.input"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    placeholder="Username"
                    className="pl-9 bg-[oklch(0.08_0_0)] border-[oklch(0.19_0_0)] text-foreground focus:border-gold rounded-sm"
                  />
                </div>
              </div>

              <div>
                <Label className="font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(var(--text-muted))]" />
                  <Input
                    data-ocid="admin.login.input"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    placeholder="Password"
                    className="pl-9 bg-[oklch(0.08_0_0)] border-[oklch(0.19_0_0)] text-foreground focus:border-gold rounded-sm"
                  />
                </div>
              </div>

              {loginError && (
                <p
                  data-ocid="admin.login.error_state"
                  className="text-red-400 text-xs font-cinzel"
                >
                  {loginError}
                </p>
              )}

              <button
                type="button"
                data-ocid="admin.login.submit_button"
                onClick={handleLogin}
                className="w-full font-cinzel text-xs tracking-widest uppercase px-6 py-3 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-all font-bold rounded-sm"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Dashboard ──
  return (
    <div className="min-h-screen bg-[oklch(0.08_0_0)] pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-cinzel text-2xl font-bold tracking-wider text-foreground uppercase">
              Admin Panel
            </h1>
            <p className="text-[oklch(var(--text-muted))] text-xs mt-1">
              Logged in as{" "}
              <span className="text-gold font-cinzel font-bold">
                {ADMIN_USERNAME}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              data-ocid="admin.logout.button"
              onClick={handleLogout}
              className="flex items-center gap-2 font-cinzel text-xs tracking-widest uppercase px-4 py-2.5 border border-[oklch(0.19_0_0)] text-[oklch(var(--text-secondary))] hover:border-gold/50 hover:text-gold transition-all rounded-sm"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders">
          <TabsList className="bg-[oklch(0.11_0_0)] border border-[oklch(0.19_0_0)] rounded-sm mb-6 h-auto p-1 gap-1 flex flex-wrap">
            {[
              { value: "orders", label: `Orders (${orders.length})` },
              { value: "products", label: `Products (${products.length})` },
              { value: "custom", label: `Custom (${customRequests.length})` },
              { value: "settings", label: "Settings" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                data-ocid={`admin.${tab.value}.tab`}
                className="font-cinzel text-xs tracking-widest uppercase data-[state=active]:bg-gold data-[state=active]:text-[oklch(0.08_0_0)]"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ── Orders Tab ── */}
          <TabsContent value="orders" data-ocid="admin.orders.panel">
            {ordersQuery.isError ? (
              <div
                className="text-center py-12 text-[oklch(var(--text-muted))]"
                data-ocid="admin.orders.error_state"
              >
                <p className="font-cinzel">
                  Admin access required to view orders.
                </p>
              </div>
            ) : ordersQuery.isLoading ? (
              <div
                className="text-center py-12"
                data-ocid="admin.orders.loading_state"
              >
                <Loader2 className="w-6 h-6 animate-spin text-gold mx-auto" />
              </div>
            ) : orders.length === 0 ? (
              <div
                className="text-center py-12 text-[oklch(var(--text-muted))]"
                data-ocid="admin.orders.empty_state"
              >
                <p className="font-cinzel text-sm">No orders yet</p>
              </div>
            ) : (
              <div
                className="border border-[oklch(0.19_0_0)] rounded-sm overflow-hidden"
                data-ocid="admin.orders.table"
              >
                <Table>
                  <TableHeader>
                    <TableRow className="border-[oklch(0.19_0_0)] hover:bg-transparent">
                      {[
                        "Customer",
                        "WhatsApp",
                        "Items",
                        "Total",
                        "Status",
                        "Actions",
                      ].map((h) => (
                        <TableHead
                          key={h}
                          className="font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))]"
                        >
                          {h}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order, i) => (
                      <TableRow
                        key={`order-${i + 1}`}
                        data-ocid={`admin.orders.item.${i + 1}`}
                        className="border-[oklch(0.19_0_0)] hover:bg-[oklch(0.13_0_0)]"
                      >
                        <TableCell className="text-foreground text-sm">
                          {order.customerName}
                        </TableCell>
                        <TableCell className="text-[oklch(var(--text-secondary))] text-sm">
                          {order.whatsapp}
                        </TableCell>
                        <TableCell className="text-[oklch(var(--text-muted))] text-xs max-w-xs truncate">
                          {order.items}
                        </TableCell>
                        <TableCell className="text-gold font-cinzel font-bold">
                          {order.total}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`font-cinzel text-xs ${
                              order.status === "completed"
                                ? "bg-green-900 text-green-300"
                                : order.status === "confirmed"
                                  ? "bg-blue-900 text-blue-300"
                                  : "bg-[oklch(0.19_0_0)] text-[oklch(var(--text-secondary))]"
                            }`}
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Select
                              onValueChange={(val) =>
                                updateStatusMutation.mutate({
                                  id: `order-${i}`,
                                  status: val,
                                })
                              }
                            >
                              <SelectTrigger
                                data-ocid={`admin.orders.select.${i + 1}`}
                                className="h-7 text-xs bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] w-28"
                              >
                                <SelectValue placeholder="Update" />
                              </SelectTrigger>
                              <SelectContent className="bg-[oklch(0.13_0_0)] border-[oklch(0.19_0_0)]">
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">
                                  Confirmed
                                </SelectItem>
                                <SelectItem value="completed">
                                  Completed
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <a
                              href={`https://wa.me/${order.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${order.customerName}, regarding your order of ${order.total}...`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-[oklch(var(--text-muted))] hover:text-gold transition-colors"
                              title="Message on WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {/* ── Products Tab ── */}
          <TabsContent value="products" data-ocid="admin.products.panel">
            <div className="flex justify-end mb-4">
              <Dialog
                open={productDialog}
                onOpenChange={(open) => {
                  setProductDialog(open);
                  if (!open) {
                    setEditingId(null);
                    setProductForm(EMPTY_PRODUCT);
                    setImagePreview(null);
                  }
                }}
              >
                <DialogTrigger asChild>
                  <button
                    type="button"
                    data-ocid="admin.products.open_modal_button"
                    onClick={() => {
                      setEditingId(null);
                      setProductForm(EMPTY_PRODUCT);
                      setImagePreview(null);
                    }}
                    className="flex items-center gap-2 font-cinzel text-xs tracking-widest uppercase px-4 py-2.5 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-all rounded-sm font-bold"
                  >
                    <Plus className="w-4 h-4" /> Add Product
                  </button>
                </DialogTrigger>

                <DialogContent
                  data-ocid="admin.products.dialog"
                  className="bg-[oklch(0.13_0_0)] border-[oklch(0.19_0_0)] text-foreground max-w-lg max-h-[90vh] overflow-y-auto"
                >
                  <DialogHeader>
                    <DialogTitle className="font-cinzel tracking-wider">
                      {editingId ? "Edit Product" : "Add New Product"}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-5 py-2">
                    {/* Image Upload */}
                    <div>
                      <Label className="font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block">
                        Product Image
                      </Label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        data-ocid="admin.products.upload_button"
                      />
                      <div className="flex items-start gap-4">
                        <button
                          type="button"
                          aria-label="Select image"
                          className="w-20 h-20 rounded-sm border border-[oklch(0.19_0_0)] bg-[oklch(0.11_0_0)] flex items-center justify-center overflow-hidden flex-shrink-0 cursor-pointer hover:border-gold/50 transition-colors p-0"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          {imagePreview || productForm.imageUrl ? (
                            <img
                              src={imagePreview || productForm.imageUrl}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="w-6 h-6 text-[oklch(var(--text-muted))]" />
                          )}
                        </button>
                        <div className="flex-1">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 font-cinzel text-xs tracking-widest uppercase px-4 py-2.5 border border-gold/40 text-gold hover:bg-gold/10 transition-all rounded-sm"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            {imagePreview || productForm.imageUrl
                              ? "Change Image"
                              : "Upload Image"}
                          </button>
                          <p className="text-[oklch(var(--text-muted))] text-xs mt-2">
                            JPG, PNG, WEBP supported
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <Label className="font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block">
                        Product Name
                      </Label>
                      <Input
                        data-ocid="admin.products.input"
                        value={productForm.name}
                        onChange={(e) =>
                          setProductForm((p) => ({
                            ...p,
                            name: e.target.value,
                          }))
                        }
                        placeholder="e.g. Rose Garden Floral Set"
                        className="bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground focus:border-gold rounded-sm"
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <Label className="font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block">
                        Price
                      </Label>
                      <Input
                        value={productForm.priceUsd}
                        onChange={(e) =>
                          setProductForm((p) => ({
                            ...p,
                            priceUsd: e.target.value,
                          }))
                        }
                        placeholder="e.g. $4.99"
                        className="bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground focus:border-gold rounded-sm"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <Label className="font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block">
                        Category
                      </Label>
                      <Select
                        value={productForm.category}
                        onValueChange={(v) =>
                          setProductForm((p) => ({ ...p, category: v }))
                        }
                      >
                        <SelectTrigger
                          data-ocid="admin.products.select"
                          className="bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground focus:border-gold rounded-sm"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[oklch(0.13_0_0)] border-[oklch(0.19_0_0)]">
                          {CATEGORIES.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Formats */}
                    <div>
                      <Label className="font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block">
                        Formats
                      </Label>
                      <Input
                        value={productForm.formats}
                        onChange={(e) =>
                          setProductForm((p) => ({
                            ...p,
                            formats: e.target.value,
                          }))
                        }
                        placeholder="DST, PES, JEF, EXP"
                        className="bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground focus:border-gold rounded-sm"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <Label className="font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block">
                        Description
                      </Label>
                      <Textarea
                        data-ocid="admin.products.textarea"
                        value={productForm.description}
                        onChange={(e) =>
                          setProductForm((p) => ({
                            ...p,
                            description: e.target.value,
                          }))
                        }
                        rows={3}
                        placeholder="Describe the design..."
                        className="bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground focus:border-gold rounded-sm resize-none"
                      />
                    </div>

                    {/* Best Seller Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-sm border border-[oklch(0.19_0_0)] bg-[oklch(0.11_0_0)]">
                      <div>
                        <Label className="font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] block mb-0.5">
                          Best Seller
                        </Label>
                        <p className="text-[oklch(var(--text-muted))] text-xs">
                          Show in homepage Best Sellers section
                        </p>
                      </div>
                      <Switch
                        data-ocid="admin.products.switch"
                        checked={productForm.isBestSeller}
                        onCheckedChange={(checked) =>
                          setProductForm((p) => ({
                            ...p,
                            isBestSeller: checked,
                          }))
                        }
                        className="data-[state=checked]:bg-gold"
                      />
                    </div>

                    <button
                      type="button"
                      data-ocid="admin.products.submit_button"
                      onClick={() => saveProductMutation.mutate()}
                      disabled={
                        saveProductMutation.isPending ||
                        !productForm.name ||
                        !actor
                      }
                      className="w-full flex items-center justify-center gap-2 font-cinzel text-xs tracking-widest uppercase px-6 py-3 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-all font-bold rounded-sm disabled:opacity-50"
                    >
                      {saveProductMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />{" "}
                          {editingId ? "Update Product" : "Save Product"}
                        </>
                      )}
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {productsQuery.isLoading ? (
              <div
                className="text-center py-12"
                data-ocid="admin.products.loading_state"
              >
                <Loader2 className="w-6 h-6 animate-spin text-gold mx-auto" />
              </div>
            ) : products.length === 0 ? (
              <div
                className="text-center py-12 text-[oklch(var(--text-muted))]"
                data-ocid="admin.products.empty_state"
              >
                <ImageIcon className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-cinzel text-sm">
                  No products yet. Add your first product.
                </p>
              </div>
            ) : (
              <div
                className="border border-[oklch(0.19_0_0)] rounded-sm overflow-hidden"
                data-ocid="admin.products.table"
              >
                <Table>
                  <TableHeader>
                    <TableRow className="border-[oklch(0.19_0_0)] hover:bg-transparent">
                      {[
                        "Image",
                        "Name",
                        "Category",
                        "Price",
                        "Best Seller",
                        "Actions",
                      ].map((h) => (
                        <TableHead
                          key={h}
                          className="font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))]"
                        >
                          {h}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product, i) => (
                      <TableRow
                        key={`product-${i + 1}`}
                        data-ocid={`admin.products.item.${i + 1}`}
                        className="border-[oklch(0.19_0_0)] hover:bg-[oklch(0.13_0_0)]"
                      >
                        <TableCell>
                          <div className="w-10 h-10 rounded-sm overflow-hidden border border-[oklch(0.19_0_0)] bg-[oklch(0.11_0_0)] flex items-center justify-center flex-shrink-0">
                            {product.imageUrl ? (
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <ImageIcon className="w-4 h-4 text-[oklch(var(--text-muted))]" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-foreground font-medium">
                          {product.name}
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-[oklch(0.19_0_0)] text-[oklch(var(--text-secondary))] font-cinzel text-xs">
                            {product.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gold font-cinzel font-bold">
                          {product.priceUsd}
                        </TableCell>
                        <TableCell>
                          {product.isBestSeller ? (
                            <Star className="w-4 h-4 fill-gold text-gold" />
                          ) : (
                            <span className="text-[oklch(var(--text-muted))] text-sm">
                              —
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              data-ocid={`admin.products.edit_button.${i + 1}`}
                              title="Edit product"
                              onClick={() => {
                                setEditingId(`product-${i}`);
                                setProductForm(product);
                                setImagePreview(null);
                                setProductDialog(true);
                              }}
                              className="p-1.5 text-[oklch(var(--text-muted))] hover:text-gold transition-colors rounded"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              data-ocid={`admin.products.delete_button.${i + 1}`}
                              title="Delete product"
                              disabled={deleteProductMutation.isPending}
                              onClick={() =>
                                handleDeleteProduct(
                                  `product-${i}`,
                                  product.name,
                                )
                              }
                              className="p-1.5 text-[oklch(var(--text-muted))] hover:text-destructive transition-colors rounded disabled:opacity-50"
                            >
                              {deleteProductMutation.isPending ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {/* ── Custom Requests Tab ── */}
          <TabsContent value="custom" data-ocid="admin.custom.panel">
            {customRequestsQuery.isError ? (
              <div
                className="text-center py-12 text-[oklch(var(--text-muted))]"
                data-ocid="admin.custom.error_state"
              >
                <p className="font-cinzel text-sm">
                  Admin access required to view custom requests.
                </p>
              </div>
            ) : customRequestsQuery.isLoading ? (
              <div
                className="text-center py-12"
                data-ocid="admin.custom.loading_state"
              >
                <Loader2 className="w-6 h-6 animate-spin text-gold mx-auto" />
              </div>
            ) : customRequests.length === 0 ? (
              <div
                className="text-center py-12 text-[oklch(var(--text-muted))]"
                data-ocid="admin.custom.empty_state"
              >
                <p className="font-cinzel text-sm">No custom requests yet</p>
              </div>
            ) : (
              <div
                className="border border-[oklch(0.19_0_0)] rounded-sm overflow-hidden"
                data-ocid="admin.custom.table"
              >
                <Table>
                  <TableHeader>
                    <TableRow className="border-[oklch(0.19_0_0)] hover:bg-transparent">
                      {[
                        "Name",
                        "WhatsApp",
                        "Description",
                        "Budget",
                        "Contact",
                      ].map((h) => (
                        <TableHead
                          key={h}
                          className="font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))]"
                        >
                          {h}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customRequests.map((req, i) => (
                      <TableRow
                        key={`req-${i + 1}`}
                        data-ocid={`admin.custom.item.${i + 1}`}
                        className="border-[oklch(0.19_0_0)] hover:bg-[oklch(0.13_0_0)]"
                      >
                        <TableCell className="text-foreground">
                          {req.name}
                        </TableCell>
                        <TableCell className="text-[oklch(var(--text-secondary))] text-sm">
                          {req.whatsapp}
                        </TableCell>
                        <TableCell className="text-[oklch(var(--text-muted))] text-xs max-w-xs truncate">
                          {req.description}
                        </TableCell>
                        <TableCell className="text-gold font-cinzel">
                          {req.budget}
                        </TableCell>
                        <TableCell>
                          <a
                            href={`https://wa.me/${req.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${req.name}, regarding your custom design request...`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-[oklch(var(--text-muted))] hover:text-gold transition-colors inline-block"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {/* ── Settings Tab ── */}
          <TabsContent value="settings" data-ocid="admin.settings.panel">
            {settingsQuery.isLoading ? (
              <div
                className="text-center py-12"
                data-ocid="admin.settings.loading_state"
              >
                <Loader2 className="w-6 h-6 animate-spin text-gold mx-auto" />
              </div>
            ) : (
              <div className="max-w-xl">
                <div className="border border-[oklch(0.19_0_0)] bg-[oklch(0.13_0_0)] rounded-sm p-6 space-y-6">
                  <div>
                    <h2 className="font-cinzel text-sm tracking-widest uppercase text-foreground mb-1">
                      Site Settings
                    </h2>
                    <p className="text-[oklch(var(--text-muted))] text-xs">
                      Changes apply to your storefront immediately after saving.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <Label className="font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block">
                        Store Name
                      </Label>
                      <Input
                        data-ocid="admin.settings.input"
                        value={settingsForm.storeName}
                        onChange={(e) =>
                          setSettingsForm((p) => ({
                            ...p,
                            storeName: e.target.value,
                          }))
                        }
                        placeholder="Embroidery Designs"
                        className="bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground focus:border-gold rounded-sm"
                      />
                    </div>

                    <div>
                      <Label className="font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block">
                        WhatsApp Number
                      </Label>
                      <Input
                        value={settingsForm.whatsappNumber}
                        onChange={(e) =>
                          setSettingsForm((p) => ({
                            ...p,
                            whatsappNumber: e.target.value,
                          }))
                        }
                        placeholder="+91 9914902647"
                        className="bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground focus:border-gold rounded-sm"
                      />
                    </div>

                    <div>
                      <Label className="font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block">
                        Hero Text
                      </Label>
                      <Input
                        value={settingsForm.heroText}
                        onChange={(e) =>
                          setSettingsForm((p) => ({
                            ...p,
                            heroText: e.target.value,
                          }))
                        }
                        placeholder="Premium Embroidery Designs for Professionals"
                        className="bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground focus:border-gold rounded-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    data-ocid="admin.settings.save_button"
                    onClick={() => saveSettingsMutation.mutate()}
                    disabled={saveSettingsMutation.isPending}
                    className="flex items-center gap-2 font-cinzel text-xs tracking-widest uppercase px-5 py-2.5 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-all font-bold rounded-sm disabled:opacity-50"
                  >
                    {saveSettingsMutation.isPending ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />{" "}
                        Saving...
                      </>
                    ) : (
                      <>
                        <Settings className="w-3.5 h-3.5" /> Save Settings
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
