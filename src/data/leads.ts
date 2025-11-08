export interface Lead {
  id: string
  name: string
  phone: string
  service: string
  city: string
  date: string
  status: 'New' | 'Contacted' | 'In Progress' | 'Completed'
}

export const leads: Lead[] = [
  {
    id: 'l1',
    name: 'Amit Sharma',
    phone: '+91 9876543210',
    service: 'Painting',
    city: 'Delhi',
    date: '2025-03-05',
    status: 'New',
  },
  {
    id: 'l2',
    name: 'Seema Gupta',
    phone: '+91 9123456780',
    service: 'Plumbing',
    city: 'Mumbai',
    date: '2025-03-06',
    status: 'Contacted',
  },
  {
    id: 'l3',
    name: 'Rahul Verma',
    phone: '+91 9012345678',
    service: 'Electrician',
    city: 'Bangalore',
    date: '2025-03-07',
    status: 'In Progress',
  },
]