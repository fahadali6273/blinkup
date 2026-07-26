"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import {
  BadgeCheck,
  Building2,
  Clock3,
  Facebook,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
  Settings,
  Youtube,
} from "lucide-react";
import { db } from "../../../lib/firebase";

interface SettingsForm {
  businessName: string;
  whatsApp: string;
  phone: string;
  adminEmail: string;
  city: string;
  address: string;
  hours: string;
  facebook: string;
  instagram: string;
  youtube: string;
}

const defaultSettings: SettingsForm = {
  businessName: "BlinkUp",
  whatsApp: "+91 74896 73372",
  phone: "+91 74896 73372",
  adminEmail: "info@blinkuphome.com",
  city: "Bhopal",
  address: "Bhopal, Madhya Pradesh, India",
  hours: "Monday-Sunday, 9:00 AM-9:00 PM",
  facebook: "https://www.facebook.com/profile.php?id=61576752742431",
  instagram: "https://www.instagram.com/blinkup.home",
  youtube: "",
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SettingsForm>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const reference = doc(db, "settings", "business");
        const snapshot = await getDoc(reference);

        if (snapshot.exists()) {
          setForm({
            ...defaultSettings,
            ...(snapshot.data() as Partial<SettingsForm>),
          });
        }
      } catch (fetchError) {
        console.error("Error loading settings:", fetchError);
        setMessage({
          type: "error",
          text: "Saved business settings load nahi hui.",
        });
      } finally {
        setLoading(false);
      }
    };

    void fetchSettings();
  }, []);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setMessage(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      await setDoc(
        doc(db, "settings", "business"),
        {
          ...form,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      setMessage({
        type: "success",
        text: "Business settings saved successfully.",
      });
    } catch (saveError) {
      console.error("Error saving settings:", saveError);
      setMessage({
        type: "error",
        text: "Settings save nahi hui. Please retry.",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-72 items-center justify-center gap-3 rounded-[1.75rem] border border-white/[0.08] bg-[#15101d] text-sm text-[#8f8498]">
        <Loader2 size={20} className="animate-spin text-[#8f65f5]" />
        Loading business settings...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[1.75rem] border border-white/[0.08] bg-[#15101d] p-5 sm:p-7">
        <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#9b77f7]">
          <Settings size={14} />
          Business configuration
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-[-0.045em]">
          Keep business details organized.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#9f94a8]">
          Contact information, working hours aur social profiles ka admin
          reference record.
        </p>
      </section>

      {message && (
        <div
          className={`rounded-2xl border p-4 text-sm ${
            message.type === "success"
              ? "border-emerald-300/15 bg-emerald-300/[0.07] text-emerald-200"
              : "border-rose-300/15 bg-rose-300/[0.07] text-rose-200"
          }`}
          role="status"
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-[1.75rem] border border-white/[0.08] bg-[#15101d] p-5 sm:p-7">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#6d3ae6]/15 text-[#b99cff]">
              <Building2 size={22} />
            </span>
            <div>
              <h3 className="text-xl font-bold">Business identity</h3>
              <p className="mt-1 text-xs leading-5 text-[#806f89]">
                Core details used for internal administration.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Field
              icon={<Building2 size={15} />}
              label="Business name"
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              placeholder="BlinkUp"
            />
            <Field
              icon={<MapPin size={15} />}
              label="Service city"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Bhopal"
            />
            <Field
              icon={<Phone size={15} />}
              label="WhatsApp number"
              name="whatsApp"
              value={form.whatsApp}
              onChange={handleChange}
              placeholder="+91 74896 73372"
            />
            <Field
              icon={<Phone size={15} />}
              label="Call number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 74896 73372"
            />
            <Field
              icon={<Mail size={15} />}
              label="Admin email"
              name="adminEmail"
              value={form.adminEmail}
              onChange={handleChange}
              placeholder="info@blinkuphome.com"
              type="email"
            />
            <Field
              icon={<Clock3 size={15} />}
              label="Business hours"
              name="hours"
              value={form.hours}
              onChange={handleChange}
              placeholder="Monday-Sunday, 9 AM-9 PM"
            />
          </div>

          <label className="mt-4 block">
            <span className="mb-2 flex items-center gap-2 text-xs font-bold text-[#c9becf]">
              <MapPin size={15} className="text-[#8f65f5]" />
              Business address
            </span>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              className="field min-h-28 resize-y"
              placeholder="Bhopal, Madhya Pradesh, India"
            />
          </label>
        </section>

        <section className="rounded-[1.75rem] border border-white/[0.08] bg-[#15101d] p-5 sm:p-7">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#806f89]">
              Brand presence
            </p>
            <h3 className="mt-2 text-xl font-bold">Social profiles</h3>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <Field
              icon={<Facebook size={15} />}
              label="Facebook"
              name="facebook"
              value={form.facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
              type="url"
            />
            <Field
              icon={<Instagram size={15} />}
              label="Instagram"
              name="instagram"
              value={form.instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/..."
              type="url"
            />
            <Field
              icon={<Youtube size={15} />}
              label="YouTube"
              name="youtube"
              value={form.youtube}
              onChange={handleChange}
              placeholder="https://youtube.com/..."
              type="url"
            />
          </div>
        </section>

        <div className="flex flex-col justify-between gap-4 rounded-[1.5rem] border border-[#8f65f5]/15 bg-[#6d3ae6]/[0.07] p-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <BadgeCheck
              size={19}
              className="mt-0.5 shrink-0 text-[#b99cff]"
            />
            <p className="max-w-2xl text-xs leading-6 text-[#b8acbf]">
              Ye settings admin record mein save hoti hain. Public website ke
              hardcoded contact details change karne ke liye deployment update
              bhi required hoga.
            </p>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="button-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={17} />
                Save settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-xs font-bold text-[#c9becf]">
        <span className="text-[#8f65f5]">{icon}</span>
        {label}
      </span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="field"
        placeholder={placeholder}
      />
    </label>
  );
}
