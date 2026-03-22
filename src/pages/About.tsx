import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Badge } from "@/components/ui/badge";
import { useSiteContent } from "@/hooks/useSiteContent";

const About = () => {
  const { data: content } = useSiteContent();

  const languages = (content?.about_languages || "English,Spanish,French,Italian,Hungarian,Portuguese").split(",").map((s) => s.trim());
  const expertise = (content?.about_expertise || "Literary Translation,Poetry Translation,Essay & Criticism").split(",").map((s) => s.trim());

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
              <p>{content?.about_bio_1 || ""}</p>
              <p>{content?.about_bio_2 || ""}</p>
              <p>{content?.about_bio_3 || ""}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-14">
              <h2 className="font-heading text-2xl font-medium text-foreground mb-4">My Approach</h2>
              <p className="font-body text-base text-muted-foreground leading-[1.8]">
                {content?.about_approach || ""}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-14">
              <h2 className="font-heading text-2xl font-medium text-foreground mb-4">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <Badge key={lang} variant="secondary" className="font-body text-sm px-4 py-1.5">{lang}</Badge>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-14">
              <h2 className="font-heading text-2xl font-medium text-foreground mb-4">Areas of Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {expertise.map((item) => (
                  <Badge key={item} variant="outline" className="font-body text-sm px-4 py-1.5">{item}</Badge>
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
