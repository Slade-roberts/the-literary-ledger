import { useState } from "react";
import { useTestimonials } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const AdminTestimonials = () => {
  const { data: testimonials, isLoading } = useTestimonials();
  const qc = useQueryClient();
  const { toast } = useToast();
  const [editing, setEditing] = useState<{ id?: string; quote: string; author: string; title: string; sort_order: number } | null>(null);
  const [open, setOpen] = useState(false);

  const save = async () => {
    if (!editing) return;
    const { id, ...rest } = editing;
    let error;
    if (id) {
      ({ error } = await supabase.from("testimonials").update(rest).eq("id", id));
    } else {
      ({ error } = await supabase.from("testimonials").insert(rest));
    }
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Saved" });
      qc.invalidateQueries({ queryKey: ["testimonials"] });
      setOpen(false);
    }
  };

  const remove = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["testimonials"] });
    toast({ title: "Deleted" });
  };

  if (isLoading) return <p className="font-body text-muted-foreground">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-medium text-foreground">Testimonials ({testimonials?.length || 0})</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="font-body gap-1" onClick={() => setEditing({ quote: "", author: "", title: "", sort_order: 0 })}>
              <Plus size={16} /> Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle className="font-heading">{editing?.id ? "Edit" : "New"} Testimonial</DialogTitle></DialogHeader>
            {editing && (
              <div className="space-y-4 mt-4">
                <div className="space-y-1">
                  <Label className="font-body text-sm">Quote</Label>
                  <Textarea value={editing.quote} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} rows={3} className="font-body" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="font-body text-sm">Author</Label>
                    <Input value={editing.author} onChange={(e) => setEditing({ ...editing, author: e.target.value })} className="font-body" />
                  </div>
                  <div className="space-y-1">
                    <Label className="font-body text-sm">Title / Role</Label>
                    <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="font-body" />
                  </div>
                </div>
                <Button onClick={save} className="w-full font-body">Save</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {testimonials?.map((t) => (
          <div key={t.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-card">
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm text-foreground truncate">"{t.quote.slice(0, 80)}…"</p>
              <p className="font-body text-xs text-muted-foreground">— {t.author}{t.title ? `, ${t.title}` : ""}</p>
            </div>
            <div className="flex gap-2 ml-2">
              <Button variant="ghost" size="sm" className="font-body" onClick={() => { setEditing({ ...t, title: t.title || "" }); setOpen(true); }}>Edit</Button>
              <Button variant="ghost" size="sm" onClick={() => remove(t.id)} className="text-destructive hover:text-destructive"><Trash2 size={14} /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonials;
