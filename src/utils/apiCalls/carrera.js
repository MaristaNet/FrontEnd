import axios from "axios";
import { API_URL, REACT_APP_MASTER_API_KEY } from "../../../config";

export const getCarreras = async () => {
    try {
      const response = await axios.get(`${API_URL}/carrera/`, {
        headers: { Authorization: `Api-Key ${REACT_APP_MASTER_API_KEY}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener los datos del muro:", error);
      throw error;
    }
  };

export const getCarrera = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/carrera/${id}`, {
        headers: { Authorization: `Api-Key ${REACT_APP_MASTER_API_KEY}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener la carrera:", error);
      throw error;
    }
  }