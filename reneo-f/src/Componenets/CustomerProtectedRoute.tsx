import { Outlet, Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";
import { useAuth } from "../contextAPI/auth";

 const CustomerProtectedRoute = () => {
  const { user, loading } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      if (!user) {
        setProfileLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      if (!error) {
        setRole(data.role);
      }

      setProfileLoading(false);
    };

    getProfile();
  }, [user]);

  if (loading || profileLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "customer") {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
};
export default CustomerProtectedRoute;