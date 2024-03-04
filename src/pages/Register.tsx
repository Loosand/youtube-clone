import { FormEvent, useState } from 'react'
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
import LoadingButton from '@mui/lab/LoadingButton'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { registerAPI } from '@/api/user'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/store'

type Form = {
  username: string
  email: string
  password: string
  repassword: string
}

export default function Register() {
  const navigator = useNavigate()
  const { setToast } = useStore()
  const { setEmail, setPassword } = useStore()

  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<Form>({
    username: '',
    email: '',
    password: '',
    repassword: '',
  })

  // 获取表单
  const handleChange = (e: any) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // 发起注册
  const handleSubmit = async (e: FormEvent, registerForm: Form) => {
    e.preventDefault()

    setLoading(true)
    setEmail(form.email)
    setPassword(form.password)

    try {
      if (form.password === form.repassword) {
        const res = await registerAPI(registerForm)
        setLoading(false)
        setToast(res.message, 'success')

        navigator('/login')
      } else {
        setToast('两次密码不一致', 'warning')
      }
    } catch (error) {
      setLoading(false)

      if (error.response.data.error < 500) {
        setToast(error.response.data.error, 'error')
      } else {
        setToast(error.response.data.error, 'warning')
      }
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box className='mt-8 flex flex-col items-center'>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          注册
        </Typography>
        <Box
          className='mt-2'
          component='form'
          noValidate
          onSubmit={(e) => handleSubmit(e, form)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                name='username'
                onChange={handleChange}
                value={form.username}
                defaultValue={form.username}
                required
                fullWidth
                label='用户名'
                autoComplete='given-name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='email'
                onChange={handleChange}
                value={form.email}
                defaultValue={form.email}
                required
                fullWidth
                label='邮箱'
                type='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='password'
                onChange={handleChange}
                value={form.password}
                defaultValue={form.password}
                required
                fullWidth
                label='密码'
                type='password'
                autoComplete='new-password'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='repassword'
                onChange={handleChange}
                value={form.repassword}
                defaultValue={form.repassword}
                required
                fullWidth
                label='确认密码'
                type='password'
                autoComplete='new-password'
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={true}
                    value='allowExtraEmails'
                    color='primary'
                  />
                }
                label='我同意 xxx 协议和 xxx 隐私政策'
              />
            </Grid>
          </Grid>
          <LoadingButton
            disabled={loading}
            loading={loading}
            type='submit'
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            variant='contained'>
            注册
          </LoadingButton>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='login' paddingX={3} variant='body2'>
                已有账户？点击登录
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
