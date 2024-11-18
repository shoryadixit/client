"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/session", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 401) {
          setUser(null);
        }
        if (!data.error) {
          setUser(data.data);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  const authAction = async (formik, apiURL, values, resolve, reject) => {
    await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    })
      .then(async (response) => {
        if (response.ok) {
          formik.setSubmitting(false);
          checkAuth();
          resolve(await response.json());
          setTimeout(() => {
            router.push("/");
          }, 500);
        } else {
          formik.setSubmitting(false);
          reject(await response.json());
        }
      })
      .catch((error) => {
        formik.setSubmitting(false);
        reject(error);
      });
  };

  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    })
      .then(() => {
        checkAuth();
        router.refresh();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const value = {
    user,
    error,
    isAuthenticated: !!user,
    checkAuth,
    logout,
    authAction,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
