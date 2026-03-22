import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { BookOpen, Pen, Search, FileText, Globe } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useServices, useSiteContent } from "@/hooks/useSiteContent";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = { BookOpen, Pen, Search, FileText, Globe };

const processSteps = [
  { step: "01", title: "Inquiry", description: "Reach out with details about your project, timeline, and goals." },
  { step: "02", title: "Review", description: "I review the source material and discuss scope, approach, and fit." },
  { step: "03", title: "Proposal", description: "A clear proposal with timeline, deliverables, and fees." },
  { step: "04", title: "Delivery", description: "Careful work, open communication, and a polished final text." },
];

const faqs = [
  { question: "What languages do you translate from?", answer: "I translate primarily from Spanish, French, Italian, Hungarian, and Portuguese into English." },
  { question: "How do you price your work?", answer: "Pricing depends on the type of project, length, complexity, and timeline. I provide a detailed quote after reviewing the source material." },
  { question: "Do you work with self-published authors?", answer: "Yes. I work with independent authors, small presses, literary journals, and cultural organizations of all sizes." },
  { question: "What is your typical turnaround time?", answer: "This varies by project scope. A short story translation might take two to four weeks; a full-length novel, several months." },
];

const Services = () => {
  const { data: services } = useServices();
  const { data: content } = useSiteContent();

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <FadeIn>
            <p className="font-body text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Services</p>
            <h1 className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-6">How I Can Help</h1>
            <p className="font-body text-base text-muted-foreground leading-relaxed max-w-2xl mb-14">
              {content?.services_intro || "I offer a range of literary and editorial services."}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {services?.map((service, i) => {
              const Icon = iconMap[service.icon] || BookOpen;
              return (
                <FadeIn key={service.id} delay={i * 0.08}>
                  <div className="p-8 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors duration-300 h-full">
                    <Icon size={26} className="text-primary mb-4" />
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-3">{service.title}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn>
            <h2 className="font-heading text-3xl font-medium text-foreground mb-10 text-center">Process</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {processSteps.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.1}>
                <div className="text-center">
                  <span className="font-heading text-3xl font-bold text-primary/30">{step.step}</span>
                  <h3 className="font-heading text-lg font-semibold text-foreground mt-2 mb-2">{step.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="max-w-2xl mx-auto">
              <h2 className="font-heading text-3xl font-medium text-foreground mb-8 text-center">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="font-heading text-base font-medium text-foreground text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
