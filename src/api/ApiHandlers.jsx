import { useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useApiHandlers = () => {
  // Post API handler
  const navigate = useNavigate();
  const postApiHandler = useCallback(async (path, postdata) => {
    const token = sessionStorage.getItem('loginToken');
    try {
      const response = await axios.post(path, postdata, {
        headers: { "Accept": "Application/json", "Content-Type": "multipart/form-data","Authorization": `Bearer ${token}` },
      });
      return { data:response.data.message, status: response.status ? response.status : 500 };
    } catch (error) {
      const data =
        error.response && error.response.data
          ? error.response.data.message
          : error.message || "Something went wrong";
        if (error.response && error.response.status === 401) {
           navigate("/login");
        }
      return { data, status: error.response ? error.response.status : 500 };
    }
  }, []);

  // Get API handler
  
  const getApiHandler = useCallback(async (path) => {
    const token = sessionStorage.getItem('loginToken');
    try {
      const response = await axios.get(path, {
        headers: { "Accept": "Application/json", "Content-Type": "multipart/form-data","Authorization": `Bearer ${token}` },
      });
      
      return { data:response.data.message, status: response.status ? response.status : 500 };
      
    } catch (error) {
      const data =
        error.response && error.response.data
          ? error.response.data.message
          : error.message || "Something went wrong";
        if (error.response && error.response.status === 401) {
           navigate("/login");
        }
      return { data, status: error.response ? error.response.status : 500 };
    }
  }, []);

  const deleteApiHandler = useCallback(async (path) => {
    const token = sessionStorage.getItem('loginToken');
    try {
        const response = await axios.delete(path, {
            headers: { 
                "Accept": "Application/json", 
                "Authorization": `Bearer ${token}` 
            },
        });

        return { data: response.data.message, status: response.status ? response.status : 500 };
    } catch (error) {
        const data =
            error.response && error.response.data
                ? error.response.data.message
                : error.message || "Something went wrong";
        if (error.response && error.response.status === 401) {
            navigate("/login");
        }
        return { data, status: error.response ? error.response.status : 500 };
    }
}, []);

const putApiHandler = useCallback(async (path, putdata) => {
  const token = sessionStorage.getItem('loginToken');
  try {
      const response = await axios.put(path, putdata, {
          headers: {
              "Accept": "Application/json",
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${token}`,
          },
      });
      return { data: response.data.message, status: response.status ? response.status : 500 };
  } catch (error) {
      const data =
          error.response && error.response.data
              ? error.response.data.message
              : error.message || "Something went wrong";
      if (error.response && error.response.status === 401) {
          navigate("/login");
      }
      return { data, status: error.response ? error.response.status : 500 };
  }
}, []);


  return { postApiHandler, getApiHandler, deleteApiHandler, putApiHandler };
};

export default useApiHandlers;
