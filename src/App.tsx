import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import "./App.css";
import CommonRoute from "./routes/CommonRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import ScrollTo from "@utils/ScrollTo";
import LoadingSpinner from "@components/loading/LoadingSpinner";
import NotFoundError from "@pages/ErrorPage/errors/NotFoundError";

const OAuthRedirectHandler = React.lazy(() => import("@pages/LoginPage/loginHandler/oauthHandler"));
const LoginPage = React.lazy(() => import("@pages/LoginPage/page"));
const MainPage = React.lazy(() => import("@pages/MainPage/page"));
const LikedPage = React.lazy(() => import("@pages/LikedPage/page"));
const DiaryPage = React.lazy(() => import("@pages/DiaryPage/page"));
const SearchPage = React.lazy(() => import("@pages/SearchPage/page"));
const SharedPage = React.lazy(() => import("@pages/SharedPage"));
const WriteDiaryPage = React.lazy(() => import("@pages/WriteDiaryPage/page/index"));

function App() {
  return (
    <Router>
      <ScrollTo />
      <Suspense
        fallback={
          <div className="h-screen">
            <LoadingSpinner />
          </div>
        }
      >
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
      </Suspense>
    </Router>
  );
}

export default App;
