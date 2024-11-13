import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "@pages/MainPage/page";
import LoginPage from "@pages/LoginPage/page";
import WriteDiaryPage from "@pages/WriteDiaryPage/page";
import LikedPage from "@pages/LikedPage/page";
import ErrorPage from "@pages/ErrorPage/page";
import DiaryPage from "@pages/DiaryPage/page";
import SearchPage from "@pages/SearchPage/page";
import OAuthRedirectHandler from "@pages/LoginPage/loginHandler/oauthHandler";
import CommonRoute from "./routes/CommonRoute";
import SharedPage from "@pages/SharedPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route element={<CommonRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/oauth" element={<OAuthRedirectHandler />} />
        </Route>
        <Route path="/write/:tempId" element={<WriteDiaryPage />} />
        <Route path="/liked" element={<LikedPage />} />
        <Route path="/diary/:diaryId" element={<DiaryPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/shared/:imageUrl" element={<SharedPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
