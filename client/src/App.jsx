import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";

const Docs = lazy(() => import("./pages/Doc"));




const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>

            {/* ================= PUBLIC ROUTES ================= */}
            {/* <Route element={<Layout />}> */}
              <Route path="/" element={<Navigate to="/docs" replace />} />
              <Route path="/docs" element={<Docs/>} />
            {/* </Route> */}
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;