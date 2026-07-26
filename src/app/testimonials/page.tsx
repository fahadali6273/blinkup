import type { Metadata } from "next";
import { BadgeCheck, MessageSquareHeart, ShieldCheck } from "lucide-react";
import ReviewSubmissionForm from "../../components/ReviewSubmissionForm";
import TestimonialsSection from "../../components/TestimonialsSection";

export const metadata: Metadata = {
  title: "Customer Reviews | BlinkUp Home Services Bhopal",
  description:
    "Read BlinkUp home-service customer experiences in Bhopal and submit your verified feedback for painting, repairs, cleaning and more.",
  alternates: {
    canonical: "/testimonials",
  },
};

export default function TestimonialsPage() {
  return (
    <div className="bg-[#15101d] pb-24 pt-10">
      <TestimonialsSection showAll />
      <section className="page-shell scroll-mt-24" id="share-review">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="app-gradient-soft rounded-[2rem] p-7 sm:p-9">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15">
              <MessageSquareHeart size={26} />
            </span>
            <p className="eyebrow mt-8 text-[#eadfff]">Your voice matters</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">
              Good, average ya improvement needed - honestly batayein.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#e6dcf8]">
              Aapka feedback BlinkUp ko better banata hai aur Bhopal customers
              ko right service choose karne mein help karta hai.
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-3 rounded-2xl bg-black/10 p-4">
                <BadgeCheck size={19} className="mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Booking verification</p>
                  <p className="mt-1 text-xs leading-5 text-[#e6dcf8]">
                    Phone number se sirf service booking match ki jayegi.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-black/10 p-4">
                <ShieldCheck size={19} className="mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Privacy protected</p>
                  <p className="mt-1 text-xs leading-5 text-[#e6dcf8]">
                    Public review mein mobile number kabhi show nahi hoga.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ReviewSubmissionForm />
        </div>
      </section>
    </div>
  );
}
