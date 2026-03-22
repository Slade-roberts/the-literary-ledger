import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Badge } from "@/components/ui/badge";

const languages = ["English", "Spanish", "French", "Italian", "Hungarian", "Portuguese"];
const expertise = [
  "Literary Translation",
  "Poetry Translation",
  "Essay & Criticism",
  "Editing & Proofreading",
  "Manuscript Review",
  "Cultural Localization",
  "Publishing Consultation",
];

const About = () => {
  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <FadeIn>
            <p className="font-body text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">About</p>
            <h1 className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-8">
              A life shaped by language
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="prose-custom space-y-5 font-body text-base text-muted-foreground leading-[1.8]">
              <p>
                I am a literary translator, writer, and editor with over a decade of experience working between languages. My practice is rooted in a deep love of literature and a belief that translation is both an art and an act of cultural generosity.
              </p>
              <p>
                I have translated novels, short fiction, poetry, and essays from several European languages into English, with work published in journals and by independent presses. I approach each text with careful attention to voice, rhythm, and context — seeking not just accuracy, but resonance.
              </p>
              <p>
                Beyond translation, I write literary criticism and essays, and I offer editorial services to authors and publishers who value precision and a literary sensibility. I have collaborated with cultural institutions, literary festivals, and publishing houses across Europe and the Americas.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-14">
              <h2 className="font-heading text-2xl font-medium text-foreground mb-4">
                My Approach
              </h2>
              <p className="font-body text-base text-muted-foreground leading-[1.8]">
                Every text is a world. My work as a translator begins with deep reading — understanding not just what is said, but how it sounds, what it withholds, and what echoes beneath the surface. I aim to create translations that feel like original works in the target language, honoring the author's intent while allowing the text to breathe in its new home.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-14">
              <h2 className="font-heading text-2xl font-medium text-foreground mb-4">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <Badge key={lang} variant="secondary" className="font-body text-sm px-4 py-1.5">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-14">
              <h2 className="font-heading text-2xl font-medium text-foreground mb-4">Areas of Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {expertise.map((item) => (
                  <Badge key={item} variant="outline" className="font-body text-sm px-4 py-1.5">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default About;
