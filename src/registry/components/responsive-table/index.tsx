"use client";

import React, { useState } from "react";
import { columns, Product } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Server, CheckCircle2, TerminalSquare, LayoutGrid } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

const initialData: Product[] = [
  { id: "PROD-001", name: "Premium UI Kit", image: "https://picsum.photos/seed/uikit/300/200", category: "Design", status: "Active", price: 49.0, sales: 120 },
  { id: "PROD-002", name: "SaaS Dashboard Template", image: "https://picsum.photos/seed/dashboard/300/200", category: "Templates", status: "Active", price: 79.0, sales: 85 },
  { id: "PROD-003", name: "Figma Icon Set", image: "https://picsum.photos/seed/icons/300/200", category: "Design", status: "Draft", price: 19.0, sales: 0 },
  { id: "PROD-004", name: "Next.js Boilerplate", image: "https://picsum.photos/seed/nextjs/300/200", category: "Code", status: "Active", price: 149.0, sales: 340 },
  { id: "PROD-005", name: "React Native App Theme", image: "https://picsum.photos/seed/mobile/300/200", category: "Code", status: "Archived", price: 99.0, sales: 42 },
  { id: "PROD-006", name: "3D Illustration Pack", image: "https://picsum.photos/seed/3dillust/300/200", category: "Design", status: "Active", price: 29.0, sales: 210 },
  { id: "PROD-007", name: "Admin Panel React", image: "https://picsum.photos/seed/adminpanel/300/200", category: "Templates", status: "Draft", price: 59.0, sales: 0 },
  { id: "PROD-008", name: "Marketing Landing Page", image: "https://picsum.photos/seed/marketing/300/200", category: "Templates", status: "Active", price: 39.0, sales: 450 },
  { id: "PROD-009", name: "Node.js API Starter", image: "https://picsum.photos/seed/nodejs/300/200", category: "Code", status: "Active", price: 69.0, sales: 110 },
  { id: "PROD-010", name: "Wireframe Kit Pro", image: "https://picsum.photos/seed/wireframe/300/200", category: "Design", status: "Archived", price: 24.0, sales: 88 },
  { id: "PROD-011", name: "E-commerce React Store", image: "https://picsum.photos/seed/ecommerce/300/200", category: "Code", status: "Draft", price: 199.0, sales: 0 },
  { id: "PROD-012", name: "Social Media Graphics", image: "https://picsum.photos/seed/socialmedia/300/200", category: "Design", status: "Active", price: 15.0, sales: 530 },
  { id: "PROD-013", name: "Portfolio Template", image: "https://picsum.photos/seed/portfolio/300/200", category: "Templates", status: "Active", price: 45.0, sales: 125 },
  { id: "PROD-014", name: "Tailwind CSS Components", image: "https://picsum.photos/seed/tailwind/300/200", category: "Code", status: "Active", price: 89.0, sales: 280 },
  { id: "PROD-015", name: "Podcast App UI", image: "https://picsum.photos/seed/podcast/300/200", category: "Design", status: "Draft", price: 35.0, sales: 0 },
  { id: "PROD-016", name: "CRM Admin Dashboard", image: "https://picsum.photos/seed/crm/300/200", category: "Templates", status: "Active", price: 129.0, sales: 95 },
  { id: "PROD-017", name: "Vue 3 Component Library", image: "https://picsum.photos/seed/vue3/300/200", category: "Code", status: "Archived", price: 55.0, sales: 34 },
  { id: "PROD-018", name: "Logo Design Pack", image: "https://picsum.photos/seed/logodesign/300/200", category: "Design", status: "Active", price: 49.0, sales: 410 },
  { id: "PROD-019", name: "Blog Starter Kit", image: "https://picsum.photos/seed/blogkit/300/200", category: "Templates", status: "Active", price: 29.0, sales: 175 },
  { id: "PROD-020", name: "GraphQL API Boilerplate", image: "https://picsum.photos/seed/graphql/300/200", category: "Code", status: "Active", price: 75.0, sales: 60 },
];

export default function AdvancedTableDemo() {
  const [data, setData] = useState<Product[]>(initialData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Delete Confirmation State
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [productsToBulkDelete, setProductsToBulkDelete] = useState<Product[] | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    image: "",
    category: "",
    status: "Active",
    price: 0,
    sales: 0,
  });

  const handleSave = () => {
    if (editingProduct) {
      setData((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...p, ...formData } as Product : p))
      );
      toast.success("Product updated successfully");
    } else {
      const newProduct: Product = {
        ...(formData as Product),
        id: `PROD-${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`,
        sales: 0, // Default for new products
      };
      setData((prev) => [newProduct, ...prev]);
      toast.success("Product created successfully");
    }
    setIsDialogOpen(false);
    setEditingProduct(null);
    setFormData({ name: "", image: "", category: "", status: "Active", price: 0, sales: 0 });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsDialogOpen(true);
  };

  const handleDeleteRequest = (product: Product) => {
    setProductToDelete(product);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setData((prev) => prev.filter((p) => p.id !== productToDelete.id));
      toast.success(`Deleted ${productToDelete.name}`);
      setProductToDelete(null);
    }
  };

  const handleBulkDeleteRequest = (selectedProducts: Product[]) => {
    setProductsToBulkDelete(selectedProducts);
  };

  const confirmBulkDelete = () => {
    if (productsToBulkDelete) {
      const idsToDelete = new Set(productsToBulkDelete.map((p) => p.id));
      setData((prev) => prev.filter((p) => !idsToDelete.has(p.id)));
      toast.success(`Deleted ${productsToBulkDelete.length} products`);
      setProductsToBulkDelete(null);
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Single Delete Confirmation */}
      <AlertDialog open={!!productToDelete} onOpenChange={() => setProductToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product
              {'"'}{productToDelete?.name}{'"'}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Confirmation */}
      <AlertDialog open={!!productsToBulkDelete} onOpenChange={() => setProductsToBulkDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Multiple Products</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {productsToBulkDelete?.length} products? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmBulkDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Digital Products</h2>
          <p className="text-muted-foreground">Manage your digital inventory, pricing, and sales.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger
            render={
              <Button onClick={() => {
                setEditingProduct(null);
                setFormData({ name: "", image: "", category: "", status: "Active", price: 0, sales: 0 });
              }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            }
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
              <DialogDescription>
                Fill in the details for your digital product. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    id="image"
                    placeholder="https://..."
                    value={formData.image ?? ""}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                  {formData.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={formData.image} alt="preview" className="w-10 h-10 rounded-md object-cover bg-muted flex-none" />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(val: string | null) => val && setFormData({ ...formData, status: val as "Active" | "Draft" | "Archived" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSave}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        columns={columns}
        data={data}
        onBulkDeleteRequest={handleBulkDeleteRequest}
        meta={{
          onEdit: handleEdit,
          onDeleteRequest: handleDeleteRequest,
        }}
      />

      <div className="pt-10 border-t mt-10 space-y-10">
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <LayoutGrid className="w-5 h-5 mr-2 text-primary" />
            Responsive Modes Overview
          </h3>
          <p className="text-muted-foreground mb-6">
            The data table features three distinct viewing modes to handle complex data on various screen sizes without compromising usability:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Alert>
              <AlertTitle className="font-bold">Table View</AlertTitle>
              <AlertDescription className="mt-2 text-muted-foreground text-sm">
                The standard horizontal layout. Best for desktop displays where users need to compare multiple columns simultaneously. Uses horizontal scroll on smaller screens.
              </AlertDescription>
            </Alert>
            <Alert>
              <AlertTitle className="font-bold">Stacked View</AlertTitle>
              <AlertDescription className="mt-2 text-muted-foreground text-sm">
                Pure CSS-based responsive mode. It visually stacks standard table rows into a card format on mobile, preserving the exact DOM structure while drastically improving readability.
              </AlertDescription>
            </Alert>
            <Alert>
              <AlertTitle className="font-bold">Grid View</AlertTitle>
              <AlertDescription className="mt-2 text-muted-foreground text-sm">
                A highly customizable React Component-based approach. Completely transforms rows into separate <code className="bg-muted px-1 rounded">Card</code> components, ideal for visually rich catalogs.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Server className="w-5 h-5 mr-2 text-primary" />
            Server-Side Integration Guide
          </h3>
        <p className="text-muted-foreground mb-6">
          While the demo above runs entirely on the client, real-world tables often handle large datasets requiring server-side rendering (SSR) and operations. Here is how you connect this table to a backend in Next.js 14+:
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Alert>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertTitle className="font-bold">1. Server-Side Pagination & Sorting</AlertTitle>
            <AlertDescription className="mt-2 text-muted-foreground">
              Instead of passing all data to the client, update the URL search params (e.g., <code className="bg-muted px-1 rounded">?page=2&sort=price_desc</code>). 
              Your Next.js Server Component reads these params, fetches the specific slice of data from your database, and passes it to the DataTable.
            </AlertDescription>
          </Alert>
          
          <Alert>
            <TerminalSquare className="h-4 w-4 text-blue-500" />
            <AlertTitle className="font-bold">2. Mutations with Server Actions</AlertTitle>
            <AlertDescription className="mt-2 text-muted-foreground">
              Replace the local <code className="bg-muted px-1 rounded">setData</code> state with Next.js Server Actions. 
              When a user clicks &quot;Delete&quot; or submits the &quot;Add Product&quot; form, call an asynchronous action like <code className="bg-muted px-1 rounded">deleteProduct(id)</code>.
              Call <code className="bg-muted px-1 rounded">revalidatePath(&apos;/products&apos;)</code> to refresh the table instantly.
            </AlertDescription>
          </Alert>
        </div>
        </div>
      </div>
    </div>
  );
}
