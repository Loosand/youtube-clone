import ReactDOM from 'react-dom/client'
import { QueryClientProvider, QueryClient } from 'react-query'
import './index.css'
import App from './App.tsx'
import Toast from './components/common/Toast.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Toast />
    <App />
  </QueryClientProvider>,
)
