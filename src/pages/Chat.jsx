import React, { useEffect, useState, useRef } from 'react'
// import { io } from 'socket.io-client'

import { getAllUsersAPI } from '@/api/user'
import { ChatContainer, Contacts } from '@/components'

export default function Chat() {
  const socket = useRef()
  const [contacts, setContacts] = useState([])
  const [currentChat, setCurrentChat] = useState()
  const currentUser = JSON.parse(localStorage.getItem('userinfo'))

  // useEffect(() => {
  //   if (currentUser) {
  //     socket.current = io('http://localhost:7001')
  //     console.log(socket.current);
  //     socket.current.emit('add-user', currentUser.id)
  //   }
  // }, [currentUser])

  useEffect(() => {
    if (currentUser) {
      getAllUsers().then((res) => {
        setContacts(res)
      })
    }
  }, [])

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  const getAllUsers = async () => {
    if (currentUser) {
      const res = await getAllUsersAPI(currentUser.id)
      return res.data
    }
  }

  return (
    <>
      <div className='md:p-20 bg-gray-800'>
        <div className='flex justify-between h-svh md:h-[90vh] bg-gray-600'>
          <Contacts contacts={contacts} changeChat={handleChatChange} />

          {currentChat === undefined ? (
            <div className='flex-1 flex justify-center items-center text-2xl text-gray-300'>请选择聊天对象</div>
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </div>
    </>
  )
}