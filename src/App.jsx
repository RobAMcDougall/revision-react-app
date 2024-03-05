import "./App.css";
import { ThemeProvider } from "./context/dark-theme context";
import { Route, Routes } from "react-router-dom";
import * as Pages from "./pages";
import PageWrapper from "./layout/PageWrapper";
// import { AuthProvider } from "./context/Auth";
// import ProtectedRoute from "./Router";

function App() {
  return (
    <ThemeProvider>
      {/* <AuthProvider> */}
      <Routes>
        {/* <Route
            path="/HomePage"
            element={<ProtectedRoute redirectTo="/login" />}
          > */}
        {/* <Route path="/HomePage" element={<PageWrapper />}> */}
          <Route path="/HomePage" element={<Pages.HomePage />} />
        {/* </Route> */}
        <Route path="/VideoTaking" element={<Pages.VideoTakingPage />} />
        {/* </Route> */}

        <Route path="/" element={<Pages.LandingPage />} />
        <Route path="/login" element={<Pages.LoginPage />} />

        <Route path="*" element={<Pages.NotFound />} />
      </Routes>
      {/* </AuthProvider> */}
    </ThemeProvider>
  );
}

export default App;
