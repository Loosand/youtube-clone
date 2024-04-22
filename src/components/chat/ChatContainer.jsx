import { useMediaQuery } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "react-query"
import { v4 as uuidv4 } from "uuid";


import { getMessageAPI, sendMessageAPI } from "@/api/chat"
import { ChatInput } from "@/components";
import { useStore } from "@/store";

export default function ChatContainer({ currentChat, socket }) {
  const scrollRef = useRef()
  const { avatar } = useStore()
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const chatContainerRef = useRef(null);
  const isMobile = useMediaQuery('(max-width:768px)')

  // 模拟加载时 messages 的变化，触发滚动到底部效果
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  const fetchData = async () => {
    try {
      const userInfo = await JSON.parse(localStorage.getItem("userinfo"));

      const res = await getMessageAPI({
        from: userInfo.id,
        to: currentChat?._id
      });

      setMessages(res);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useQuery(['chat-message', currentChat], () => fetchData(), {
    refetchInterval: 500
  })

  useEffect(() => {
    getCurrentChat();
  }, [currentChat]);

  const getCurrentChat = async () => {
    if (currentChat) {
      await JSON.parse(
        localStorage.getItem("userinfo")
      ).id;
    }
  };

  const handleSendMsg = async (msg) => {
    const userInfo = await JSON.parse(
      localStorage.getItem("userinfo")
    );

    // socket.current.emit("send-msg", {
    //   to: currentChat?._id,
    //   from: userInfo.id,
    //   msg,
    // });

    await sendMessageAPI({
      from: userInfo.id,
      to: currentChat?._id,
      message: msg
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);

  }

  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.on("msg-recieve", (msg) => {
  //       setArrivalMessage({
  //         fromSelf: false,
  //         message: msg
  //       })
  //     })
  //   }
  // }, [])

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth"
    })
  }, [messages])

  return (
    <div className="flex-1 bg-gray-200 text-black flex flex-col overflow-hidden">
      {!isMobile && <div className="flex justify-between bg-white items-center px-8 py-3">
        <div className="flex items-center gap-4">
          <img
            className="h-12 rounded-full"
            src={`${currentChat?.avatar}`}
          />
          <div >
            <h3>{currentChat?.username}</h3>
          </div>
        </div>
      </div>}

      <div ref={chatContainerRef} className="p-4 flex-1 space-y-4 overflow-auto">
        {messages?.map((message) => {
          return (
            <div div={scrollRef} key={uuidv4()}>
              <div className={`flex gap-4 items-center ${message.fromSelf ? "justify-end" : "justify-start"}`}>
                {!message.fromSelf && (<img className="h-12 w-12 rounded-full" src={currentChat.avatar} />)}
                <div className="bg-purple-500 max-w-[40%] break-words p-4 text-xl rounded-2xl text-slate-200">
                  <p>{message.message}</p>
                </div>
                {message.fromSelf && (<img className="h-12 w-12 rounded-full" src={avatar} />)}
              </div>
            </div>
          );
        })}
      </div>

      <ChatInput handleSendMsg={handleSendMsg} />
    </div >
  );
}
