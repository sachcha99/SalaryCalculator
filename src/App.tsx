import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import axios from 'axios';

function App() {

  const [count, setCount] = useState(1);
  const [data, setData] = useState();
  const [userData, setUserData] = useState([{
    name: "",
    dob: "",
    image: ""
  }]);
  const onIncreament = (e: any) => {
    setCount(count + 1);
  };

  const getData = async () => {
    const res = await axios.get('https://randomuser.me/api/');
    setData(res.data.results[0]);
  };

  const getRandomData = async () => {
    const res = await axios.get('https://randomuser.me/api/');
    console.log("res", res.data.results[0]);
    let dob = new Date(res.data.results[0].dob.date);
    setUserData([...userData, {
      name: res.data.results[0].name.title + " " + res.data.results[0].name.first + " " + res.data.results[0].name.last,
      dob: dob.getDate() + '/' + (dob.getMonth() + 1) + '/' + dob.getFullYear(),
      image: res.data.results[0].picture.thumbnail,
    }]);
  };

  return (
    <div className="App">
      <button onClick={e => (onIncreament(e))}> Increament</button >
      <div>{count.toString()}</div>

      <button onClick={e => getData()}> Click me</button >
      <br />

      {JSON.stringify(data)}
      <button onClick={e => getRandomData()}>Random User</button >
      <br />

      {userData.map((user, i) => (
        <div key={i}>
          {user.image && <div className='flex justify-center'><img src={user.image} className="object-cover h-48 w-96" /></div>}
          {user.name && <h1>Name : {user.name}</h1>}
          {user.dob && <h1>DOB : {user.dob}</h1>}
        </div>
      ))}
    </div >
  );
}

export default App;
