import type { Route } from "./+types/products";
import { Link, useParams } from "react-router";
import { ArrowUpRight, Check } from "../components/icons";
import { ButtonLink, Footer, Nav } from "../components/site";
import { courses } from "../data/courses";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Practical Skills Courses | Bilatec" },
    {
      name: "description",
      content: "Explore hands-on technical and trade skills training with Bilatec.",
    },
  ];
}

export default function Product() {
  const { slug } = useParams();
  const course = courses.find((item) => item.slug === slug);

  if (!course) {
    return (
      <div className="site-shell">
        <Nav />
        <main className="course-not-found">
          <p className="eyebrow">Course not found</p>
          <h1>Let&apos;s find<br /><em>your next skill.</em></h1>
          <ButtonLink to="/learning">Browse the learning hub <ArrowUpRight /></ButtonLink>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="site-shell">
      <Nav />
      <main>
        <section className="course-hero">
          <div>
            <p className="eyebrow">{course.category} / Practical training</p>
            <h1>{course.title}</h1>
            <p>{course.summary}</p>
            <ButtonLink to={`/contact?course=${course.slug}`}>Ask about this course <ArrowUpRight /></ButtonLink>
          </div>
          <div className="course-visual" aria-hidden="true">
            <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=85" alt="" />
            <span>LEARN</span>
            <strong>01</strong>
            <small>Skills for the work ahead.</small>
          </div>
        </section>
        <section className="section course-outline">
          <div className="course-outline-heading">
            <p className="eyebrow">What you&apos;ll practice</p>
            <h2>Build skills<br /><em>by doing.</em></h2>
          </div>
          <div className="course-topic-list">
            {course.topics.map((topic, index) => (
              <article key={topic}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{topic}</h3>
                <Check />
              </article>
            ))}
          </div>
        </section>
        <section className="course-community">
          <div>
            <p className="eyebrow">Keep learning together</p>
            <h2>Questions make<br /><em>good practice.</em></h2>
          </div>
          <p>Compare notes, ask for help, and learn from other people building the same skills.</p>
          <Link className="text-link" to="/learning">Visit the learning hub <ArrowUpRight /></Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}