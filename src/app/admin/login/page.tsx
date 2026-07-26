"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { auth } from "../../../lib/firebase";

const ADMIN_UID = "fqGBNsmVbugRMCp8P3zPnwn93V72";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loggingIn) return;

    setLoggingIn(true);
    setError("");

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      if (credential.user.uid !== ADMIN_UID) {
        await signOut(auth);
        setError("This account is not authorized for BlinkUp Admin.");
        return;
      }

      localStorage.setItem("adminAuth", "true");
      router.replace("/admin/dashboard");
      router.refresh();
    } catch (loginError: any) {
      console.error("Admin login error:", loginError);
      const errorCode = loginError?.code || "";

      if (
        errorCode === "auth/invalid-credential" ||
        errorCode === "auth/wrong-password" ||
        errorCode === "auth/user-not-found"
      ) {
        setError("Invalid admin email or password.");
      } else if (errorCode === "auth/too-many-requests") {
        setError("Too many attempts. Please wait and try again.");
      } else if (errorCode === "auth/network-request-failed") {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoggingIn(false);
    }
  }

  return (
    <div className="relative grid min-h-screen overflow-hidden bg-[#0e0a13] px-4 py-8 text-white lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
      <div className="pointer-events-none absolute left-[-10rem] top-[-12rem] h-[34rem] w-[34rem] rounded-full bg-[#6d3ae6]/20 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-[-15rem] right-[-12rem] h-[38rem] w-[38rem] rounded-full bg-[#8f65f5]/10 blur-[150px]" />

      <section className="relative hidden min-h-[calc(100vh-4rem)] flex-col justify-between overflow-hidden rounded-[2.25rem] border border-white/[0.08] bg-[#15101d] p-10 lg:flex xl:p-14">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/images/blinkup-app-logo.png"
              alt=""
              width={52}
              height={52}
              className="h-[3.25rem] w-[3.25rem] rounded-2xl ring-1 ring-white/10"
              priority
            />
            <span>
              <span className="block text-2xl font-bold tracking-[-0.04em]">
                BlinkUp
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8f65f5]">
                Operations workspace
              </span>
            </span>
          </Link>

          <div className="mt-24 max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#8f65f5]/20 bg-[#6d3ae6]/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.13em] text-[#b99cff]">
              <ShieldCheck size={14} />
              Authorized access only
            </p>
            <h1 className="mt-6 text-5xl font-bold leading-[1.04] tracking-[-0.055em] xl:text-6xl">
              Leads se completion tak, sab ek jagah.
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-[#a99dad]">
              Customer enquiries manage karein, project gallery update karein
              aur verified feedback ko website par publish karein.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {["Lead tracking", "Gallery uploads", "Review moderation"].map(
            (item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4"
              >
                <span className="mb-3 block h-1.5 w-8 rounded-full bg-[#8f65f5]" />
                <p className="text-xs font-semibold text-[#c9becf]">{item}</p>
              </div>
            )
          )}
        </div>
      </section>

      <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-0 py-8 sm:px-8 lg:px-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/images/blinkup-app-logo.png"
                alt=""
                width={46}
                height={46}
                className="h-[2.875rem] w-[2.875rem] rounded-2xl"
                priority
              />
              <span className="text-xl font-bold">BlinkUp Admin</span>
            </Link>
          </div>

          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#6d3ae6]/15 text-[#b99cff] ring-1 ring-[#8f65f5]/20">
            <LockKeyhole size={25} />
          </span>
          <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.15em] text-[#8f65f5]">
            Secure administrator login
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.045em]">
            Welcome back, Fahad.
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#9f94a8]">
            Sign in with the approved BlinkUp Firebase administrator account.
          </p>

          {error && (
            <div
              className="mt-6 rounded-2xl border border-rose-300/15 bg-rose-300/[0.07] p-4 text-sm text-rose-200"
              role="alert"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-7 space-y-4">
            <label className="block">
              <span className="mb-2 block text-xs font-bold text-[#c9becf]">
                Admin email
              </span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                placeholder="Enter approved email"
                className="field"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold text-[#c9becf]">
                Password
              </span>
              <span className="relative block">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  placeholder="Enter password"
                  className="field pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl text-[#8f8498] transition hover:bg-white/[0.05] hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>

            <button
              type="submit"
              disabled={loggingIn}
              className="button-primary mt-2 w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loggingIn ? "Checking access..." : "Open admin workspace"}
              {!loggingIn && <ArrowRight size={18} />}
            </button>
          </form>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#9f94a8] transition hover:text-white"
          >
            <ArrowLeft size={15} />
            Back to BlinkUp website
          </Link>
        </div>
      </section>
    </div>
  );
}
