import { Routes, Route, Navigate } from "react-router-dom";
import { ViewerPage } from "./pages/ViewerPage";

function App() {
  return (
    <Routes>
      {/* Viewer ページは独自レイアウトを使用 */}
      <Route path="/" element={<ViewerPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
