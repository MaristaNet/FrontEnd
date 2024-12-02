import axios from 'axios';
import { API_URL, REACT_APP_MASTER_API_KEY } from '../../../config';


export const getPosts = async () => {
  try {

    const response = await axios.get(`${API_URL}/post`, {
      headers: { Authorization: `Api-Key ${REACT_APP_MASTER_API_KEY}` }
    });
        console.log("response", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener los datos del muro:", error);
    throw error;
  }
};
export const createPost = async (newPost) => {
  try {

   const response= await axios.post(`${API_URL}/post`, newPost, {
      headers: { Authorization: `Api-Key ${REACT_APP_MASTER_API_KEY}` }, // Corrección en la sintaxis de template string
    });

    return response.data;
  } catch (error) {
    console.error("Error al crear el post:", error);
    throw error;
  } 
}