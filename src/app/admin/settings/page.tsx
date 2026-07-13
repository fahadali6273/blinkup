'use client'

import { useEffect, useState } from 'react'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../../lib/firebase'

interface SettingsForm {
  businessName: string
  whatsApp: string
  phone: string
  adminEmail: string
  city: string
  address: string
  hours: string
  facebook: string
  instagram: string
  youtube: string
}

const defaultSettings: SettingsForm = {
  businessName: 'BlinkUp',
  whatsApp: '+91 00000 00000',
  phone: '+91 00000 00000',
  adminEmail: '',
  city: 'Bhopal',
  address: 'Bhopal, Madhya Pradesh, India',
  hours: 'Mon–Sun 9:00 AM – 9:00 PM',
  facebook: '',
  instagram: '',
  youtube: '',
}

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SettingsForm>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const ref = doc(db, 'settings', 'business')
        const snap = await getDoc(ref)

        if (snap.exists()) {
          setForm({
            ...defaultSettings,
            ...(snap.data() as Partial<SettingsForm>),
          })
        }
      } catch (error) {
        console.error('Error loading settings:', error)
        setMessage('Failed to load settings.')
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const ref = doc(db, 'settings', 'business')

      await setDoc(
        ref,
        {
          ...form,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      )

      setMessage('✅ Settings saved successfully.')
    } catch (error) {
      console.error('Error saving settings:', error)
      setMessage('❌ Failed to save settings. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-500">Loading settings...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Website Settings
        </h1>
        <p className="text-gray-500 mt-1">
          Manage BlinkUp business details used across website and admin panel.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field
            label="Business Name"
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            placeholder="BlinkUp"
          />

          <Field
            label="Service City"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Bhopal"
          />

          <Field
            label="WhatsApp Number"
            name="whatsApp"
            value={form.whatsApp}
            onChange={handleChange}
            placeholder="+91 98765 43210"
          />

          <Field
            label="Website Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
          />

          <Field
            label="Admin Email"
            name="adminEmail"
            value={form.adminEmail}
            onChange={handleChange}
            placeholder="info@blinkup.in"
            type="email"
          />

          <Field
            label="Business Hours"
            name="hours"
            value={form.hours}
            onChange={handleChange}
            placeholder="Mon–Sun 9:00 AM – 9:00 PM"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Business Address
          </label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Bhopal, Madhya Pradesh, India"
          />
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Social Links
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Field
              label="Facebook"
              name="facebook"
              value={form.facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
            />

            <Field
              label="Instagram"
              name="instagram"
              value={form.instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/..."
            />

            <Field
              label="YouTube"
              name="youtube"
              value={form.youtube}
              onChange={handleChange}
              placeholder="https://youtube.com/..."
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>

          {message && (
            <p
              className={`text-sm font-medium ${
                message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </form>

      <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-sm text-yellow-800">
        <strong>Note:</strong> Admin email yahan save ho jayega, lekin actual
        email notification bhejne ke liye Gmail/App Password aur Vercel
        Environment Variables baad me setup karne honge.
      </div>
    </div>
  )
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div>
      <label className="block font-medium mb-1 text-gray-700" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder={placeholder}
      />
    </div>
  )
}