import axios from "axios"

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Non authentifié, redirection vers login")
    }
    return Promise.reject(error)
  }
)

export default axiosClient
