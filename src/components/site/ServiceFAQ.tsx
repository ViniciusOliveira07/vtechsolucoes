import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Events } from "@/lib/analytics";

export type FAQItem = { q: string; a: string };

interface ServiceFAQProps {
  items: FAQItem[];
  serviceSlug: string;
}

export function ServiceFAQ({ items, serviceSlug }: ServiceFAQProps) {
  return (
    <Accordion type="single" collapsible className="w-full divide-y divide-border-strong">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className="border-b-0 border-t border-border-strong first:border-t-0"
        >
          <AccordionTrigger
            onClick={() => Events.faqOpen(item.q, serviceSlug)}
            className="py-[clamp(0.55rem,2vh,1.5rem)] text-left text-[0.9375rem] font-medium tracking-tight text-foreground hover:no-underline sm:text-lg"
          >
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="pb-[clamp(0.75rem,2.4vh,1.5rem)] text-sm leading-relaxed text-muted-foreground sm:text-base">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
