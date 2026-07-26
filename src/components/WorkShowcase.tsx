import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera, MapPin } from "lucide-react";

const workItems = [
  {
    title: "Interior repainting",
    category: "Painting",
    location: "Bhopal",
    image: "/images/painting-care.jpg",
    alt: "Professional interior wall painting in a Bhopal apartment",
    className: "sm:col-span-2 lg:row-span-2",
  },
  {
    title: "Safe electrical check",
    category: "Electrical",
    location: "Bhopal",
    image: "/images/electrical-care.jpg",
    alt: "Electrician testing a residential switchboard",
    className: "",
  },
  {
    title: "Kitchen plumbing repair",
    category: "Plumbing",
    location: "Bhopal",
    image: "/images/plumbing-care.jpg",
    alt: "Plumber repairing a kitchen sink connection",
    className: "",
  },
  {
    title: "Sofa deep cleaning",
    category: "Cleaning",
    location: "Bhopal",
    image: "/images/cleaning-care.jpg",
    alt: "Professional sofa deep cleaning service",
    className: "sm:col-span-2 lg:col-span-1",
  },
];

export default function WorkShowcase() {
  return (
    <section className="bg-[#15101d] py-20 sm:py-28">
      <div className="page-shell">
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="section-kicker">
              <Camera size={13} />
              Service in action
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-[-0.045em] sm:text-5xl">
              See the care behind the work.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#bdb2c5]">
              A clear process, tidy setup and the right tools matter as much as
              the final result.
            </p>
          </div>
          <Link
            href="/gallery"
            className="button-secondary self-start px-5 text-sm sm:self-auto"
          >
            View gallery
            <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="grid auto-rows-[17rem] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workItems.map((item) => (
            <article
              key={item.title}
              className={`group relative overflow-hidden rounded-[1.6rem] border border-white/10 ${item.className}`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#130e19]/95 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#c3aaff]">
                    {item.category}
                  </p>
                  <h3 className="mt-1 font-bold text-white">{item.title}</h3>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#e5dce9]">
                  <MapPin size={12} />
                  {item.location}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
