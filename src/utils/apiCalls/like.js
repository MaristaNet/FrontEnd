import axios from 'axios';
import { API_URL, REACT_APP_MASTER_API_KEY } from '../../../config';

export const getLikesByPost =(post_id)=>{
    return new Promise((resolve, reject)=>[
        axios.get(`${API_URL}/like?id_post=${post_id}`,{
            headers: { Authorization: `Api-Key ${REACT_APP_MASTER_API_KEY}` }
        })
        .then(res=>{
            resolve(res.data)
        })
        .catch(error=>{
            reject(error.response,data)
        })
    ])
}

export const giveLike= async (body)=>{
    try{
        const res= await axios.post(`${API_URL}/like`,body, {
            headers: { Authorization: `Api-Key ${REACT_APP_MASTER_API_KEY}` },
            });
        return res.data
    }
    catch(e){
        throw e.response.data
    }
}
export const deleteLike= async (id)=>{
    try{
        const res= await axios.delete(`${API_URL}/like/${id}`, {
            headers: { Authorization: `Api-Key ${REACT_APP_MASTER_API_KEY}` },
            });
        return res.data
    }
    catch(e){
        throw e.response.data
    }
}