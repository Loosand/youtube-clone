import React, { useState, useCallback } from 'react'
import { styled } from '@mui/material/styles'
import { Typography, TextField, Button, Box } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import {
  FileUpload as FileUploadIcon,
  Image as ImageIcon,
} from '@mui/icons-material'
import { useStore } from '@/store'
import { createVideoAPI } from '@/api/video'
import {
  createUploadVideoAPI,
  refreshUploadVideoAPI,
  uploadPicAPI,
} from '@/api/vod'

export default function Upload() {
  const [loading, setLoading] = useState(false)
  const [submitResult, setSubmitResult] = useState('开始上传')
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [cover, setCover] = useState()
  const [coverUrl, setCoverUrl] = useState()
  const { selectedFile } = useStore()
  const videoURL = useCallback(URL.createObjectURL(selectedFile), [])

  const [form, setForm] = useState({
    title: selectedFile?.name,
    description: '',
    vodVideoId: '',
  })

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleCoverChange = async (e) => {
    const file = await e.target.files[0]
    setCover(file)
  }

  const createUploader = () => {
    const uploader = new window.AliyunUpload.Vod({
      // userID，必填，您可以使用阿里云账号访问账号中心（https://account.console.aliyun.com/），即可查看账号ID
      userId: '1264280159456697',
      // 分片大小默认1 MB，不能小于100 KB（100*1024）
      partSize: 1048576,
      // 并行上传分片个数，默认5
      parallel: 5,
      // 网络原因失败时，重新上传次数，默认为3
      retryCount: 3,
      // 网络原因失败时，重新上传间隔时间，默认为2秒
      retryDuration: 2,
      enableUploadProgress: true,
      // 开始上传
      onUploadstarted: async function (uploadInfo) {
        setLoading(true)
        console.log('onUpload-----', uploadInfo)
        if (uploadInfo.videoId) {
          const data = await refreshUploadVideoAPI(uploadInfo.videoId)
          uploader.setUploadAuthAndAddress(
            uploadInfo,
            data.UploadAuth,
            data.UploadAddress,
            data.VideoId,
          )
        } else {
          const data = await createUploadVideoAPI({
            Title: uploadInfo?.file?.name,
            FileName: uploadInfo?.file?.name,
          })
          uploader.setUploadAuthAndAddress(
            uploadInfo,
            data.UploadAuth,
            data.UploadAddress,
            data.VideoId,
          )
        }
      },
      // 文件上传成功
      onUploadSucceed: async function (uploadInfo) {
        setSubmitResult('上传成功！')
        setSubmitSuccess(true)
        setLoading(false)
        console.log('onUploadSuccess', uploadInfo)
        form.vodVideoId = uploadInfo.videoId
        form.cover = coverUrl
        const data = await createVideoAPI(form)
        console.log('保存成功', data)
      },
      // 文件上传失败
      onUploadFailed: function (uploadInfo, code, message) {
        setSubmitResult('上传失败！')
        setLoading(false)
        console.log('onUploadFailed: ', uploadInfo, code, message)
      },
      // 文件上传进度，单位：字节
      onUploadProgress: function (uploadInfo, totalSize, loadedPercent) {
        setSubmitResult('正在上传...')
        console.log('onUploadProgress', `${Math.ceil(loadedPercent * 100)}%`)
      },
      // 上传凭证或STS token超时
      onUploadTokenExpired: async function (uploadInfo) {
        setSubmitResult('上传超时')
        const { data } = await refreshUploadVideoAPI(uploadInfo.videoId)
        uploader.resumeUploadWithAuth(data.UploadAuth)
        console.log('onUploadTokenExpired:', uploadInfo)
      },
      // 全部文件上传结束
      onUploadEnd: function (uploadInfo) {
        setSubmitResult('上传成功！')
        setLoading(false)
        console.log('onUploadEnd:', uploadInfo)
      },
    })

    return uploader
  }

  const uploadCover = () => {
    if (cover) {
      const formData = new FormData()
      formData.append('file', cover)

      uploadPicAPI(formData).then((res) => {
        setCoverUrl(res.data)
      })
    }
  }

  const handleUploadPic = () => {
    if (cover) {
      uploadCover()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const uploader = createUploader()
    const paramData = JSON.stringify({ Vod: {} })
    uploader.addFile(selectedFile, null, null, null, paramData)
    uploader.startUpload()
  }

  const Input = styled('input')({
    display: 'none',
  })

  return (
    <Box className='m-auto my-4 flex flex-col'>
      <Box className='grow basis-[400px]'>
        <Typography variant='h5' fontWeight='bold'>
          详细信息
        </Typography>
        <Box className='mt-5 flex justify-between gap-10'>
          <Box>
            <Box className='space-y-6'>
              <TextField
                name='title'
                onChange={handleChange}
                fullWidth
                label='标题'
                defaultValue={form.title}
                value={form.title}
              />
              <TextField
                name='description'
                onChange={handleChange}
                required
                defaultValue='这个用户什么也没有留下'
                value={form.description}
                label='简介'
                multiline
                fullWidth
                rows={4}
                placeholder='向观看者介绍你的视频'
              />
              <Box>
                <Input
                  accept='image/*'
                  id='contained-button-file'
                  onChange={handleCoverChange}
                  name='cover'
                  type='file'
                />

                <label
                  className='flex items-center gap-4'
                  htmlFor='contained-button-file'>
                  <img className='w-64' src={coverUrl} alt='' />
                  <Button
                    startIcon={<ImageIcon />}
                    variant='contained'
                    onClick={handleUploadPic}
                    component='span'>
                    上传封面
                  </Button>
                </label>
              </Box>
            </Box>
          </Box>
          <Box>{selectedFile && <VideoInterview videoURL={videoURL} />}</Box>
        </Box>
      </Box>

      <LoadingButton
        disabled={loading || submitSuccess}
        startIcon={<FileUploadIcon />}
        onClick={handleSubmit}
        loading={loading}
        variant='contained'
        color={submitResult === '上传成功！' ? 'success' : 'primary'}>
        {submitResult}
      </LoadingButton>
    </Box>
  )
}

const VideoInterview = React.memo(function VideoInterview({ videoURL }) {
  return (
    <video
      src={videoURL}
      controls
      width={300}
      className='aspect-video rounded-lg'
    />
  )
})
