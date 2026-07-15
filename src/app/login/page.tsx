"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/AuthContext";
import { getErrorMessage } from "@/lib/getErrorMessage";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      router.push("/");
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Login failed. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Welcome!");
      router.push("/");
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Google sign-in failed. Please try again."));
    } finally {
      setGoogleLoading(false);
    }
  };

  const fillDemo = (role: "user" | "admin") => {
    if (role === "admin") {
      setEmail("admin@tournest.com");
      setPassword("admin123");
    } else {
      setEmail("user@tournest.com");
      setPassword("user1234");
    }
  };

  return (
    <section className="mx-auto flex min-h-[75vh] max-w-md flex-col justify-center px-5 py-12">
      <div className="rounded-3xl border border-lagoon/10 bg-surface p-8 shadow-sm">
        <h1 className="font-display text-2xl font-semibold text-charcoal">Welcome back</h1>
        <p className="mt-1 text-sm text-charcoal/60">Log in to manage your travel packages.</p>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-charcoal">Email</label>
            <div className="flex items-center gap-2 rounded-xl border border-lagoon/20 px-3 py-2.5">
              <FiMail className="text-charcoal/40" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-charcoal">Password</label>
            <div className="flex items-center gap-2 rounded-xl border border-lagoon/20 px-3 py-2.5">
              <FiLock className="text-charcoal/40" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-lagoon py-3 text-sm font-semibold text-sand transition hover:bg-lagoon-dark disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-lagoon/10" />
          <span className="text-xs text-charcoal/40">or</span>
          <div className="h-px flex-1 bg-lagoon/10" />
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-lagoon/20 py-2.5 text-sm font-semibold text-charcoal transition hover:bg-lagoon-light disabled:opacity-60"
        >
          <FcGoogle size={18} />
          {googleLoading ? "Signing in..." : "Continue with Google"}
        </button>

        <div className="mt-5 flex gap-2">
          <button
            onClick={() => fillDemo("user")}
            className="w-full rounded-full border border-lagoon/20 py-2 text-xs font-semibold text-lagoon hover:bg-lagoon-light"
          >
            Demo User Login
          </button>
          <button
            onClick={() => fillDemo("admin")}
            className="w-full rounded-full border border-lagoon/20 py-2 text-xs font-semibold text-lagoon hover:bg-lagoon-light"
          >
            Demo Admin Login
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-charcoal/60">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-lagoon hover:text-amber">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
