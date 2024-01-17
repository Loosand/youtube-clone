import { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Button, CssBaseline, TextField, Box, Container } from '@mui/material'
import { Image as ImageIcon } from '@mui/icons-material'
import { updateProfileAPI, getProfileAPI } from '@/api/user'
import { useEffect } from 'react'
import { useStore } from '@/store'
import Toast from '@/components/common/Toast'

type Form = {
  username: string
  email: string
  password: string
  repassword?: string
  channelDescription: string
}

export default function UserInfo() {
  const { setToast } = useStore()

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
    })
  }, [])

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.password !== form.repassword) {
      setToast('两次密码不一致', 'warning')
      return
    }

    updateProfileAPI(form)
      .then((res) => {
        setToast(res.message, 'success')
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
            <Box className='mt-4'>
              <label htmlFor='contained-button-file'>
                <Input
                  accept='image/*'
                  id='contained-button-file'
                  onChange={handleChange}
                  name='avatar'
                  type='file'
                />
                <Button
                  startIcon={<ImageIcon />}
                  variant='contained'
                  component='span'>
                  上传头像
                </Button>
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
