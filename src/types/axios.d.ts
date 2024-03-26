// 新建 axios.d.ts
import axios from 'axios'

declare module 'axios' {
  interface IAxios {
    code: string
    message: string
    error?: string
  }
  export interface AxiosResponse extends IAxios {}
}
