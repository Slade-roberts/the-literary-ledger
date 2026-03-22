import { useState } from "react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { ExternalLink } from "lucide-react";

type Category = "All" | "Translations" | "Writing" | "Publications" | "Editorial";

interface Work {
  title: string;
  category: Category;
  type: string;
  lang?: string;
  year: string;
  description: string;
  link?: string;
  featured?: boolean;
}

const works: Work[] = [
  {
    title: "The Garden of Forking Paths",
    category: "Translations",
    type: "Novel",
    lang: "Spanish → English",
    year: "2024",
    description: "A complete translation of this labyrinthine masterwork, published by Meridian Press. Praised for its fidelity to the original's layered ambiguity.",
    featured: true,
  },
  {
    title: "Collected Poems of M. Varga",
    category: "Translations",
    type: "Poetry Collection",
    lang: "Hungarian → English",
    year: "2023",
    description: "A bilingual edition of Varga's celebrated late poems, bringing her spare, luminous verse to English readers for the first time.",
    featured: true,
  },
  {
    title: "On Silence and Snow",
    category: "Writing",
    type: "Essay",
    year: "2023",
    description: "A meditation on winter landscapes in Scandinavian literature, published in The Fallow Review.",
  },
  {
    title: "Reading Between Borders",
    category: "Writing",
    type: "Criticism",
    year: "2022",
    description: "An essay on the politics and poetics of literary translation in post-colonial contexts.",
  },
  {
    title: "Voices from the Periphery",
    category: "Publications",
    type: "Anthology",
    lang: "Multiple → English",
    year: "2022",
    description: "Co-edited anthology of translated short fiction from underrepresented European literatures.",
    featured: true,
  },
  {
    title: "The Cartographer's Daughter",
    category: "Translations",
    type: "Short Fiction",
    lang: "Portuguese → English",
    year: "2021",
    description: "Translation of three interconnected stories by Ana Leitão, published in Granta.",
  },
  {
    title: "Quarterly Review: World Literature Today",
    category: "Editorial",
    type: "Editorial Project",
    year: "2021",
    description: "Guest editor for a special issue on contemporary Central European poetry in translation.",
  },
  {
    title: "Letters from the Interior",
    category: "Translations",
    type: "Correspondence",
    lang: "French → English",
    year: "2020",
    description: "A curated selection of literary correspondence between two mid-century French writers, with commentary.",
  },
];

const categories: Category[] = ["All", "Translations", "Writing", "Publications", "Editorial"];

const Portfolio = () => {
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? works : works.filter((w) => w.category === active);
  const featured = works.filter((w) => w.featured);

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <FadeIn>
            <p className="font-body text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Portfolio</p>
            <h1 className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-6">
              Selected Works
            </h1>
            <p className="font-body text-base text-muted-foreground leading-relaxed max-w-2xl mb-12">
              A selection of translations, essays, editorial projects, and published work spanning multiple languages and literary forms.
            </p>
          </FadeIn>

          {/* Featured */}
          <FadeIn delay={0.1}>
            <h2 className="font-heading text-2xl font-medium text-foreground mb-6">Featured</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {featured.map((work) => (
                <div
                  key={work.title}
                  className="p-6 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors duration-300"
                >
                  <span className="font-body text-xs uppercase tracking-wider text-primary">{work.type}</span>
                  <h3 className="font-heading text-lg font-semibold text-foreground mt-2 mb-2">{work.title}</h3>
                  {work.lang && (
                    <p className="font-body text-xs text-muted-foreground mb-2">{work.lang} · {work.year}</p>
                  )}
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{work.description}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Filter */}
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

          {/* List */}
          <div className="border-t border-border">
            {filtered.map((work, i) => (
              <FadeIn key={work.title} delay={i * 0.03}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between py-5 border-b border-border px-2 -mx-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-lg font-medium text-foreground">{work.title}</h3>
                      {work.link && <ExternalLink size={14} className="text-muted-foreground" />}
                    </div>
                    <p className="font-body text-xs text-muted-foreground mt-1">
                      {work.type}{work.lang && ` · ${work.lang}`} · {work.year}
                    </p>
                    <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed max-w-xl">
                      {work.description}
                    </p>
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
