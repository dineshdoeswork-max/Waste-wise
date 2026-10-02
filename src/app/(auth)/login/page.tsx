"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Leaf, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Truck, 
  ShieldCheck, 
  Home, 
  RefreshCw 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { Role } from "@/types";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  
  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<Role>("citizen");
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null);

  const resetFormState = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setUnconfirmedEmail(null);
    setResendStatus(null);
  };

  const handleModeSwitch = (newMode: "signin" | "signup") => {
    setMode(newMode);
    resetFormState();
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFormState();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        if (error.message.toLowerCase().includes("email not confirmed")) {
          setUnconfirmedEmail(email.trim());
          setErrorMessage(
            "Your email has not been confirmed yet. Please verify your inbox or spam folder, or use the quick resend button below."
          );
        } else if (error.message.toLowerCase().includes("invalid login credentials")) {
          setErrorMessage("Invalid email or password. Please check your credentials or create a new account.");
        } else {
          setErrorMessage(error.message);
        }
        setLoading(false);
        return;
      }

      if (data?.user) {
        const userRole: Role = data.user.user_metadata?.role || "citizen";
        setSuccessMessage("Signed in successfully! Redirecting...");
        setTimeout(() => {
          router.push(`/${userRole}`);
        }, 600);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "An unexpected error occurred during sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFormState();

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter them.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: fullName.trim(),
            role: role,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      if (data?.session) {
        setSuccessMessage(`Account created successfully! Welcome to WasteWise. Redirecting to your dashboard...`);
        setTimeout(() => {
          router.push(`/${role}`);
        }, 1000);
      } else if (data?.user) {
        setSuccessMessage(
          `Account created for ${email}! A confirmation link has been sent to your email. Please check your inbox to confirm your account.`
        );
        setUnconfirmedEmail(email.trim());
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (!unconfirmedEmail) return;
    setResending(true);
    setResendStatus(null);

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: unconfirmedEmail,
      });

      if (error) {
        setResendStatus(`Could not resend: ${error.message}`);
      } else {
        setResendStatus("Confirmation email resent successfully! Check your inbox.");
      }
    } catch (err: any) {
      setResendStatus("Failed to resend confirmation email.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-200">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-3 group">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200 transition-colors">
              <Leaf className="h-7 w-7" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">WasteWise</span>
          </Link>
          <h2 className="text-2xl font-bold text-slate-900">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {mode === "signin" 
              ? "Sign in to manage and report municipal waste" 
              : "Join WasteWise to help keep our cities clean and green"}
          </p>
        </div>

        {/* Tab switchers */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-sm font-semibold">
          <button
            type="button"
            onClick={() => handleModeSwitch("signin")}
            className={`py-2 rounded-lg transition-all ${
              mode === "signin" 
                ? "bg-white text-emerald-700 shadow-sm" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => handleModeSwitch("signup")}
            className={`py-2 rounded-lg transition-all ${
              mode === "signup" 
                ? "bg-white text-emerald-700 shadow-sm" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium">{errorMessage}</p>
              {unconfirmedEmail && (
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={handleResendConfirmation}
                    disabled={resending}
                    className="text-xs font-semibold text-red-700 hover:underline inline-flex items-center gap-1"
                  >
                    <RefreshCw className={`w-3 h-3 ${resending ? "animate-spin" : ""}`} />
                    {resending ? "Resending..." : "Resend Confirmation Email"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Success notification */}
        {successMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-800 text-sm">
            <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-600 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium">{successMessage}</p>
              {unconfirmedEmail && (
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={handleResendConfirmation}
                    disabled={resending}
                    className="text-xs font-semibold text-emerald-700 hover:underline inline-flex items-center gap-1"
                  >
                    <RefreshCw className={`w-3 h-3 ${resending ? "animate-spin" : ""}`} />
                    {resending ? "Resending..." : "Resend email confirmation"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {resendStatus && (
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs font-medium">
            {resendStatus}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={mode === "signin" ? handleSignIn : handleSignUp} className="space-y-4">
          
          {/* Sign Up: Full Name */}
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm transition-all"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm transition-all"
              />
            </div>
          </div>

          {/* Sign Up: Role Selection */}
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Account Type / Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("citizen")}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    role === "citizen"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500 ring-offset-1 font-semibold"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Home className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs">Citizen</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("collector")}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    role === "collector"
                      ? "border-blue-600 bg-blue-50 text-blue-800 ring-2 ring-blue-500 ring-offset-1 font-semibold"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="text-xs">Collector</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    role === "admin"
                      ? "border-purple-600 bg-purple-50 text-purple-800 ring-2 ring-purple-500 ring-offset-1 font-semibold"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 text-purple-600" />
                  <span className="text-xs">Admin</span>
                </button>
              </div>
            </div>
          )}

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Password
              </label>
              {mode === "signin" && (
                <button
                  type="button"
                  onClick={() => alert("Password reset instructions have been forwarded to administrator.")}
                  className="text-xs font-medium text-emerald-600 hover:text-emerald-500"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Sign Up: Confirm Password */}
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm transition-all"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-sm transition-all mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                {mode === "signin" ? "Signing In..." : "Creating Account..."}
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                {mode === "signin" ? "Sign In" : "Create Account"}
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>

        {/* Switch mode prompt */}
        <div className="text-center text-sm text-slate-600 pt-1">
          {mode === "signin" ? (
            <p>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => handleModeSwitch("signup")}
                className="font-semibold text-emerald-600 hover:text-emerald-500 hover:underline"
              >
                Sign up as Citizen or Collector
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => handleModeSwitch("signin")}
                className="font-semibold text-emerald-600 hover:text-emerald-500 hover:underline"
              >
                Sign in here
              </button>
            </p>
          )}
        </div>

        {/* Quick Demo Access */}
        <div className="mt-6 border-t border-slate-200 pt-6">
          <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Instant Demo Dashboards
          </p>
          <div className="grid grid-cols-3 gap-2">
            <Link href="/citizen" className="w-full">
              <Button variant="outline" type="button" className="w-full text-xs py-2 px-1 border-slate-200 hover:bg-emerald-50 hover:text-emerald-700">
                Citizen
              </Button>
            </Link>
            <Link href="/collector" className="w-full">
              <Button variant="outline" type="button" className="w-full text-xs py-2 px-1 border-slate-200 hover:bg-blue-50 hover:text-blue-700">
                Collector
              </Button>
            </Link>
            <Link href="/admin" className="w-full">
              <Button variant="outline" type="button" className="w-full text-xs py-2 px-1 border-slate-200 hover:bg-purple-50 hover:text-purple-700">
                Admin
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
