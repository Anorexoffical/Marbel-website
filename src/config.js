// This works for both environments
export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3008/api";
export const UPLOADS_BASE = import.meta.env.VITE_UPLOADS_BASE || "http://localhost:3008/uploads";
export const SITE_BASE = import.meta.env.VITE_SITE_BASE || "http://localhost:5173";