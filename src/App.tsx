import { Route, Routes } from "react-router";
import NotFoundPage from "./pages/notFoundPage";
import { BoardCard } from "./components/BoardCard/BoardCard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<p>Home</p>} />
        <Route path="/challenges" element={<p>Challenges</p>} />
        <Route path="/challenges/:challengeId" element={<p>Challenge</p>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <BoardCard />
    </>
  );
}

export default App;
