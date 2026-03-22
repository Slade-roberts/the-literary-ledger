import { useState } from "react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { ExternalLink } from "lucide-react";
import { useWorks } from "@/hooks/useSiteContent";

type Category = "All" | "Translations" | "Writing" | "Publications" | "Editorial";
const categories: Category[] = ["All", "Translations", "Writing", "Publications", "Editorial"];

const Portfolio = () => {
  const [active, setActive] = useState<Category>("All");
  const { data: works, isLoading } = useWorks();

  const filtered = active === "All" ? works : works?.filter((w) => w.category === active);
  const featured = works?.filter((w) => w.featured) || [];

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <FadeIn>
            <p className="font-body text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Portfolio</p>
            <h1 className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-6">Selected Works</h1>
            <p className="font-body text-base text-muted-foreground leading-relaxed max-w-2xl mb-12">
              A selection of translations, essays, editorial projects, and published work spanning multiple languages and literary forms.
            </p>
          </FadeIn>

          {isLoading && <p className="font-body text-muted-foreground">Loading…</p>}

          {featured.length > 0 && (
            <FadeIn delay={0.1}>
              <h2 className="font-heading text-2xl font-medium text-foreground mb-6">Featured</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {featured.map((work) => (
                  <div key={work.id} className="p-6 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors duration-300">
                    <span className="font-body text-xs uppercase tracking-wider text-primary">{work.type}</span>
                    <h3 className="font-heading text-lg font-semibold text-foreground mt-2 mb-2">{work.title}</h3>
                    {work.lang && <p className="font-body text-xs text-muted-foreground mb-2">{work.lang} · {work.year}</p>}
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{work.description}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.15}>
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`font-body text-sm px-4 py-1.5 rounded-full border transition-colors duration-200 ${
                    active === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-muted-foreground border-border hover:border-primary/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="border-t border-border">
            {filtered?.map((work, i) => (
              <FadeIn key={work.id} delay={i * 0.03}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between py-5 border-b border-border px-2 -mx-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-lg font-medium text-foreground">{work.title}</h3>
                      {work.link && <ExternalLink size={14} className="text-muted-foreground" />}
                    </div>
                    <p className="font-body text-xs text-muted-foreground mt-1">
                      {work.type}{work.lang && ` · ${work.lang}`} · {work.year}
                    </p>
                    <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed max-w-xl">{work.description}</p>
                  </div>
                  <span className="font-body text-xs uppercase tracking-wider text-primary/70 mt-2 sm:mt-1 sm:ml-4 whitespace-nowrap">
                    {work.category}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
