import { useState } from "react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Linkedin, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast({ title: "Message sent", description: "Thank you for reaching out. I'll respond soon." });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <FadeIn>
            <p className="font-body text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Contact</p>
            <h1 className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-6">
              Get in Touch
            </h1>
            <p className="font-body text-base text-muted-foreground leading-relaxed max-w-xl mb-14">
              Whether you have a translation project, an editorial need, or simply want to discuss a collaboration — I'd love to hear from you. Please fill out the form below or reach me directly by email.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            {/* Form */}
            <FadeIn delay={0.1} className="md:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-body text-sm">Name</Label>
                    <Input id="name" name="name" required placeholder="Your name" className="font-body" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-body text-sm">Email</Label>
                    <Input id="email" name="email" type="email" required placeholder="your@email.com" className="font-body" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectType" className="font-body text-sm">Project Type</Label>
                  <Select name="projectType">
                    <SelectTrigger className="font-body">
                      <SelectValue placeholder="Select a project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="translation">Literary Translation</SelectItem>
                      <SelectItem value="editing">Editing & Proofreading</SelectItem>
                      <SelectItem value="manuscript">Manuscript Review</SelectItem>
                      <SelectItem value="localization">Cultural Localization</SelectItem>
                      <SelectItem value="consultation">Publishing Consultation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="font-body text-sm">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell me about your project, timeline, and what you're looking for…"
                    className="font-body"
                  />
                </div>
                <Button type="submit" size="lg" disabled={sending} className="font-body tracking-wide">
                  {sending ? "Sending…" : "Send Message"}
                </Button>
              </form>
            </FadeIn>

            {/* Sidebar */}
            <FadeIn delay={0.2} className="md:col-span-2">
              <div className="space-y-8">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Email</h3>
                  <a href="mailto:daria@example.com" className="font-body text-sm text-primary hover:underline">
                    daria@example.com
                  </a>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-3">Elsewhere</h3>
                  <div className="flex flex-col gap-3">
                    <a href="#" className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                      <Linkedin size={16} /> LinkedIn
                    </a>
                    <a href="#" className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                      <Instagram size={16} /> Instagram
                    </a>
                    <a href="#" className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                      <Mail size={16} /> Newsletter
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">CV</h3>
                  <a href="#" className="font-body text-sm text-primary hover:underline">
                    Download CV (PDF)
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
