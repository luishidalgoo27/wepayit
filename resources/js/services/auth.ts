import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost/api";

export async function login(email: string, password: string) {
  const res = await axios.post(`${API}/login`, { email, password });
  const { token } = res.data;

  if (!token) {
    throw new Error("No se recibió token");
  }

  localStorage.setItem("token", token);
  return res.data; 
}

export async function register(name: string, email: string, password: string) {
  const res = await axios.post(`${API}/register`, {name, email, password });
  const { token } = res.data;

  if (!token) {
    throw new Error("No se recibió token");
  }

  localStorage.setItem("token", token);
  return res.data; 
}


export function logout() {
  localStorage.removeItem("token");
}

