export interface AmcPlan {
  code: "homeCare12" | "homeCare6";
  name: string;
  shortName: string;
  durationMonths: number;
  durationLabel: string;
  listPricePaise: number;
  offerPricePaise: number;
  discountPercent: number;
  badge: string;
  recommended?: boolean;
  benefits: string[];
}

const sharedBenefits = [
  "Minor plumbing, electrical aur light maintenance ke unlimited requests",
  "Eligible minor maintenance ka labour charge included",
  "1 full-home deep cleaning complimentary",
  "1 Diwali light-decoration installation complimentary",
  "150 sq ft tak paint patchwork ka labour included",
  "Priority booking support aur maintenance guidance",
];

export const amcPlans: AmcPlan[] = [
  {
    code: "homeCare12",
    name: "BlinkUp Home AMC - 12 Months",
    shortName: "BlinkUp Home AMC",
    durationMonths: 12,
    durationLabel: "12 months",
    listPricePaise: 1_200_000,
    offerPricePaise: 960_000,
    discountPercent: 20,
    badge: "Best value · 20% launch offer",
    recommended: true,
    benefits: sharedBenefits,
  },
  {
    code: "homeCare6",
    name: "BlinkUp Home AMC - 6 Months",
    shortName: "BlinkUp Home AMC Lite",
    durationMonths: 6,
    durationLabel: "6 months",
    listPricePaise: 650_000,
    offerPricePaise: 520_000,
    discountPercent: 20,
    badge: "Flexible start · 20% launch offer",
    benefits: sharedBenefits,
  },
];

export const amcTerms = [
  "Plan ek registered residential home aur BlinkUp ke eligible Bhopal service areas ke liye valid hai.",
  "Unlimited requests fair-use policy, technician availability aur eligible minor-maintenance scope par apply hoti hain.",
  "Material, replacement parts, paint, decoration lights aur consumables customer ke charge par honge.",
  "Major civil work, concealed leakage, complete rewiring, appliance repair, scaffolding aur full-house painting included nahi hain.",
  "150 sq ft paint patchwork mein labour included hai; paint aur material alag se lagega.",
  "Diwali decoration benefit mein customer ki lights install karne ka labour ek baar included hai.",
  "Activation se pehle BlinkUp team home size, address, work scope aur plan eligibility confirm karegi.",
];

export function formatAmcPrice(pricePaise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(pricePaise / 100);
}
