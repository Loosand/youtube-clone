import { FormEvent, FormEventHandler, useState } from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material'
import { loginAPI } from '@/api/user'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/store'
import Toast from '@/components/common/Toast'
import useDebounce from '@/hooks/useDebonce'

type Form = {
  email: string
  password: string
}

export default function Login() {
  const { setToast } = useStore()
  const { setToken, email, password } = useStore()

  const navigator = useNavigate()

  const [form, setForm] = useState<Form>({
    email,
    password,
  })
  const [remember, setRemember] = useState(true)

  const handleRemember = () => {
    setRemember(!remember)
  }

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: FormEvent, loginForm: Form) => {
    e.preventDefault()

    try {
      const res = await loginAPI(loginForm)
      if (remember) setToken(res.data.token)
      setToast(res.message, 'success')

      navigator('/')
    } catch (error) {
      setToast(error.response.data.error, 'error')
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Toast />
      <CssBaseline />
      <Box className='mt-10 flex flex-col items-center'>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
        <Typography component='h1' variant='h5'>
          登录
        </Typography>

        <Box
          className='mt-2'
          component='form'
          onSubmit={(e) => handleSubmit(e, form)}
          noValidate>
          <TextField
            name='email'
            onChange={handleChange}
            value={form.email}
            defaultValue={form.email}
            label='电子邮箱'
            required
            margin='normal'
            fullWidth
            autoComplete='email'
            type='email'
            autoFocus
          />
          <TextField
            name='password'
            onChange={handleChange}
            value={form.password}
            defaultValue={form.password}
            label='密码'
            type='password'
            required
            margin='normal'
            fullWidth
            autoComplete='current-password'
          />
          <FormControlLabel
            control={
              <Checkbox
                name='remember'
                onChange={handleRemember}
                checked={remember}
                aria-label='记住我'
                color='primary'
              />
            }
            label='记住我'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}>
            登录
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' paddingY={3} variant='body2'>
                忘记密码？
              </Link>
            </Grid>
            <Grid item>
              <Link href='register' paddingY={3} variant='body2'>
                {'没有账号？点击注册'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
