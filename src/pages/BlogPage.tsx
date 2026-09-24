import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Animation";
import { FULL_POSTS } from "../data/portfolio";
import { useSEO } from "../hooks/useSEO";
import { usePageNavigation } from "../hooks/usePageNavigation";

export function BlogPage() {
  usePageNavigation();
  useSEO({
    title: "Articles & Writings | Ahmad Ibrahim",
    description:
      "Technical articles and insights by Ahmad Ibrahim on React, Node.js, SaaS architecture, and modern web development.",
    keywords: "Ahmad Ibrahim, Blog, React, Node.js, SaaS Architecture",
    path: "/blog",
  });
  return (
    <main id="main-content" className="blog-page">
      <div className="shell article-shell">
        <Link to="/" className="text-link">
          <ArrowLeft size={16} /> Back to portfolio
        </Link>
        <Reveal>
          <div className="eyebrow">THE DEVELOPER'S NOTEBOOK</div>
          <h1>
            Ideas worth
            <br />
            <span className="gradient-text">writing down.</span>
          </h1>
          <p className="large-copy muted">
            My technical writings, tutorials, and lessons along the way.
          </p>
        </Reveal>
        <div className="article-list">
          {FULL_POSTS.map((post) => (
            <article id={post.id} key={post.id} className="article-card">
              <div className="eyebrow">
                {post.category}
                <span className="muted">{post.date}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <div className="article-foot">
                <span>{post.readTime}</span>
                <a
                  href={`#${post.id}`}
                  className="text-link"
                  aria-label={`Link to ${post.title}`}
                >
                  Article link <ArrowUpRight size={15} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
