import axios from "axios";

const baseURL = ""

const calling = "http://localhost:3000";

const api = axios.create({
  baseURL: calling
});

export const loginUser = async loginData => {
  const res = await api.post("/auth/login", loginData);
  localStorage.setItem("authToken", res.data.token);
  api.defaults.headers.common.authorization = `Bearer ${res.data.token}`;
  return res.data.user;
};

export const registerUser = async registerData => {
  const res = await api.post("/auth/login", registerData);
  localStorage.setItem("authToken", res.data.token);
  api.defaults.headers.common.authorization = `Bearer ${res.data.token}`;
  return res.data.user;
};

export const verifyUser = async () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    const res = await api.get("/auth/verify");
    return res.data;
  }
  return false;
};

export const createArt = async (userId, data) => {
  data.user_id = userId;
  const resp = await api.post("/arts", { art: data });
  return resp.data;
};

export const readAllArts = async () => {
  const resp = await api.get("/arts");
  return resp.data;
};

export const updateArt = async (id, data) => {
  const resp = await api.put(`/arts/${id}`, { art: data })
  return resp.data
}

export const destroyArt = async (id) => {
  const resp = await api.delete(`/arts/${id}`)
  return resp.data
}
