import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Pen, Languages } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { useSiteContent, useWorks, useTestimonials } from "@/hooks/useSiteContent";

const highlights = [
  {
    icon: Languages,
    title: "Translation",
    description: "Literary translation across multiple language pairs, with a focus on preserving voice, rhythm, and cultural nuance.",
  },
  {
    icon: BookOpen,
    title: "Literary Work",
    description: "Original essays, criticism, and editorial writing rooted in a deep engagement with contemporary literature.",
  },
  {
    icon: Pen,
    title: "Services",
    description: "Editing, proofreading, manuscript review, and cultural localization for publishers, authors, and institutions.",
  },
];

const Index = () => {
  const { data: content } = useSiteContent();
  const { data: works } = useWorks();
  const { data: testimonials } = useTestimonials();

  const selectedWorks = works?.slice(0, 4) || [];
  const testimonial = testimonials?.[0];

  return (
    <Layout>
      {/* Hero */}
      <section className="min-h-[80vh] flex items-center">
        <div className="container mx-auto px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <FadeIn>
              <p className="font-body text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
                {content?.hero_subtitle || "Literature & Translation"}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-foreground mb-6">
                {content?.hero_title || "Daria"}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg">
                {content?.hero_description || "Translator, writer, and editor working at the intersection of languages and literature."}
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="default" size="lg" className="font-body tracking-wide">
                  <Link to="/portfolio">View Work</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="font-body tracking-wide">
                  <Link to="/contact">Contact</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground mb-12 text-center">
              What I Do
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="p-8 bg-background rounded-lg border border-border hover:border-primary/30 transition-colors duration-300">
                  <item.icon size={28} className="text-primary mb-4" />
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Works */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-end justify-between mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground">
                Selected Works
              </h2>
              <Link to="/portfolio" className="hidden md:flex items-center gap-1 font-body text-sm text-primary hover:underline">
                View all <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
          <div className="space-y-0 border-t border-border">
            {selectedWorks.map((work, i) => (
              <FadeIn key={work.id} delay={i * 0.05}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-border hover:bg-card/50 transition-colors duration-200 px-2 -mx-2 rounded">
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-medium text-foreground">{work.title}</h3>
                    <p className="font-body text-sm text-muted-foreground mt-1">
                      {work.type}{work.lang && ` · ${work.lang}`}
                    </p>
                  </div>
                  <span className="font-body text-sm text-muted-foreground mt-2 sm:mt-0">{work.year}</span>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2}>
            <div className="mt-8 md:hidden">
              <Link to="/portfolio" className="flex items-center gap-1 font-body text-sm text-primary hover:underline">
                View all works <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Testimonial */}
      {testimonial && (
        <section className="py-20 bg-card">
          <div className="container mx-auto px-6 lg:px-8 max-w-3xl text-center">
            <FadeIn>
              <blockquote className="font-heading text-2xl md:text-3xl italic font-normal text-foreground leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>
              <cite className="font-body text-sm text-muted-foreground not-italic">
                — {testimonial.author}{testimonial.title ? `, ${testimonial.title}` : ""}
              </cite>
            </FadeIn>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Index;
