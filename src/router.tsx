import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function RouterPage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

function PageNotFound() {
  return <div>404</div>
}
