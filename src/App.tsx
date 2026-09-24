import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "motion/react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/Animation";
import { Home } from "./pages/Home";

const BlogPage = lazy(() =>
  import("./pages/BlogPage").then((module) => ({ default: module.BlogPage })),
);
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <div className="site">
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <ScrollProgress />
          <Navbar />
          <Suspense
            fallback={
              <main id="main-content" className="route-loading" role="status">
                Loading articles…
              </main>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route
                path="*"
                element={
                  <main id="main-content" className="route-loading">
                    <h1>Page not found</h1>
                    <a href="/" className="button primary">
                      Back to portfolio
                    </a>
                  </main>
                }
              />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </BrowserRouter>
    </MotionConfig>
  );
}
