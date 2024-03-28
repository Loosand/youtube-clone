import React, { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'
import styled from 'styled-components'

import { getAllUsersAPI } from '@/api/user'
import { ChatContainer, Welcome, Contacts } from '@/components'

export default function Chat() {
  const socket = useRef()
  const [contacts, setContacts] = useState([])
  const [currentChat, setCurrentChat] = useState()
  const currentUser = JSON.parse(localStorage.getItem('userinfo'))

  useEffect(() => {
    if (currentUser) {
      socket.current = io('http://localhost:7001')
      socket.current.emit('add-user', currentUser.id)
    }
  }, [currentUser])

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
      <Container>
        <div className='container'>
          <Contacts contacts={contacts} changeChat={handleChatChange} />

          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: skyblue;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`
