import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "@pages/MainPage/page";
import LoginPage from "@pages/LoginPage/page";
import WriteDiaryPage from "@pages/WriteDiaryPage/page";
import LikedPage from "@pages/LikedPage/page";
import DiaryPage from "@pages/DiaryPage/page";
import SearchPage from "@pages/SearchPage/page";
import OAuthRedirectHandler from "@pages/LoginPage/loginHandler/oauthHandler";
import CommonRoute from "./routes/CommonRoute";
import SharedPage from "@pages/SharedPage";
import NotFoundError from "@pages/ErrorPage/errors/NotFoundError";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<CommonRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/oauth" element={<OAuthRedirectHandler />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/write/:tempId" element={<WriteDiaryPage />} />
          <Route path="/liked" element={<LikedPage />} />
          <Route path="/diary/:diaryId" element={<DiaryPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
        <Route path="/share" element={<SharedPage />} />
        <Route path="*" element={<NotFoundError />} />
      </Routes>
    </Router>
  );
}

export default App;
