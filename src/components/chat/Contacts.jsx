import { Avatar, Typography, useMediaQuery, List, ListItem, ListItemAvatar, ListItemText, Box } from "@mui/material";
import React, { useState } from "react";

export default function Contacts({ contacts, changeChat }) {
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const isMobile = useMediaQuery('(max-width:768px)')

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {userInfo && (
        <Box className="basis-[20%] md:basis-[300px]flex-shrink bg-gray-800 text-ellipsis overflow-clip text-nowrap text-white">
          <List className="flex flex-col p-0">
            {contacts?.map((contact, index) => (
              <ListItem
                key={index}
                onClick={() => changeCurrentChat(index, contact)}
                className={index === currentSelected ? 'bg-white text-black' : 'text-white'}
              >
                <ListItemAvatar>
                  <Avatar src={contact.avatar} className="h-10 w-10 rounded-full overflow-hidden" />
                </ListItemAvatar>
                {!isMobile && <ListItemText>
                  <Typography variant="h6">{contact.username}</Typography>
                </ListItemText>}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </>
  );
}
