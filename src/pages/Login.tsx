import LoadingButton from '@mui/lab/LoadingButton'
import {
  Avatar,
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
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { loginAPI } from '@/api/user'
import { useStore } from '@/store'

type Form = {
  email: string
  password: string
  remember: boolean
}

export default function Login() {
  const navigator = useNavigate()
  const { setToast } = useStore()
  const { setToken, email, password } = useStore()

  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<Form>({
    email,
    password,
    remember: false,
  })

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: FormEvent, loginForm: Form) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await loginAPI(loginForm)
      setLoading(false)

      if (form.remember) setToken(res.data.token)
      setToast(res.message, 'success')

      navigator('/')
    } catch (error) {
      setLoading(true)
      setToast(error.response.data.error, 'error')
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
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
                onChange={() => {
                  handleChange({
                    target: {
                      name: 'remember',
                      value: !form.remember,
                    },
                  })
                }}
                checked={form.remember}
                aria-label='记住我'
                color='primary'
              />
            }
            label='记住我'
          />
          <LoadingButton
            disabled={loading}
            loading={loading}
            type='submit'
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            variant='contained'>
            登录
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href='#' paddingY={3} variant='body2'>
                忘记密码？
              </Link>
            </Grid>
            <Grid item>
              <Link href='register' paddingY={3} variant='body2'>
                没有账号？点击注册
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
