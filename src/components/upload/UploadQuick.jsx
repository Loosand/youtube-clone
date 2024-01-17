import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Typography, Button, IconButton, Box } from '@mui/material'
import { FileUpload as FileUploadIcon } from '@mui/icons-material'
import { useStore } from '@/store'

export default function UploadQuick() {
  const { setSelectedFile, setStepNext } = useStore()
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (file) => {
    setSelectedFile(file)
    setStepNext()
  }

  const Input = styled('input')({
    display: 'none',
  })

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    handleFileChange(file)
    setIsDragging(false)
  }

  return (
    <>
      <Box
        className={`mb-8 space-y-4 rounded-lg border border-dashed border-gray-300 px-72 py-40 text-center ${
          isDragging ? 'bg-gray-200' : ''
        }`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        <IconButton sx={{ padding: 6 }} color='inherit'>
          <FileUploadIcon
            sx={{
              fontSize: 60,
              color: '#909090',
            }}
          />
        </IconButton>
        <Typography variant='h6' fontWeight={'normal'}>
          将要上传的视频文件拖放到此处
        </Typography>
      </Box>

      <label htmlFor='contained-video-file'>
        <Input
          onChange={(e) => handleFileChange(e.target.files[0])}
          accept='video/*'
          id='contained-video-file'
          multiple
          type='file'
        />
        <Button variant='contained' size='large' component='span'>
          上传视频
        </Button>
      </label>
    </>
  )
}
