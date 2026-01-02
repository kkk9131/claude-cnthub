import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SessionList } from "./components/SessionList";
import { ChatView } from "./components/ChatView";
import { SearchPage } from "./pages/SearchPage";
import { WorkItemsPage } from "./pages/WorkItemsPage";
import { ViewerPage } from "./pages/ViewerPage";

function App() {
  return (
    <Routes>
      {/* Viewer ページは独自レイアウトを使用 */}
      <Route path="/" element={<ViewerPage />} />

      {/* その他のページは共通レイアウトを使用 */}
      <Route
        path="/sessions"
        element={
          <Layout>
            <SessionList />
          </Layout>
        }
      />
      <Route
        path="/sessions/:id"
        element={
          <Layout>
            <ChatView />
          </Layout>
        }
      />
      <Route
        path="/search"
        element={
          <Layout>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/work-items"
        element={
          <Layout>
            <WorkItemsPage />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
