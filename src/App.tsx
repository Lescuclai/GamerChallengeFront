import { Route, Routes } from "react-router"
import NotFoundPage from "./pages/notFoundPage"
import Layout from "./components/Layout"

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<p>Home</p>} />
          <Route path="/challenges" element={<p>Challenges</p>} />
          <Route path="/challenges/:challengeId" element={<p>Challenge</p>} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
