import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import Chart from '../Components/Chart';
import VChart from '../Components/VChart/VChart';
export default function Dashboard() {
  // const [dashboardData, setDashboardData] = useState();

  // useEffect(() => {
  //     //get the user's data
  //     // console.log(localStorage.getItem("token"));
  //     if(isToken()) {
  //       Axios.get("http://localhost:5001/dashboard", {params: {token: localStorage.getItem("token")}}).then(function(response) {
  //           let data = response.data;    
  //           console.log(data);
  //           setDashboardData(1);
  //       })
  //     }
  // }, []);

  return(<div className='wrapper'>
    {/* <Chart width={500} height={150} numberOfHorizontalGuides={5} numberOfVerticalGuides={10}></Chart> */}
    <VChart width={500} height={150}></VChart>
  </div>)
}