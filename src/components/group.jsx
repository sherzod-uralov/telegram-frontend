import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Groups = () => {
  const [message,setMessage] = useState('');
  const { id } = useParams();
  const [data, setData] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://10.10.1.93:4050/groupmessage/${id}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        console.log(res);
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    console.log(data);
    fetchData();
  }, [id]);
const formSub = async (e) => {
  e.preventDefault();
  try {
    await axios.post("http://10.10.1.93:4050/groupmessage", {
        group_message: message,
        group_id:id
      },
      {
        headers:{token:localStorage.getItem("token")}
      });
  } catch (error) {
    console.log(error);
  }
}

return (
  <div className="container">
    <div>
      {data?.messages?.map((message, index) => (
          <div>
            <h2>{message?.User?.username}</h2>
        <div className="message" key={index}>
          <p>{message.group_message}</p>
        </div>
          </div>
      ))}
    </div>
    <form className="message-form" onSubmit={formSub}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button>Send</button>
    </form>
  </div>
);

};

export default Groups;
