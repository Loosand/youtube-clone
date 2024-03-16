import { useStore } from '@/store'

export default function useCheckIsSelf(userId: string) {
  const { userId: myId } = useStore()

  if (userId === String(myId)) {
    return true
  }

  return false
}
