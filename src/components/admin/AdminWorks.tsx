import { useState } from "react";
import { useWorks } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface WorkForm {
  title: string;
  category: string;
  type: string;
  lang: string;
  year: string;
  description: string;
  link: string;
  featured: boolean;
  sort_order: number;
}

const emptyWork: WorkForm = {
  title: "", category: "Translations", type: "", lang: "", year: new Date().getFullYear().toString(),
  description: "", link: "", featured: false, sort_order: 0,
};

const AdminWorks = () => {
  const { data: works, isLoading } = useWorks();
  const qc = useQueryClient();
  const { toast } = useToast();
  const [editing, setEditing] = useState<(WorkForm & { id?: string }) | null>(null);
  const [open, setOpen] = useState(false);

  const save = async () => {
    if (!editing) return;
    const { id, ...rest } = editing;
    const payload = { ...rest, lang: rest.lang || null, link: rest.link || null };
    let error;
    if (id) {
      ({ error } = await supabase.from("works").update(payload).eq("id", id));
    } else {
      ({ error } = await supabase.from("works").insert(payload));
    }
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved" });
      qc.invalidateQueries({ queryKey: ["works"] });
      setOpen(false);
      setEditing(null);
    }
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("works").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Deleted" });
      qc.invalidateQueries({ queryKey: ["works"] });
    }
  };

  if (isLoading) return <p className="font-body text-muted-foreground">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-medium text-foreground">Works ({works?.length || 0})</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="font-body gap-1" onClick={() => setEditing({ ...emptyWork })}>
              <Plus size={16} /> Add Work
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader><DialogTitle className="font-heading">{editing?.id ? "Edit Work" : "New Work"}</DialogTitle></DialogHeader>
            {editing && (
              <div className="space-y-4 mt-4">
                <div className="space-y-1">
                  <Label className="font-body text-sm">Title</Label>
                  <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="font-body" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="font-body text-sm">Category</Label>
                    <Select value={editing.category} onValueChange={(v) => setEditing({ ...editing, category: v })}>
                      <SelectTrigger className="font-body"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["Translations", "Writing", "Publications", "Editorial"].map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="font-body text-sm">Type</Label>
                    <Input value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })} className="font-body" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="font-body text-sm">Language Pair</Label>
                    <Input value={editing.lang} onChange={(e) => setEditing({ ...editing, lang: e.target.value })} placeholder="e.g. Spanish → English" className="font-body" />
                  </div>
                  <div className="space-y-1">
                    <Label className="font-body text-sm">Year</Label>
                    <Input value={editing.year} onChange={(e) => setEditing({ ...editing, year: e.target.value })} className="font-body" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="font-body text-sm">Description</Label>
                  <Textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="font-body" />
                </div>
                <div className="space-y-1">
                  <Label className="font-body text-sm">External Link</Label>
                  <Input value={editing.link} onChange={(e) => setEditing({ ...editing, link: e.target.value })} placeholder="https://…" className="font-body" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="font-body text-sm">Sort Order</Label>
                    <Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} className="font-body" />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <Checkbox checked={editing.featured} onCheckedChange={(c) => setEditing({ ...editing, featured: !!c })} />
                    <Label className="font-body text-sm">Featured</Label>
                  </div>
                </div>
                <Button onClick={save} className="w-full font-body">Save</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {works?.map((work) => (
          <div key={work.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-card">
            <div>
              <p className="font-heading text-sm font-medium text-foreground">{work.title}</p>
              <p className="font-body text-xs text-muted-foreground">{work.category} · {work.year}{work.featured ? " · ⭐ Featured" : ""}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="font-body" onClick={() => { setEditing({ ...work, lang: work.lang || "", link: work.link || "" }); setOpen(true); }}>
                Edit
              </Button>
              <Button variant="ghost" size="sm" onClick={() => remove(work.id)} className="text-destructive hover:text-destructive">
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminWorks;
