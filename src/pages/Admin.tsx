import { useState } from "react";
import { useSarees, useCreateSaree, useUpdateSaree, useDeleteSaree, FABRICS, COLORS, OCCASIONS } from "@/hooks/useSarees";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const emptyForm = {
  name: "",
  price: "",
  description: "",
  fabric: "Silk",
  color: "Maroon",
  occasion: "Wedding",
  stock: "",
  blouse_piece: true,
};

const Admin = () => {
  const { data: sarees, isLoading } = useSarees();
  const createSaree = useCreateSaree();
  const updateSaree = useUpdateSaree();
  const deleteSaree = useDeleteSaree();

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    if (!form.name || !form.price || !form.stock) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      if (editingId) {
        await updateSaree.mutateAsync({
          id: editingId,
          name: form.name,
          price: Number(form.price),
          description: form.description,
          fabric: form.fabric,
          color: form.color,
          occasion: form.occasion,
          stock: Number(form.stock),
          blouse_piece: form.blouse_piece,
        });
        toast.success("Saree updated!");
      } else {
        await createSaree.mutateAsync({
          name: form.name,
          price: Number(form.price),
          description: form.description,
          fabric: form.fabric,
          color: form.color,
          occasion: form.occasion,
          stock: Number(form.stock),
          blouse_piece: form.blouse_piece,
          images: ["/saree-1.jpg"],
        });
        toast.success("Saree added!");
      }
      setForm(emptyForm);
      setEditingId(null);
      setDialogOpen(false);
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (saree: any) => {
    setForm({
      name: saree.name,
      price: String(saree.price),
      description: saree.description,
      fabric: saree.fabric,
      color: saree.color,
      occasion: saree.occasion,
      stock: String(saree.stock),
      blouse_piece: saree.blouse_piece,
    });
    setEditingId(saree.id);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSaree.mutateAsync(id);
      toast.success("Saree deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const openNew = () => {
    setForm(emptyForm);
    setEditingId(null);
    setDialogOpen(true);
  };

  return (
    <main className="container py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold">Admin Panel</h1>
          <p className="text-sm text-muted-foreground font-body mt-1">
            Manage your saree inventory
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew} className="gap-2 rounded-full font-body">
              <Plus className="h-4 w-4" /> Add Saree
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-heading">
                {editingId ? "Edit Saree" : "Add New Saree"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label className="text-sm font-body">Name *</Label>
                <Input value={form.name} onChange={(e) => update("name", e.target.value)} className="font-body mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-body">Price (₹) *</Label>
                  <Input type="number" value={form.price} onChange={(e) => update("price", e.target.value)} className="font-body mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-body">Stock *</Label>
                  <Input type="number" value={form.stock} onChange={(e) => update("stock", e.target.value)} className="font-body mt-1" />
                </div>
              </div>
              <div>
                <Label className="text-sm font-body">Description</Label>
                <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} className="font-body mt-1" rows={3} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-sm font-body">Fabric</Label>
                  <Select value={form.fabric} onValueChange={(v) => update("fabric", v)}>
                    <SelectTrigger className="font-body mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {FABRICS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-body">Color</Label>
                  <Select value={form.color} onValueChange={(v) => update("color", v)}>
                    <SelectTrigger className="font-body mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {COLORS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-body">Occasion</Label>
                  <Select value={form.occasion} onValueChange={(v) => update("occasion", v)}>
                    <SelectTrigger className="font-body mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {OCCASIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm font-body">Blouse Piece Included</Label>
                <Switch checked={form.blouse_piece} onCheckedChange={(v) => update("blouse_piece", v)} />
              </div>
              <Button onClick={handleSave} className="w-full rounded-full font-body" disabled={createSaree.isPending || updateSaree.isPending}>
                {editingId ? "Update Saree" : "Add Saree"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg overflow-hidden bg-card shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground">Image</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Fabric</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Price</th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Stock</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">Loading...</td></tr>
              ) : (sarees || []).map((saree) => (
                <tr key={saree.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-3">
                    <img src={saree.images[0]} alt={saree.name} className="w-12 h-16 object-cover rounded" />
                  </td>
                  <td className="p-3">
                    <p className="font-medium truncate max-w-[150px]">{saree.name}</p>
                    <p className="text-xs text-muted-foreground md:hidden">{saree.fabric} · {saree.stock} in stock</p>
                  </td>
                  <td className="p-3 hidden md:table-cell">{saree.fabric}</td>
                  <td className="p-3 font-medium">₹{saree.price.toLocaleString("en-IN")}</td>
                  <td className="p-3 hidden md:table-cell">{saree.stock}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(saree)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(saree.id)} className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Admin;
