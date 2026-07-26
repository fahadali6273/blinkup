import {
  Armchair,
  Bolt,
  Boxes,
  Building2,
  Cctv,
  Fan,
  Hammer,
  LampCeiling,
  PaintRoller,
  PanelsTopLeft,
  PlugZap,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Wrench,
  type LucideProps,
} from "lucide-react";
import type { ServiceIconName } from "../data/serviceCatalog";

const iconMap = {
  paint: PaintRoller,
  plumbing: Wrench,
  electrical: PlugZap,
  carpentry: Hammer,
  renovation: Building2,
  interior: Armchair,
  wall: PanelsTopLeft,
  moving: Boxes,
  cleaning: Sparkles,
  ac: Fan,
  appliance: Bolt,
  security: Cctv,
  smart: ShieldCheck,
  decor: SprayCan,
  ceiling: LampCeiling,
} satisfies Record<ServiceIconName, React.ComponentType<LucideProps>>;

interface ServiceIconProps extends LucideProps {
  name: ServiceIconName;
}

export default function ServiceIcon({ name, ...props }: ServiceIconProps) {
  const Icon = iconMap[name];
  return <Icon {...props} />;
}
