import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Axios from 'axios'
import Chart from '../Components/Chart';
import VChart from '../Components/VChart/VChart';
import '../CSS/Dashboard.css';
import { dataToBoxes, isToken } from './../Utils';
import AddButton from '../Components/Atoms/AddButton/AddButton';
import Modal from '../Components/Molecules/Modal';
import AddForm from '../Components/Molecules/AddForm';
import EntryBox from '../Components/Atoms/EntryBox/EntryBox';
import BoxWrapper from '../Components/Molecules/BoxWrapper/BoxWrapper';


export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [entryBoxes, setEntryBoxes] = useState("");
  const { username } = useParams();

  useEffect(() => {

      //get the user's data
      if(username) { //other user
        console.log(username);
        Axios.get("http://localhost:5001/userData", {params: {token: localStorage.getItem("token"), username: username}}).then(function(response) {
            let data = response.data;    
            console.log(data);

            setEntryBoxes(data);
            // console.log(data);
            setDashboardData(data);
        })
      }
      else { //your data
        if(isToken()) {
          Axios.get("http://localhost:5001/userData", {params: {token: localStorage.getItem("token"), username: localStorage.getItem("username")}}).then(function(response) {
              let data = response.data;    
              console.log(data);
  
              setEntryBoxes(data);
              // console.log(data);
              setDashboardData(data);
          })
        }
      }
  }, []);

  const openModal = (e) => {
    setShowModal(true);
  }

  const closeModal = (e) => {
    setShowModal(false);
  }

  const addHandler = (e) => {
    e.preventDefault()
    console.log(e.target);
    let data = {difficulty: e.target[0].value, date: e.target[1].value, location: e.target[2].value, description: e.target[3].value, video: e.target[4].value }
    console.log(data);
    Axios.post("http://localhost:5001/addEntry", {token: localStorage.getItem("token"), entryData: data, username: localStorage.getItem("username")}).then(function(response) {
      let data = response.data;    
      setDashboardData(data);
    }).catch(function (error) {
      if (error.response) {
        alert(error.response.data);//
      }
    });
  }

  return(<div className='dashboardWrapper'>
    {/* <Chart width={500} height={150} numberOfHorizontalGuides={5} numberOfVerticalGuides={10}></Chart> */}
    {dashboardData === 0 ? <p>User not found or private profile</p> : 
    <>
    <div id="chartWrapper">
      {dashboardData && <VChart width={500} height={150} data={dashboardData}></VChart>}
    </div>
    <div className='addButtonWrapper'>
      <Modal closeHandler={closeModal} show={showModal}>
        <AddForm clickHandler={addHandler}></AddForm>
      </Modal>
      <AddButton text={"Add New Route"} clickHandler={openModal}></AddButton>
    </div>
    <BoxWrapper data={entryBoxes}></BoxWrapper>
    </>}
  </div>)
}