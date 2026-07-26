import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Which areas of Bhopal do you serve?",
    answer:
      "BlinkUp accepts requests across Bhopal. Share your area or current location and the team will confirm availability for your slot.",
  },
  {
    question: "How is the service price decided?",
    answer:
      "For most repair, painting and renovation work, the requirement is inspected first. The scope and quotation are then shared for approval.",
  },
  {
    question: "Do I need to pay while submitting a request?",
    answer:
      "No payment is required to submit a website request. Any service payment terms should be clearly mentioned in the approved quotation.",
  },
  {
    question: "Can I share photos of the problem?",
    answer:
      "Yes. Submit the request and share photos on WhatsApp with your name and area. It helps the team understand the requirement faster.",
  },
  {
    question: "Can I book for a small repair?",
    answer:
      "Yes. Chhota repair ho ya complete renovation, choose the closest service and briefly explain the issue.",
  },
  {
    question: "How will my visit be confirmed?",
    answer:
      "The BlinkUp team will contact you by call or WhatsApp to confirm the requirement, address and suitable inspection time.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQSection() {
  return (
    <section className="light-panel py-20 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="page-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="section-kicker border-[#6d3ae6]/20 bg-[#6d3ae6]/5 text-[#6d3ae6]">
            <HelpCircle size={13} />
            Quick answers
          </p>
          <h2 className="mt-5 text-4xl font-bold tracking-[-0.05em]">
            Before you book.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-[#6f6676]">
            Straight answers to the questions Bhopal customers usually ask
            before requesting a home visit.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#5a2ebd]"
          >
            Ask another question
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="group rounded-[1.3rem] border border-[#e5deeb] bg-white px-5 py-4 shadow-sm open:border-[#cbb8f5]"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                <span>{faq.question}</span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f1eaff] text-[#6d3ae6] transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-2xl pt-3 text-sm leading-7 text-[#6f6676]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
