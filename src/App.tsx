import { Route, Routes } from "react-router"
import Layout from "./components/Layout"
import CGU from "./pages/CGU"
import NotFoundPage from "./pages/notFoundPage"
import { LandingPage } from "./pages/landingPage"

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/CGU" element={<CGU />} />
          <Route path="/challenges" element={<p>Challenges</p>} />
          <Route path="/challenges/:challengeId" element={<p>Challenge</p>} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
