// export const BASE_URL = import.meta.env?.VITE_API_BASE_URL || "https://thomsonbe-new.onrender.com/api";
export const BASE_URL = "http://127.0.0.1:8000/api";

const cache = new Map();
const CACHE_TTL = 60 * 1000;

export const api = {
  get: async (endpoint, useCache = true) => {
    try {
      if (useCache && cache.has(endpoint)) {
        const cached = cache.get(endpoint);
        if (Date.now() - cached.timestamp < CACHE_TTL) {
          return cached.data;
        } else {
          cache.delete(endpoint);
        }
      }

      const response = await fetch(`${BASE_URL}${endpoint}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      
      if (useCache) {
        cache.set(endpoint, { data, timestamp: Date.now() });
      }
      return data;
    } catch (error) {
      console.error("API GET Error:", error);
      throw error;
    }
  },

  post: async (endpoint, data) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("API POST Error:", error);
      throw error;
    }
  }
};
