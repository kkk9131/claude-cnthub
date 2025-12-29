import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SessionList } from "./components/SessionList";
import { ChatView } from "./components/ChatView";
import { SearchPage } from "./pages/SearchPage";
import { WorkItemsPage } from "./pages/WorkItemsPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SessionList />} />
        <Route path="/sessions" element={<SessionList />} />
        <Route path="/sessions/:id" element={<ChatView />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/work-items" element={<WorkItemsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
