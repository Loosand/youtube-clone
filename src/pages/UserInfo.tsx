import { Button, CssBaseline, TextField, Box, Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useState, useEffect } from 'react'

import { updateProfileAPI, getProfileAPI } from '@/api/user'
import { uploadPicAPI } from '@/api/vod'
import { Toast } from '@/components'
import { useStore } from '@/store'

type Form = {
  username: string
  email: string
  password: string
  repassword?: string
  channelDescription: string
}

export default function UserInfo() {
  const {
    setToast,
    setAvatar: setStoreAvatar,
    setUsername,
    setUserId,
  } = useStore()
  const [avatarUrl, setAvatarUrl] = useState('')
  const [avatar, setAvatar] = useState<string>()

  const [form, setForm] = useState<Form>({
    username: '',
    email: '',
    password: '',
    repassword: '',
    channelDescription: '',
  })

  useEffect(() => {
    getProfileAPI().then((res) => {
      setForm(res.data)
      setAvatarUrl(res.data.avatar)
    })
  }, [])

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleAvatarChange = async (e) => {
    const file = await e.target.files[0]

    const reader = new FileReader()
    reader.onload = (e) => {
      setAvatar(e.target.result as string)
    }
    reader.readAsDataURL(file)

    const formData = new FormData()
    formData.append('file', file)

    uploadPicAPI(formData).then((res) => {
      setAvatarUrl(res.data)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.password !== form.repassword) {
      setToast('两次密码不一致', 'warning')
      return
    }

    updateProfileAPI({ ...form, avatar: avatarUrl })
      .then((res) => {
        setToast(res.message, 'success')
        setStoreAvatar(res?.data.avatar)
        setUsername(res?.data.username)
        setUserId(res?.data.id)
      })
      .catch((error) => {
        setToast(error.response.data.error, 'error')
      })
  }

  const Input = styled('input')({
    display: 'none',
  })

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box className='mt-8 flex flex-col items-center'>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              name='username'
              onChange={handleChange}
              value={form.username}
              label='用户名'
              margin='normal'
              fullWidth
            />
            <TextField
              name='email'
              onChange={handleChange}
              value={form.email}
              label='邮箱'
              margin='normal'
              fullWidth
              autoComplete='email'
              type='email'
            />
            <TextField
              name='password'
              type='password'
              onChange={handleChange}
              label='密码'
              margin='normal'
              fullWidth
            />
            <TextField
              name='repassword'
              type='password'
              onChange={handleChange}
              label='确认密码'
              margin='normal'
              fullWidth
            />
            <TextField
              name='channelDescription'
              onChange={handleChange}
              value={form.channelDescription}
              label='简介'
              margin='normal'
              multiline
              rows={4}
              fullWidth
            />
            <Box className='mt-4 flex items-center gap-5'>
              <Input
                accept='image/*'
                id='contained-button-avatar'
                onChange={handleAvatarChange}
                name='cover'
                type='file'
              />

              <label
                className='flex flex-col items-center gap-4'
                htmlFor='contained-button-avatar'>
                <span className='font-base self-start pl-4 text-sm text-gray-600 '>
                  上传头像
                </span>

                <img
                  className='h-64 w-64 border-2 border-dashed'
                  src={avatarUrl ? avatarUrl : avatar}
                  alt='avatar'
                />
              </label>
            </Box>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}>
              修改信息
            </Button>
          </Box>
        </Box>
      </Container>
      <Toast />
    </>
  )
}
