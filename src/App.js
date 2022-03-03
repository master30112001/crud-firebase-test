import logo from "./logo.svg";
import "./App.css";

import db from "./firebaseDetails";

import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";

function App() {
  // states
  const [name, setname] = useState("");
  const [year, setyear] = useState(0);

  const [allusers, setallusers] = useState([]);

  const myusercollection = collection(db, "users");

  useEffect(() => {
    const getusers = async () => {
      const allusers = await getDocs(myusercollection);
      console.log(allusers);

      setallusers(allusers.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(allusers);
    };

    getusers();
  }, []);

  const submit = () => {
    // save data

    db.collection("users").addDoc({
      name: name,
      year: year,
    });
  };

  return (
    <div className="App">
      <h1>Hello</h1>

      <input placeholder="Name"></input>
      <input placeholder="Year"></input>

      <button onCLick={submit}>submit</button>

      {allusers.map((user) => {
        return <div>Name: {user.name}</div>;
      })}
    </div>
  );
}

export default App;
