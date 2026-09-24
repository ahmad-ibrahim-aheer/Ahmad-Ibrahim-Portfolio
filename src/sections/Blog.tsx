import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeader } from "../components/SectionHeader";
import { Reveal } from "../components/Animation";
import { POSTS, FULL_POSTS } from "../data/portfolio";

export function Blog() {
  return (
    <section id="blog" className="section section-tinted">
      <div className="shell">
        <SectionHeader
          number="06"
          subtitle="Notes & perspectives"
          title="Learning, out loud."
          description="Thoughts on architecture, the frontend, and the decisions behind the code."
        />
        <div className="writing-list">
          {POSTS.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.05}>
              <Link className="writing-row" to={`/blog#${FULL_POSTS[i].id}`}>
                <span className="writing-category">{post.category}</span>
                <div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className="writing-meta">
                    {post.date} <span>·</span> {post.readTime}
                  </span>
                </div>
                <ArrowUpRight size={23} />
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="writing-footer">
          <Link to="/blog" className="text-link">
            View all articles <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
