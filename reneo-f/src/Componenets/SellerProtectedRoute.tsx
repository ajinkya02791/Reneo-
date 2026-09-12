import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contextAPI/auth";
import { supabase } from "../lib/supabase";
const SellerProtectedRoute = () => {
  const { user, loading } = useAuth();
  const [profileLoading, setProfileLoading] = useState(true);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const checkSellerRole = async () => {
      // Auth is still restoring the session
      if (loading) {
        return;
      }
      // // No authenticated user
      if (!user) {
        setProfileLoading(false);
        return;
      }
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", user.id)
        .single();
      if (error) {
        console.error("Unable to load seller profile:", error);
        setIsSeller(false);
        setProfileLoading(false);
        return;
      }
      setIsSeller(profile.role === "seller");
      setProfileLoading(false);
    };
    checkSellerRole();
  }, [user, loading]);
  // Wait for AuthContext to restore the session
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {" "}
        <p>Loading...</p>{" "}
      </div>
    );
  } // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  } // Wait for profile/role check
  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {" "}
        <p>Loading...</p>{" "}
      </div>
    );
  }
  // Logged in but not a seller
  if (!isSeller) {
    return <Navigate to="/forbidden" replace />;
  } // Authenticated seller
  return <Outlet />;
};
export default SellerProtectedRoute;
