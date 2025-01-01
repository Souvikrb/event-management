import React, { useEffect } from 'react';
import ApiPaths from '../../api/ApiPaths';
import useApiHandlers from "../../api/ApiHandlers"; // Adjust the path based on your file structure


const Dashboard = () => {
  const { getApiHandler } = useApiHandlers();
  useEffect(()=>{
    fetchData();
  })
  const fetchData = async () => {
    const response = await getApiHandler(ApiPaths.dashboard);
    console.log(response);
  };
  return <main id="main" className="main">Test Content Goes Here</main>;
};

export default Dashboard;
