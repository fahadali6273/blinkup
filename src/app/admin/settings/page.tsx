'use client'

import { useState } from 'react'

export default function AdminSettingsPage() {
  const [whatsApp, setWhatsApp] = useState('+91 00000 00000')
  const [hours, setHours] = useState('Mon–Sun 9:00 AM – 9:00 PM')
  const [message, setMessage] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: Save settings to Firestore or environment variables
    setMessage('Settings saved (not persisted in this demo).')
  }

  return (
    <div className="space-y-6 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1" htmlFor="whatsApp">
            WhatsApp Number
          </label>
          <input
            id="whatsApp"
            type="text"
            value={whatsApp}
            onChange={(e) => setWhatsApp(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1" htmlFor="hours">
            Business Hours
          </label>
          <input
            id="hours"
            type="text"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded hover:bg-primary-dark"
        >
          Save Settings
        </button>
        {message && <p className="text-sm text-gray-600">{message}</p>}
      </form>
    </div>
  )
}