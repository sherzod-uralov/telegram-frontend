import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../style/main.css'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrSearch } from 'react-icons/gr'

const SideGroup = () => {
  const [data, setData] = useState([]);
  const [addGroup, setGroup] = useState("");
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const res = await axios.get("http://10.10.1.93:4050/group", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setData(res?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const addGroupChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://10.10.1.93:4050/group", {
        group_name: addGroup
      },
        {
          headers: { token: localStorage.getItem("token") }
        });
      console.log(response.headers);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Guruh nomiga bosingda yo'nalishga o'tish
  const goToGroup = (groupId) => {
    navigate(`/group/${groupId}`);
  };

  return (
    <div className="container">
      <section>
        <div className="sidebar">
          <div className="sidebar_burger">
            <GiHamburgerMenu className="burger" />
            <div className="input_custom">
              <GrSearch />
              <input type="text" />
            </div>
          </div>
          <div>
            {data[0]?.groups?.map((e, i) => (
              <div key={i} className="group_card" onClick={() => goToGroup(e.group_id)}>
                {e.group_image ? (
                  <img src={e.group_image} alt={e.group_name} />
                ) : (
                  <div className="group_image_placeholder">
                    {e.group_name.charAt(0).toUpperCase()}
                  </div>
                )}
               <div className="group_name">
               <h2>{e.group_name}</h2>
               </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SideGroup;
