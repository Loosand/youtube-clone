import { Close as CloseIcon } from '@mui/icons-material'
import {
  styled,
  Dialog,
  Box,
  IconButton,
  DialogTitle,
  DialogContent,
} from '@mui/material'
import React from 'react'

import { UploadStep } from '@/components'
import { useStore } from '@/store'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle className='m-0 p-2' {...other}>
      {children}
      {onClose ? (
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

export default function UploadDialog() {
  const { uploadState, setUploadState, selectedFile } = useStore()

  const handleUploadClose = () => {
    setUploadState(false)
  }

  return (
    <BootstrapDialog
      maxWidth='lg'
      onClose={handleUploadClose}
      open={uploadState}>
      <BootstrapDialogTitle className='h-16' onClose={handleUploadClose}>
        {selectedFile?.name}
      </BootstrapDialogTitle>
      <DialogContent divider>
        <Box className='my-4 min-w-[50vw] px-16'>
          <UploadStep />
        </Box>
      </DialogContent>
    </BootstrapDialog>
  )
}
