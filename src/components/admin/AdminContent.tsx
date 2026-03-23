import { useState, useEffect } from "react";
import { useSiteContent, useUpdateSiteContent } from "@/hooks/useSiteContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const contentFields = [
  { key: "hero_subtitle", label: "Hero Subtitle", type: "input" },
  { key: "hero_title", label: "Hero Title", type: "input" },
  { key: "hero_description", label: "Hero Description", type: "textarea" },
  { key: "about_bio_1", label: "About Bio (Paragraph 1)", type: "textarea" },
  { key: "about_bio_2", label: "About Bio (Paragraph 2)", type: "textarea" },
  { key: "about_bio_3", label: "About Bio (Paragraph 3)", type: "textarea" },
  { key: "about_approach", label: "About — Approach", type: "textarea" },
  { key: "about_languages", label: "Languages (comma-separated)", type: "input" },
  { key: "about_expertise", label: "Expertise (comma-separated)", type: "input" },
  { key: "services_intro", label: "Services Introduction", type: "textarea" },
  { key: "contact_intro", label: "Contact Introduction", type: "textarea" },
  { key: "contact_email", label: "Contact Email", type: "input" },
];

const aboutFields = [
  { key: "about_bio_1", label: "About Bio (Paragraph 1)", type: "textarea" },
  { key: "about_bio_2", label: "About Bio (Paragraph 2)", type: "textarea" },
  { key: "about_bio_3", label: "About Bio (Paragraph 3)", type: "textarea" },
  { key: "about_approach", label: "About — Approach", type: "textarea" },
  { key: "about_languages", label: "Languages (comma-separated)", type: "input" },
  { key: "about_expertise", label: "Expertise (comma-separated)", type: "input" },
];

const AdminContent = ({ aboutOnly = false }: { aboutOnly?: boolean }) => {
  const fields = aboutOnly ? aboutFields : contentFields;
  const { data: content, isLoading } = useSiteContent();
  const mutation = useUpdateSiteContent();
  const { toast } = useToast();
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (content) setValues(content);
  }, [content]);

  const handleSave = async (key: string) => {
    try {
      await mutation.mutateAsync({ key, value: values[key] || "" });
      toast({ title: "Saved", description: `"${key}" updated successfully.` });
    } catch {
      toast({ title: "Error", description: "Failed to save.", variant: "destructive" });
    }
  };

  if (isLoading) return <p className="font-body text-muted-foreground">Loading content…</p>;

  return (
    <div className="space-y-6">
      {fields.map((field) => (
        <div key={field.key} className="space-y-2">
          <Label className="font-body text-sm font-medium">{field.label}</Label>
          {field.type === "textarea" ? (
            <Textarea
              value={values[field.key] || ""}
              onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
              rows={3}
              className="font-body"
            />
          ) : (
            <Input
              value={values[field.key] || ""}
              onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
              className="font-body"
            />
          )}
          <Button size="sm" onClick={() => handleSave(field.key)} disabled={mutation.isPending} className="font-body">
            Save
          </Button>
        </div>
      ))}
    </div>
  );
};

export default AdminContent;
