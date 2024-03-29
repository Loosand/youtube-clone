import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from '@mui/material'

import { UploadQuick, Upload } from '@/components'
import { useStore } from '@/store'

const steps = ['快速上传', '视频设置']

export default function UploadStep() {
  const { selectedFile, activeStep, setStepNext, setStepBack } = useStore()

  const handleNext = () => {
    setStepNext()
  }

  const handleBack = () => {
    setStepBack()
  }

  return (
    <>
      {/* 步骤速览 */}
      <Stepper className='m-auto w-full' activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {}
          const labelProps = {}

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>

      {/* Content */}
      <Box className='mt-6 flex min-h-[500px] flex-col items-center justify-center'>
        {activeStep === 0 ? <UploadQuick /> : <Upload />}
      </Box>

      {/* 当前步骤 */}
      {activeStep === steps.length ? (
        <Box>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
        </Box>
      ) : (
        <Box className='flex pt-2'>
          <Button
            color='inherit'
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}>
            上一步
          </Button>
          <Box className='flex-auto' />

          <Button disabled={!selectedFile} onClick={handleNext}>
            {activeStep === steps.length - 1 ? '' : '下一步'}
          </Button>
        </Box>
      )}
    </>
  )
}
