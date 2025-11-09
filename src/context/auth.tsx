import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "jwt-decode";
import {
  JWT_EXPIRATION_KEY,
  JWT_ACCESS_TOKEN_KEY,
  JWT_REFRESH_TOKEN_KEY,
  JWT_PHOTO_URL_KEY,
} from "@/lib/consts";

export type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string, refreshToken: string, photoUrl: string | null) => void;
  logout: () => void;
  refreshIfExpired: () => void; // signin していたが expired した場合のみ refresh
  getToken: () => string | null;
};

interface GoogleJWTPayload extends JwtPayload {
  name: string;
  email: string;
  picture: string;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(JWT_ACCESS_TOKEN_KEY),
  );

  const [expiresAt, setExpiresAt] = useState<number | null>(
    localStorage.getItem(JWT_EXPIRATION_KEY)
      ? parseInt(localStorage.getItem(JWT_EXPIRATION_KEY)!)
      : null,
  );

  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem(JWT_REFRESH_TOKEN_KEY),
  );

  const [photoUrl, setPhotoUrl] = useState<string | null>(
    localStorage.getItem(JWT_PHOTO_URL_KEY),
  );

  useEffect(() => {
    const storedToken = localStorage.getItem(JWT_ACCESS_TOKEN_KEY);
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem(JWT_ACCESS_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(JWT_ACCESS_TOKEN_KEY);
    }
  }, [token]);

  useEffect(() => {
    if (expiresAt) {
      localStorage.setItem(JWT_EXPIRATION_KEY, expiresAt.toString());
    } else {
      localStorage.removeItem(JWT_EXPIRATION_KEY);
    }
  }, [expiresAt]);

  useEffect(() => {
    if (refreshToken) {
      localStorage.setItem(JWT_REFRESH_TOKEN_KEY, refreshToken);
    } else {
      localStorage.removeItem(JWT_REFRESH_TOKEN_KEY);
    }
  }, [refreshToken]);

  useEffect(() => {
    if (photoUrl) {
      localStorage.setItem(JWT_PHOTO_URL_KEY, photoUrl);
    } else {
      localStorage.removeItem(JWT_PHOTO_URL_KEY);
    }
  }, [refreshToken]);

  const login = (
    token: string,
    refreshToken: string,
    photoUrl: string | null,
  ) => {
    const decodedToken = jwtDecode<GoogleJWTPayload>(token);
    setToken(token);
    const expiration = decodedToken.exp ? decodedToken.exp * 1000 : 0; // credential.expはUNIX Timeなのでミリ秒に変換
    setExpiresAt(expiration);
    setRefreshToken(refreshToken);
    setPhotoUrl(photoUrl);
  };

  const refreshIfExpired = async () => {
    if (token !== null && expiresAt !== null && Date.now() >= expiresAt) {
      const res = await fetch(
        `https://securetoken.googleapis.com/v1/token?key=${import.meta.env.VITE_FIREBASE_API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            grant_type: "refresh_token",
            refreshToken,
          }),
        },
      );

      const { id_token, refresh_token } = await res.json();

      const decodedToken = jwtDecode<GoogleJWTPayload>(id_token);
      setToken(id_token);
      const expiration = decodedToken.exp ? decodedToken.exp * 1000 : 0; // credential.expはUNIX Timeなのでミリ秒に変換
      setExpiresAt(expiration);
      setRefreshToken(refresh_token);
    }
  };

  const logout = () => {
    setToken(null);
    setExpiresAt(null);
    setRefreshToken(null);
    setPhotoUrl(null);
  };

  const getToken = () => token;

  const isAuthenticated = useMemo(() => {
    return token !== null && expiresAt !== null && Date.now() < expiresAt;
  }, [token, expiresAt]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        token,
        login,
        refreshIfExpired,
        logout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
