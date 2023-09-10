import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Groups = () => {
  const { id } = useParams();
  console.log(id);
  const [data, setData] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://192.168.100.116:7000/groupmessage/${id}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    console.log(data);
    fetchData();
  }, [id]);

  return (
    <div>
      <div>
        {data?.messages?.map((message, index) => (
          <div key={index}>
            <p>{message.group_message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;
