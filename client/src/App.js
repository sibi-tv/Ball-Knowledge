import './App.css';
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import Axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0); 
  const [position, setPosition] = useState("");
  const [totalpoints, setTP] = useState(0);
  const [totalassists, setTA] = useState(0);
  const [totalrebounds, setTR] = useState(0);

  const [newPoints, setNewPoints] = useState(0);
  const [newAssists, setNewAssists] = useState(0);
  const [newRebounds, setNewRebounds] = useState(0);

  const [playerList, setPlayerList] = useState([]);
  const [buttonOpen, setButtonOpen] = useState(true);

  const addPlayer = () => {
    console.log(name);
    Axios.post("http://localhost:3001/create", {
      name: name, 
      age: age, 
      position: position, 
      totalpoints: totalpoints, 
      totalassists: totalassists, 
      totalrebounds: totalrebounds, 
    }).then(() => {
      setPlayerList([...playerList, {
          name: name, 
          age: age, 
          position: position, 
          totalpoints: totalpoints, 
          totalassists: totalassists, 
          totalrebounds: totalrebounds, 
        }
      ]);
    });
  };

  const getPlayers = () => {
    Axios.get("http://localhost:3001/players").then((response) => {
      setPlayerList(response.data);
    });
    setButtonOpen(false);
  };
  const hidePlayers = () => {
    setPlayerList([]);
    setButtonOpen(true);
  }

  const addPoints = (id, currentpoints) => {
    const newPoint = parseInt(newPoints)
    const sumn = parseInt(currentpoints) + newPoint;
    Axios.put("http://localhost:3001/update", {totalpoints: sumn, id: id}).then(
      (response) => {
        setPlayerList(playerList.map((val)=> {
          return val.idplayers === id ? {id: val.idplayers, name: val.name, age: val.age, position: val.position, totalpoints: sumn, totalassists: val.totalassists, totalrebounds: val.totalrebounds} : val
        }))
      }
    )
  }
  const addAssists = (id, currentassists) => {
    const newAssist = parseInt(newAssists)
    const sum = parseInt(currentassists) + newAssist;
    Axios.put("http://localhost:3001/updateassists", {totalassists: sum, id: id}).then(
      (response) => {
        setPlayerList(playerList.map((val)=> {
          return val.idplayers === id ? {id: val.idplayers, name: val.name, age: val.age, position: val.position, totalpoints: val.totalpoints, totalassists: sum, totalrebounds: val.totalrebounds} : val
        }))
      }
    )
  }
  const addRebounds = (id, currentrebounds) => {
    const newRebound = parseInt(newRebounds)
    const sum = parseInt(currentrebounds) + newRebound;
    Axios.put("http://localhost:3001/updaterebounds", {totalrebounds: sum, id: id}).then(
      (response) => {
        setPlayerList(playerList.map((val)=> {
          return val.idplayers === id ? {id: val.idplayers, name: val.name, age: val.age, position: val.position, totalpoints: val.totalpoints, totalassists: val.totalassists, totalrebounds: sum} : val
        }))
      }
    )
  }

  const deletePlayer = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setPlayerList(playerList.filter((val) => {
        return val.idplayers !== id;
      }))
    })
  }

  return (
<div className="App">
      <img src="https://em-content.zobj.net/source/microsoft-teams/337/basketball_1f3c0.png" height="50px" width="50px" alt="" className = "a"/>
      <h1>BALL KNOWLEDGE</h1>
      <img src="https://em-content.zobj.net/source/microsoft-teams/337/basketball_1f3c0.png" height="50px" width="50px" alt="" className = "b"/>
      <div className="information">
        <label>Name: </label>
        <input type="text" onChange = {(event) => {setName(event.target.value)}}/>
        <label>Age: </label>
        <input type="number" onChange = {(event) => {setAge(event.target.value)}}/>
        <label>Position: </label>
        <input type="text" onChange = {(event) => {setPosition(event.target.value)}}/>
        <label>Total Points: </label>
        <input type="number" onChange = {(event) => {setTP(event.target.value)}}/>
        <label>Total Assists: </label>
        <input type="text" onChange = {(event) => {setTA(event.target.value)}}/>
        <label>Total Rebounds: </label>
        <input type="text" onChange = {(event) => {setTR(event.target.value)}}/>
      </div>
      <div className="i">
        <Button type ="button" class="btn btn-danger" onClick={addPlayer}>Add Player</Button>
      </div>
      <div className="players">
        <div className="muh">{
          buttonOpen ? <Button onClick={getPlayers}>Show Players</Button> : <Button onClick={hidePlayers}>Hide Players</Button>
        }
        </div>

        {playerList.map((val,key) => {
          return <div className="player">
            <div>
              <h3><u>Name:</u> {val.name}</h3>
              <h3><u>Age:</u> {val.age}</h3>
              <h3><u>Position:</u> {val.position}</h3>
              <h3><u>Total Points:</u> {val.totalpoints}</h3>
              <h3><u>Total Assists:</u> {val.totalassists}</h3>
              <h3><u>Total Rebounds:</u> {val.totalrebounds}</h3>
            </div>
            <div>
              <input type="text" placeholder="Points to add..." onChange = {(event) => {setNewPoints(event.target.value)}}/>
              <span className="uBut"><Button class="btn btn-success" onClick={()=>{addPoints(val.idplayers, val.totalpoints)}}>Add Points</Button></span>
              <input type="text" placeholder="Assists to add..." onChange = {(event) => {setNewAssists(event.target.value)}}/>
              <span className="uBut"><Button class="btn btn-success" onClick={()=>{addAssists(val.idplayers, val.totalassists)}}>Add Assists</Button></span>
              <input type="text" placeholder="Rebounds to add..." onChange = {(event) => {setNewRebounds(event.target.value)}}/>
              <span className="uBut"><Button class="btn btn-success" onClick={()=>{addRebounds(val.idplayers, val.totalrebounds)}}>Add Rebounds</Button></span>
            </div>
            <h3><Button class="btn btn-danger btn-lg btn-block" onClick={()=>{deletePlayer(val.idplayers)}}>Delete</Button></h3>
          </div>
        })}
      </div>
      <p>
        y
      </p>
    </div>
  );
}

export default App;
