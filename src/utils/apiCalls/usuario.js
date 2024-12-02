import axios from "axios";
import { API_URL, REACT_APP_MASTER_API_KEY } from "../../../config";



export const createUsuario = async (usuario) => {
    try {
        const response = await axios.post(`${API_URL}/usuario`, usuario, {
        headers: { Authorization: `Api-Key ${REACT_APP_MASTER_API_KEY}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error al crear el usuario:", error.response.data);
        throw error.response.data;
    }
    }

export const getUsuario = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/usuario/${id}`, {
        headers: { Authorization: `Api-Key ${REACT_APP_MASTER_API_KEY}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener el usuario:", error.response.data);
        throw error.response.data;
    }
    }

export const updateUsuario = async (id, usuario) => {
    try {
        const response = await axios.put(`${API_URL}/usuario/${id}`, usuario, {
        headers: { Authorization: `Api-Key ${REACT_APP_MASTER_API_KEY}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el usuario:", error.response.data);
        throw error.response.data;
    }
    }