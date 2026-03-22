import { useState } from "react";
import { useServices } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ServiceForm {
  title: string;
  description: string;
  icon: string;
  sort_order: number;
}

const emptyService: ServiceForm = { title: "", description: "", icon: "BookOpen", sort_order: 0 };

const AdminServices = () => {
  const { data: services, isLoading } = useServices();
  const qc = useQueryClient();
  const { toast } = useToast();
  const [editing, setEditing] = useState<(ServiceForm & { id?: string }) | null>(null);
  const [open, setOpen] = useState(false);

  const save = async () => {
    if (!editing) return;
    const { id, ...rest } = editing;
    let error;
    if (id) {
      ({ error } = await supabase.from("services").update(rest).eq("id", id));
    } else {
      ({ error } = await supabase.from("services").insert(rest));
    }
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Saved" });
      qc.invalidateQueries({ queryKey: ["services"] });
      setOpen(false);
    }
  };

  const remove = async (id: string) => {
    await supabase.from("services").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["services"] });
    toast({ title: "Deleted" });
  };

  if (isLoading) return <p className="font-body text-muted-foreground">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-medium text-foreground">Services ({services?.length || 0})</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="font-body gap-1" onClick={() => setEditing({ ...emptyService })}>
              <Plus size={16} /> Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle className="font-heading">{editing?.id ? "Edit Service" : "New Service"}</DialogTitle></DialogHeader>
            {editing && (
              <div className="space-y-4 mt-4">
                <div className="space-y-1">
                  <Label className="font-body text-sm">Title</Label>
                  <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="font-body" />
                </div>
                <div className="space-y-1">
                  <Label className="font-body text-sm">Description</Label>
                  <Textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="font-body" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="font-body text-sm">Icon (Lucide name)</Label>
                    <Input value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} className="font-body" />
                  </div>
                  <div className="space-y-1">
                    <Label className="font-body text-sm">Sort Order</Label>
                    <Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} className="font-body" />
                  </div>
                </div>
                <Button onClick={save} className="w-full font-body">Save</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {services?.map((s) => (
          <div key={s.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-card">
            <div>
              <p className="font-heading text-sm font-medium text-foreground">{s.title}</p>
              <p className="font-body text-xs text-muted-foreground">{s.icon} · Order: {s.sort_order}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="font-body" onClick={() => { setEditing(s); setOpen(true); }}>Edit</Button>
              <Button variant="ghost" size="sm" onClick={() => remove(s.id)} className="text-destructive hover:text-destructive"><Trash2 size={14} /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;
