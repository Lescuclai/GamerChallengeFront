import { Route, Routes } from "react-router";
import Layout from "./components/Layout/Layout";
import NotFoundPage from "./pages/notFoundPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/challenges" element={<p>Challenges</p>} />
          <Route path="/challenges/:challengeId" element={<p>Challenge</p>} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
