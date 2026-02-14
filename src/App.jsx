import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import CoursesPage from "./pages/Courses/CoursesPage";
import VocabularyLibraryPage from "./pages/Vocabulary/VocabularyLibraryPage";
import VocabularyPage from "./pages/Vocabulary/VocabularyPage";
import BookLibraryPage from "./pages/Books/BookLibraryPage";
import CourseCurriculumPage from "./pages/Courses/CourseCurriculumPage";
import CreateDeckPage from "./pages/Vocabulary/CreateDeckPage";
import BookReaderPage from "./pages/Books/BookReaderPage";
import WordUsagePage from "./pages/WordUsage/WordUsagePage";
import LessonFeedbackPage from "./pages/Grammar/LessonFeedbackPage";
import ListeningPracticePage from "./pages/Listening/ListeningPracticePage";
import ReadingPage from "./pages/Reading/ReadingPage";
import WritingChallengePage from "./pages/Writing/WritingChallengePage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UserProfilePage from "./pages/Profile/UserProfilePage";
import LessonBuilder from "./pages/Admin/LessonBuilder";
import CourseManager from "./pages/Admin/CourseManager";
import ListeningBuilder from "./pages/Admin/ListeningBuilder";
import WritingBuilder from "./pages/Admin/WritingBuilder";
import ReadingBuilder from "./pages/Admin/ReadingBuilder";
import SpeakingBuilder from "./pages/Admin/SpeakingBuilder";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Dashboard Layout */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route index path="/" element={<Home />} />

                {/* Others Page */}
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/courses/:courseId" element={<CourseCurriculumPage />} />
                <Route path="/courses/:courseId/grammar" element={<LessonFeedbackPage />} />
                <Route path="/courses/:courseId/listening" element={<ListeningPracticePage />} />
                <Route path="/courses/:courseId/reading" element={<ReadingPage />} />
                <Route path="/courses/:courseId/writing" element={<WritingChallengePage />} />
                <Route path="/vocabulary" element={<VocabularyLibraryPage />} />
                <Route path="/vocabulary/create" element={<CreateDeckPage />} />
                <Route path="/vocabulary/study/:deckId" element={<VocabularyPage />} />
                <Route path="/vocabulary/edit/:deckId" element={<CreateDeckPage />} />
                <Route path="/book-library" element={<BookLibraryPage />} />
                <Route path="/book-library/:bookId" element={<BookReaderPage />} />
                <Route path="/word-usage" element={<WordUsagePage />} />
                <Route path="/profile" element={<UserProfilePage />} />

                {/* Admin Pages TEST */}
                <Route path="/admin/course-manage" element={<CourseManager />} />
                <Route path="/admin/grammar-builder" element={<LessonBuilder />} />
                <Route path="/admin/listening-builder" element={<ListeningBuilder />} />
                <Route path="/admin/writing-builder" element={<WritingBuilder />} />
                <Route path="/admin/reading-builder" element={<ReadingBuilder />} />
                <Route path="/admin/speaking-builder" element={<SpeakingBuilder />} />


                <Route path="/calendar" element={<Calendar />} />
                <Route path="/blank" element={<Blank />} />

                {/* Forms */}
                <Route path="/form-elements" element={<FormElements />} />

                {/* Tables */}
                <Route path="/basic-tables" element={<BasicTables />} />

                {/* Ui Elements */}
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/avatars" element={<Avatars />} />
                <Route path="/badge" element={<Badges />} />
                <Route path="/buttons" element={<Buttons />} />
                <Route path="/images" element={<Images />} />
                <Route path="/videos" element={<Videos />} />

                {/* Charts */}
                <Route path="/line-chart" element={<LineChart />} />
                <Route path="/bar-chart" element={<BarChart />} />
              </Route>
            </Route>

            {/* Auth Layout */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}
