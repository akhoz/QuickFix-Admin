const API_URL = import.meta.env.VITE_API_URL;

const ROUTES = {
  baseURL: `${API_URL}`,
  workshops: `${API_URL}/workshops`,
  requests: `${API_URL}/repair-requests`
}

export default ROUTES;
