import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SideGroup = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();


  async function fetchData() {
    try {
      const res = await axios.get('http://192.168.100.116:5700/group', {
        headers: {
          token: localStorage.getItem('token'),
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
    </div>
  );
};

export default SideGroup;
