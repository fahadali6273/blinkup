import type { Service } from '../data/services';

interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  const Icon = service.icon;
  return (
    <div className="p-5 bg-gradient-to-r from-primary-light via-white to-primary-light border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition flex flex-col">
      {/* Icon & Title */}
      <div className="flex items-center space-x-3 mb-3">
        <Icon className="h-8 w-8 text-primary-dark" />
        <h3 className="text-xl font-semibold">{service.name}</h3>
      </div>
      {/* Description */}
      <p className="text-sm text-gray-600 flex-grow">{service.description}</p>
      {/* CTA */}
      <a
        href={`/lead?service=${encodeURIComponent(service.name)}`}
        className="mt-4 self-start bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-dark transition"
      >
        Book Now
      </a>
    </div>
  );
}
