'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

interface Lead {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  subService?: string;
  location?: string;
  address?: string;
  status?: string;
  createdAt?: any;
}

export default function Dashboard() {
  const [leads, setLeads] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);
  const [recentWork, setRecentWork] = useState(0);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leadSnap = await getDocs(collection(db, 'leads'));

        const leadsData = leadSnap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as Lead[];

        setLeads(leadsData.length);

        const completedLeads = leadsData.filter(
          (lead) => lead.status === 'Completed'
        );

        const pendingLeads = leadsData.filter(
          (lead) => lead.status !== 'Completed'
        );

        setCompleted(completedLeads.length);
        setPending(pendingLeads.length);

        const sortedRecentLeads = leadsData
          .sort((a, b) => getLeadTime(b.createdAt) - getLeadTime(a.createdAt))
          .slice(0, 8);

        setRecentLeads(sortedRecentLeads);

        const workSnap = await getDocs(collection(db, 'gallery'));
        setRecentWork(workSnap.size);
      } catch (error) {
        console.error('Dashboard data fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-purple-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg">Total Leads</h3>
          <p className="text-3xl font-bold mt-2">{leads}</p>
        </div>

        <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg">Pending / Active</h3>
          <p className="text-3xl font-bold mt-2">{pending}</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg">Completed</h3>
          <p className="text-3xl font-bold mt-2">{completed}</p>
        </div>

        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg">Recent Works</h3>
          <p className="text-3xl font-bold mt-2">{recentWork}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-5 border-b flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Recent Leads</h2>
            <p className="text-sm text-gray-500">
              Latest customer enquiries from website forms
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-purple-100 text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Mobile</th>
                <th className="p-3">Service</th>
                <th className="p-3">Location</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">
                    Loading leads...
                  </td>
                </tr>
              ) : recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">
                    No leads found.
                  </td>
                </tr>
              ) : (
                recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-medium">{lead.name || '—'}</td>

                    <td className="p-3">
                      {lead.phone ? (
                        <a
                          href={`tel:${lead.phone}`}
                          className="text-purple-700 font-semibold hover:underline"
                        >
                          {lead.phone}
                        </a>
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
                      {lead.location || lead.address || '—'}
                    </td>

                    <td className="p-3">{formatLeadDate(lead.createdAt)}</td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          lead.status === 'Completed'
                            ? 'bg-green-200 text-green-700'
                            : lead.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-700'
                            : lead.status === 'New'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {lead.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}