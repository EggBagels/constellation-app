import React from "react";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

// If any of these shadcn components aren’t generated in your project yet,
// you can comment out their import + usage below temporarily.
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import ConstellationBackground from "@/components/ConstellationBackground";

import Home from "./pages/Home";
import Capture from "./pages/Capture";
import Graph from "./pages/Graph";
import NotePage from "./pages/NotePage";
import Search from "./pages/Search";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

import MagicLinkLogin from "@/components/MagicLinkLogin";
import { useAuthSession } from "@/hooks/useAuthSession";
import { supabase } from "@/lib/supabase";

const queryClient = new QueryClient();

/** Public login screen */
function AuthPage() {
  const { session, ready } = useAuthSession();
  if (!ready) return <div className="p-6">Loading…</div>;
  if (session) return <Navigate to="/" replace />;
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl mb-4">Welcome to Constellation</h1>
      <p className="mb-6 opacity-80">Sign in to start building your knowledge graph.</p>
      <MagicLinkLogin />
    </div>
  );
}

/** Protected layout: gates children behind auth and renders a header */
function RequireAuthLayout() {
  const { session, ready } = useAuthSession();
  if (!ready) return <div className="p-6">Loading…</div>;
  if (!session) return <Navigate to="/auth" replace />;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Constellation</h1>
        <button className="btn-cosmic" onClick={() => supabase.auth.signOut()}>
          Sign out
        </button>
      </div>
      <p className="opacity-80 mb-6">
        You’re signed in as <b>{session.user.email}</b>.
      </p>
      {/* Nested protected routes render here */}
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ConstellationBackground />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public route */}
            <Route path="/auth" element={<AuthPage />} />

            {/* Protected routes */}
            <Route element={<RequireAuthLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/capture" element={<Capture />} />
              <Route path="/graph" element={<Graph />} />
              <Route path="/note/:id" element={<NotePage />} />
              <Route path="/search" element={<Search />} />
              <Route path="/account" element={<Account />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}