import { click } from "@testing-library/user-event/dist/click";
import "./GroupCard.css";



import GroupImage1 from "./images/NP1.png";
import GroupImage2 from "./images/NP2.png";
import GroupImage3 from "./images/NP3.png";
import GroupImage4 from "./images/NP4.png";
import GroupImage5 from "./images/NP5.png";
import membersList1 from "./images/membersList1.png";
import membersList2 from "./images/membersList2.png";
import membersList3 from "./images/membersList3.png";
import membersList4 from "./images/membersList4.png";
import membersList5 from "./images/membersList5.png";

import { useEffect, useState } from "react";
import { collection, getDocs , updateDoc  } from "@firebase/firestore";



import { db } from "../../firebase";






const GroupCard = () => {

    const [groups, setGroups] = useState([]);
    const groupsRef = collection(db, "groups");

    useEffect(() => {
      async function getGroups() {
          try {
              const data = await getDocs(groupsRef);
              const filteredData = data.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
              }));
              setGroups(filteredData);
          } catch (error) {
              console.error(error);
          }
      }
      getGroups();
  },[]);
    
    const statusImages = [GroupImage1,GroupImage2,GroupImage3,GroupImage4,GroupImage5];
    const listImages = [membersList1,membersList2,membersList3,membersList4,membersList5];


    return (
      <div className="page">
        <div className=" container text-center">
          <div className="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-3 ">
            
              {groups.map((group, cardId) => (
                <div className="col" key={group.id}>
                <div className="card">
                  {statusImages.map((image,index) => {
                      if(cardId === index){
                        return (<img className="group-background-img" key={index} src={image} alt="Background image"></img>)
                      }
                      })}
                  <div className="card-body">
                    <div className="card-title">  {group.title}</div>
                    <div className="group-status" > {group.status === "Public" ? (<i class="bi bi-globe"></i>) : (<i class="bi bi-lock"></i>)} {group.status} Group</div>
                    <div className="statistical-info row">
                      <div className="members-num col-3">
                        <div className="number" >{group.membersNum}</div>
                        <div className="text">Members</div>
                      </div>

                      <div className="post-per-day-number col-3">
                        <div className="number">{group.postPerDay}</div>
                        <div className="text">Post per day</div>
                      </div>
                    </div>
                    {listImages.map((image,index) => {
                      if(cardId === index){
                        return (<div className="members-list" key={index}  >
                                <img class="member-list-img " src={image} alt="Background image"></img>
                                </div>)
                      }
                      })}
                  </div>
                  <div className="card-footer">
                    <button type="button" id="group-button" className="join-group" value={group.buttonValue}>Join Group</button>
                  </div>
                </div>
                </div>
              ))}
            
          </div>
        </div>
      </div>
    );
  
} 


export default GroupCard;