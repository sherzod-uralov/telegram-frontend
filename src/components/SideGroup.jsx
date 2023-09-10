import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../style/main.css'
const SideGroup = () => {
  const [data, setData] = useState([]);
  const [addGroup, setGroup] = useState("");
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const res = await axios.get("http://192.168.100.116:7000/group", {
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
  }, [data]);

  const addGroupChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://192.168.100.116:7000/group", {
        group_name: addGroup 
      },
      {
        headers:{token:localStorage.getItem("token")}
      });
    console.log(response.headers);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };


return (
  <div className="container">
    <div className="group-list">
      {data[0]?.groups?.map((group, index) => (
        <div
          className="group-item"
          onClick={() => {
            navigate(`/group/${group.group_id}`);
          }}
          key={index}
        >
          <h2>{group.group_name}</h2>
        </div>
      ))}
    </div>
    <form className="add-group-form" onSubmit={addGroupChange}>
      <input
        type="text"
        value={addGroup}
        onChange={(e) => setGroup(e.target.value)}
        placeholder="Enter group name"
      />
      <button>add group</button>
    </form>
  </div>
);

};

export default SideGroup;
