'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../../../lib/firebase';

const ADMIN_UID = 'fqGBNsmVbugRMCp8P3zPnwn93V72';

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    if (loggingIn) return;

    setLoggingIn(true);
    setError('');

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // Sirf approved Firebase admin account ko allow karega
      if (credential.user.uid !== ADMIN_UID) {
        await signOut(auth);
        setError('This account is not authorized for BlinkUp Admin.');
        return;
      }

      localStorage.setItem('adminAuth', 'true');
      router.replace('/admin/dashboard');
    } catch (loginError: any) {
      console.error('Admin login error:', loginError);

      const errorCode = loginError?.code || '';

      if (
        errorCode === 'auth/invalid-credential' ||
        errorCode === 'auth/wrong-password' ||
        errorCode === 'auth/user-not-found'
      ) {
        setError('Invalid email or password.');
      } else if (errorCode === 'auth/too-many-requests') {
        setError(
          'Too many failed attempts. Please wait and try again.'
        );
      } else if (errorCode === 'auth/network-request-failed') {
        setError('Network error. Please check your internet connection.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-2xl">
            🔐
          </div>

          <h1 className="text-2xl font-bold text-purple-700">
            BlinkUp Admin
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Secure Firebase administrator login
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-center text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Admin Email
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter Firebase admin email"
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loggingIn}
            className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loggingIn ? 'Signing in...' : 'Secure Login'}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-gray-500">
          Protected Admin Area – BlinkUp © 2026
        </p>
      </div>
    </div>
  );
}


