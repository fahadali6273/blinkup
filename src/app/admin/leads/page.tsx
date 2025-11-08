'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchLeads = async () => {
      const snapshot = await getDocs(collection(db, 'leads'));
      const data = snapshot.docs.map((d) => {
        const lead = d.data();
        // Format timestamp if available
        const createdAt = lead.createdAt?.toDate
          ? lead.createdAt.toDate().toLocaleString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          : '—';
        return { id: d.id, ...lead, createdAt };
      });
      setLeads(data);
    };
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    await updateDoc(doc(db, 'leads', id), { status: newStatus });
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
    );
  };

  const filtered = leads.filter((lead) =>
    lead.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Leads Management</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-purple-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Service</th>
            <th className="p-3">Status</th>
            <th className="p-3">Date Added</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((lead) => (
            <tr key={lead.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{lead.name}</td>
              <td className="p-3">{lead.service}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    lead.status === 'Completed'
                      ? 'bg-green-200 text-green-700'
                      : lead.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {lead.status || 'Pending'}
                </span>
              </td>
              <td className="p-3 text-sm text-gray-600">{lead.createdAt}</td>
              <td className="p-3">
                <select
                  value={lead.status || 'Pending'}
                  onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
