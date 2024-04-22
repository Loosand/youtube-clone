import SendIcon from '@mui/icons-material/Send';
import { Paper, TextField, Button, Grid } from '@mui/material';
import React, { useState } from 'react';

const ChatInput = ({ handleSendMsg }) => {
  const [msg, setMsg] = useState('');

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>

      </Grid>
      <Paper className='flex p-8 pl-12 w-full items-center gap-4 justify-center dark:bg-slate-900 dark:text-white'>
        <TextField
          variant='outlined'
          fullWidth
          className='dark:bg-slate-800 flex-1 dark:text-white'
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          style={{ marginBottom: '1rem' }}
        />

        <Button
          color='primary'
          endIcon={<SendIcon />}
          onClick={(e) => { sendChat(e) }}>
          发送
        </Button>
      </Paper>
    </Grid>
  );
};



export default ChatInput;
