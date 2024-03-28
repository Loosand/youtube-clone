import React, { useState } from "react";
import styled from "styled-components";

export default function Contacts({ contacts, changeChat }) {
  const userInfo = JSON.parse(
    localStorage.getItem("userinfo")
  );

  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {userInfo && (
        <Container>
          <div className="contacts">
            {contacts?.map((contact, index) => {
              return (
                <div
                  key={index}
                  className={`contact ${index === currentSelected ? "selected" : ""
                    }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`${contact.avatar}`}
                    />
                  </div>
                  <div className="username">
                    <h3>{contact?.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  padding-top: 12px;
  background-color: #9a86f3;
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color:black;
        }
      }
    }
    .selected {
      background-color: white;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
