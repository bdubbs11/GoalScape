import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './views/components/Layout.jsx'
import Home from './views/Home.jsx'
import AddGoals from './views/AddGoals.jsx'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/addGoals" element={<AddGoals />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
