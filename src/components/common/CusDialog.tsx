import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

export default function CusDialog({
  open,
  onClose,
  onConfirm,
  title = '确认操作',
  content = '确认要执行该操作吗？',
}: {
  open: boolean
  onClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onConfirm: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  title?: string
  content?: string
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button onClick={onConfirm}>确定</Button>
      </DialogActions>
    </Dialog>
  )
}
