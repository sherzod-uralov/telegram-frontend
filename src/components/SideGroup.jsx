import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  }, []);

  const addGroupChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://192.168.100.116:7000/group", {
        Headers: {
          token: localStorage.getItem("token"),
        },
        group_name: addGroup,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        {data[0]?.groups?.map((group, index) => (
          <div
            onClick={() => {
              navigate(`/group/${group.group_id}`);
            }}
            key={index}
          >
            <h2>{group.group_name}</h2>
          </div>
        ))}
      </div>
      <form onSubmit={addGroupChange}>
        <input
          type="text"
          value={addGroup}
          onChange={(e) => setGroup(e.target.value)}
        />
        <button>add group</button>

        <h1>sdsdfsdjkfhks</h1>
      </form>
    </div>
  );
};

export default SideGroup;
