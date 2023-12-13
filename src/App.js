import { useEffect, useState } from "react";
import { collection, getDocs } from "@firebase/firestore";
import { db , storage } from "./firebase";

import {ref,uploadBytes,getDownloadURL,listAll,list, } from "firebase/storage";
import { initializeApp } from "firebase/app";
import GroupCard from "./components/Group Card/GroupCard";


function App() {


    return (
        <div className="App">
            <div><GroupCard/></div>
        </div>
    );
}

export default App;
