/**
 * Authentication Guard Component
 * Protects routes that require authentication
 */

import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getSupabaseClient } from '../utils/supabaseClient';
import { LoadingState } from './SafeStateUI';
import { logWarning } from '../utils/errorLogger';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
  allowedRoles?: string[];
}

/**
 * Component that guards routes requiring authentication
 */
export function AuthGuard({
  children,
  requireAuth = true,
  redirectTo = '/login',
  allowedRoles,
}: AuthGuardProps) {
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const supabase = getSupabaseClient();

      if (!supabase) {
        setIsAuthenticated(false);
        setChecking(false);
        return;
      }

      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        logWarning('Auth check failed', {
          component: 'AuthGuard',
          metadata: { error: error.message },
        });
        setIsAuthenticated(false);
      } else if (session) {
        setIsAuthenticated(true);

        // Get user role from session metadata
        const role = session.user.user_metadata?.role || session.user.role || 'user';
        setUserRole(role);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      logWarning('Auth check error', {
        component: 'AuthGuard',
        metadata: { error },
      });
      setIsAuthenticated(false);
    } finally {
      setChecking(false);
    }
  }

  if (checking) {
    return <LoadingState message="Checking authentication..." fullScreen />;
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If specific roles are required, check user role
  if (allowedRoles && allowedRoles.length > 0) {
    if (!userRole || !allowedRoles.includes(userRole)) {
      logWarning('User lacks required role', {
        component: 'AuthGuard',
        metadata: {
          userRole,
          requiredRoles: allowedRoles,
          path: location.pathname,
        },
      });
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
}

/**
 * Hook to check if user is authenticated
 */
export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    checkSession();

    // Listen for auth state changes
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  async function checkSession() {
    try {
      const supabase = getSupabaseClient();

      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
    } catch (error) {
      logWarning('Session check failed', {
        action: 'useAuth',
        metadata: { error },
      });
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    const supabase = getSupabaseClient();
    if (!supabase) {
      throw new Error('Supabase client not available');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  }

  async function signOut() {
    const supabase = getSupabaseClient();
    if (!supabase) {
      throw new Error('Supabase client not available');
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    setUser(null);
    setSession(null);
  }

  return {
    user,
    session,
    loading,
    isAuthenticated: !!user,
    signIn,
    signOut,
  };
}

/**
 * Hook to require authentication
 * Redirects to login if not authenticated
 */
export function useRequireAuth(redirectTo = '/login') {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = `${redirectTo}?from=${encodeURIComponent(location.pathname)}`;
    }
  }, [isAuthenticated, loading, redirectTo, location]);

  return { isAuthenticated, loading };
}
