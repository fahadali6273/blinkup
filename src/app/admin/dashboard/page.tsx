'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export default function Dashboard() {
  const [leads, setLeads] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [recentWork, setRecentWork] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const leadSnap = await getDocs(collection(db, 'leads'));
      setLeads(leadSnap.size);
      const completeSnap = leadSnap.docs.filter((doc) => doc.data().status === 'Completed');
      setCompleted(completeSnap.length);

      const workSnap = await getDocs(collection(db, 'gallery'));
      setRecentWork(workSnap.size);
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="bg-purple-600 text-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg">Total Leads</h3>
        <p className="text-3xl font-bold mt-2">{leads}</p>
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
  );
}
