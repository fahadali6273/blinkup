'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

interface Lead {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  subService?: string;
  status?: string;
  location?: string;
  address?: string;
  mapLink?: string;
  message?: string;
  source?: string;
  createdAt?: any;
}

type LeadFilter =
  | 'All'
  | 'Today'
  | 'New'
  | 'Pending'
  | 'Contacted'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled';

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<LeadFilter>('All');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      const snapshot = await getDocs(collection(db, 'leads'));

      const leadsData = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Lead[];

      const sorted = leadsData.sort((a, b) => {
        return getLeadTime(b.createdAt) - getLeadTime(a.createdAt);
      });

      setLeads(sorted);
    };

    fetchLeads();
  }, []);

  const getLeadTime = (createdAt: any): number => {
    if (!createdAt) return 0;

    if (createdAt?.seconds) {
      return createdAt.seconds * 1000;
    }

    if (typeof createdAt?.toDate === 'function') {
      return createdAt.toDate().getTime();
    }

    const parsedDate = new Date(createdAt).getTime();
    return Number.isNaN(parsedDate) ? 0 : parsedDate;
  };

  const formatLeadDate = (createdAt: any): string => {
    const time = getLeadTime(createdAt);

    if (!time) return '—';

    return new Date(time).toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isTodayLead = (createdAt: any): boolean => {
    const time = getLeadTime(createdAt);

    if (!time) return false;

    const leadDate = new Date(time);
    const today = new Date();

    return (
      leadDate.getDate() === today.getDate() &&
      leadDate.getMonth() === today.getMonth() &&
      leadDate.getFullYear() === today.getFullYear()
    );
  };

  const cleanPhone = (phone?: string) => {
    return (phone || '').replace(/\D/g, '');
  };

  const getWhatsAppLink = (phone?: string) => {
    const number = cleanPhone(phone);

    if (!number) return '#';

    const indianNumber = number.length === 10 ? `91${number}` : number;
    const text = encodeURIComponent(
      'Hello, this is BlinkUp. We received your service request.'
    );

    return `https://wa.me/${indianNumber}?text=${text}`;
  };

  const getMapLink = (lead?: Lead | null) => {
    if (!lead) return '';

    if (lead.mapLink) return lead.mapLink;

    const address = lead.address || '';
    const match = address.match(/https?:\/\/[^\s|]+/);

    return match?.[0] || '';
  };

  const getLeadSource = (lead: Lead) => {
    if (!lead.source) return 'website';

    return lead.source;
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    await updateDoc(doc(db, 'leads', id), { status: newStatus });

    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id ? { ...lead, status: newStatus } : lead
      )
    );

    setSelectedLead((prev) =>
      prev && prev.id === id ? { ...prev, status: newStatus } : prev
    );
  };

  const getLeadStatus = (lead: Lead) => {
    return lead.status || 'Pending';
  };

  const filterOptions: LeadFilter[] = [
    'All',
    'Today',
    'New',
    'Pending',
    'Contacted',
    'In Progress',
    'Completed',
    'Cancelled',
  ];

  const getFilterCount = (filter: LeadFilter) => {
    if (filter === 'All') return leads.length;

    if (filter === 'Today') {
      return leads.filter((lead) => isTodayLead(lead.createdAt)).length;
    }

    return leads.filter((lead) => getLeadStatus(lead) === filter).length;
  };

  const filtered = leads.filter((lead) => {
    const query = search.toLowerCase();

    const matchesSearch =
      lead.name?.toLowerCase().includes(query) ||
      lead.phone?.toLowerCase().includes(query) ||
      lead.email?.toLowerCase().includes(query) ||
      lead.service?.toLowerCase().includes(query) ||
      lead.subService?.toLowerCase().includes(query) ||
      lead.location?.toLowerCase().includes(query) ||
      lead.address?.toLowerCase().includes(query) ||
      lead.mapLink?.toLowerCase().includes(query) ||
      lead.source?.toLowerCase().includes(query) ||
      lead.status?.toLowerCase().includes(query);

    const matchesFilter =
      activeFilter === 'All'
        ? true
        : activeFilter === 'Today'
        ? isTodayLead(lead.createdAt)
        : getLeadStatus(lead) === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const statusClass = (status?: string) => {
    if (status === 'Completed') return 'bg-green-200 text-green-700';
    if (status === 'In Progress') return 'bg-blue-100 text-blue-700';
    if (status === 'Contacted') return 'bg-purple-100 text-purple-700';
    if (status === 'Cancelled') return 'bg-red-100 text-red-700';
    if (status === 'New') return 'bg-yellow-100 text-yellow-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  const sourceClass = (source?: string) => {
    if (source === 'chatbot') return 'bg-purple-100 text-purple-700';
    if (source === 'contact') return 'bg-blue-100 text-blue-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Leads Management
      </h2>

      <div className="mb-4 flex flex-wrap gap-2">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
              activeFilter === filter
                ? 'bg-purple-600 text-white border-purple-600 shadow'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-purple-50 hover:border-purple-200'
            }`}
          >
            {filter}
            <span
              className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeFilter === filter
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {getFilterCount(filter)}
            </span>
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search by name, mobile, service, location, address, source or status..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <div className="mb-3 text-sm text-gray-500">
        Showing <span className="font-semibold text-gray-700">{filtered.length}</span>{' '}
        of <span className="font-semibold text-gray-700">{leads.length}</span> leads
        {activeFilter !== 'All' && (
          <>
            {' '}for <span className="font-semibold text-purple-700">{activeFilter}</span>
          </>
        )}
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full min-w-[1150px] bg-white">
          <thead>
            <tr className="bg-purple-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">Service</th>
              <th className="p-3">Location</th>
              <th className="p-3">Source</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-6 text-center text-gray-500">
                  No leads found.
                </td>
              </tr>
            ) : (
              filtered.map((lead) => {
                const mapLink = getMapLink(lead);

                return (
                  <tr key={lead.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={() => setSelectedLead(lead)}
                        className="font-semibold text-purple-700 hover:underline"
                      >
                        {lead.name || '—'}
                      </button>
                    </td>

                    <td className="p-3">
                      {lead.phone ? (
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${cleanPhone(lead.phone)}`}
                            className="text-purple-700 font-semibold hover:underline"
                          >
                            {lead.phone}
                          </a>

                          <a
                            href={getWhatsAppLink(lead.phone)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                          >
                            WhatsApp
                          </a>
                        </div>
                      ) : (
                        <span className="text-red-500">Missing</span>
                      )}
                    </td>

                    <td className="p-3">
                      <div>{lead.service || '—'}</div>
                      {lead.subService && (
                        <div className="text-xs text-gray-500">
                          {lead.subService}
                        </div>
                      )}
                    </td>

                    <td className="p-3">
                      <div>{lead.location || '—'}</div>
                      {mapLink && (
                        <a
                          href={mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-200"
                        >
                          Open Map
                        </a>
                      )}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${sourceClass(
                          getLeadSource(lead)
                        )}`}
                      >
                        {getLeadSource(lead)}
                      </span>
                    </td>

                    <td className="p-3">{formatLeadDate(lead.createdAt)}</td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${statusClass(
                          getLeadStatus(lead)
                        )}`}
                      >
                        {getLeadStatus(lead)}
                      </span>
                    </td>

                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedLead(lead)}
                          className="border px-3 py-1 rounded hover:bg-gray-100"
                        >
                          View
                        </button>

                        <select
                          value={getLeadStatus(lead)}
                          onChange={(e) =>
                            handleStatusChange(lead.id, e.target.value)
                          }
                          className="border p-1 rounded"
                        >
                          <option value="New">New</option>
                          <option value="Pending">Pending</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
            <div className="bg-purple-700 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Lead Details</h3>
                <p className="text-sm text-purple-100">
                  {selectedLead.service || 'Service enquiry'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="mb-5 flex flex-wrap gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${sourceClass(
                    getLeadSource(selectedLead)
                  )}`}
                >
                  Source: {getLeadSource(selectedLead)}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClass(
                    getLeadStatus(selectedLead)
                  )}`}
                >
                  Status: {getLeadStatus(selectedLead)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <Detail label="Name" value={selectedLead.name} />
                <Detail label="Mobile" value={selectedLead.phone} />
                <Detail label="Email" value={selectedLead.email} />
                <Detail label="Service" value={selectedLead.service} />
                <Detail label="Sub-service" value={selectedLead.subService} />
                <Detail label="Area / Location" value={selectedLead.location} />
                <Detail label="Date" value={formatLeadDate(selectedLead.createdAt)} />
                <Detail label="Source" value={getLeadSource(selectedLead)} />

                <div className="sm:col-span-2">
                  <p className="text-gray-500 mb-1">Full Address</p>
                  <div className="border rounded-lg p-3 bg-gray-50 whitespace-pre-wrap break-words">
                    {selectedLead.address || '—'}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-gray-500 mb-1">Google Maps Location</p>
                  {getMapLink(selectedLead) ? (
                    <a
                      href={getMapLink(selectedLead)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
                    >
                      Open Customer Location in Google Maps
                    </a>
                  ) : (
                    <div className="border rounded-lg p-3 bg-gray-50 text-gray-500">
                      No map location shared.
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <p className="text-gray-500 mb-1">Message</p>
                  <div className="border rounded-lg p-3 bg-gray-50 min-h-[80px] whitespace-pre-wrap break-words">
                    {selectedLead.message || '—'}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 flex flex-wrap gap-3">
              {selectedLead.phone && (
                <>
                  <a
                    href={`tel:${cleanPhone(selectedLead.phone)}`}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700"
                  >
                    Call Now
                  </a>

                  <a
                    href={getWhatsAppLink(selectedLead.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
                  >
                    WhatsApp
                  </a>
                </>
              )}

              {getMapLink(selectedLead) && (
                <a
                  href={getMapLink(selectedLead)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Open Map
                </a>
              )}

              <select
                value={getLeadStatus(selectedLead)}
                onChange={(e) =>
                  handleStatusChange(selectedLead.id, e.target.value)
                }
                className="border px-3 py-2 rounded-lg"
              >
                <option value="New">New</option>
                <option value="Pending">Pending</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="border px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value?: ReactNode }) {
  return (
    <div>
      <p className="text-gray-500 mb-1">{label}</p>
      <p className="font-semibold text-gray-800 break-words">{value || '—'}</p>
    </div>
  );
}