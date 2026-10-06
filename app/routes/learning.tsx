import { useState, type FormEvent } from "react";
import type { Route } from "./+types/learning";
import { Link } from "react-router";
import { ArrowUpRight } from "../components/icons";
import { Footer, Nav } from "../components/site";
import { courses } from "../data/courses";

type Discussion = {
  id: number;
  title: string;
  body: string;
  replies: string[];
};

const starterDiscussions: Discussion[] = [
  {
    id: 1,
    title: "What should I know before my first PLC lesson?",
    body: "Which control-circuit concepts would you want to review before getting started?",
    replies: [],
  },
  {
    id: 2,
    title: "Choosing cable for a home inverter setup",
    body: "What questions come up for you when learning about cable sizing and inverter installations?",
    replies: [],
  },
  {
    id: 3,
    title: "Share your workshop practice tips",
    body: "What small habits have helped you work more safely and accurately?",
    replies: [],
  },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Learning Hub | Bilatec" },
    {
      name: "description",
      content: "Explore practical skills courses and join the Bilatec learner community.",
    },
  ];
}

export default function Learning() {
  const [discussions, setDiscussions] = useState(starterDiscussions);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [replyDrafts, setReplyDrafts] = useState<Record<number, string>>({});

  function startDiscussion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDiscussions((current) => [
      { id: Date.now(), title, body, replies: [] },
      ...current,
    ]);
    setTitle("");
    setBody("");
  }

  function addReply(event: FormEvent<HTMLFormElement>, discussionId: number) {
    event.preventDefault();
    const reply = replyDrafts[discussionId]?.trim();
    if (!reply) return;
    setDiscussions((current) => current.map((discussion) =>
      discussion.id === discussionId
        ? { ...discussion, replies: [...discussion.replies, reply] }
        : discussion,
    ));
    setReplyDrafts((current) => ({ ...current, [discussionId]: "" }));
  }

  return (
    <div className="site-shell">
      <Nav />
      <main>
        <section className="learning-hero">
          <div>
            <p className="eyebrow">Learn a skill. Share what works.</p>
            <h1>Good work<br />starts with <em>learning.</em></h1>
            <p>Explore practical training, trade notes with other learners, and keep building confidence one skill at a time.</p>
            <a className="text-link" href="#courses">Explore courses <ArrowUpRight /></a>
          </div>
          <div className="learning-hero-art">
            <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=85" alt="Technicians practicing hands-on skills in a workshop" />
            <span className="learning-art-sun" />
            <strong>LEARN<br />BY DOING</strong>
            <small>SKILLS / PRACTICE / COMMUNITY</small>
          </div>
        </section>

        <section className="section learning-courses" id="courses">
          <div className="learning-section-heading">
            <div><p className="eyebrow">Find your next skill</p><h2>Practical paths.<br /><em>Real progress.</em></h2></div>
            <p>Choose a hands-on course and get started with skills you can put to work.</p>
          </div>
          <div className="learning-course-grid">
            {courses.map((course, index) => (
              <Link className="learning-course" key={course.slug} to={`/products/${course.slug}`}>
                <span className="learning-course-number">{String(index + 1).padStart(2, "0")} / {course.category}</span>
                <h3>{course.title}</h3>
                <p>{course.summary}</p>
                <span className="learning-course-link">View course <ArrowUpRight /></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="discussion-section" id="community">
          <div className="discussion-layout">
            <div className="discussion-heading">
              <p className="eyebrow">The learning community</p>
              <h2>Ask it.<br /><em>Work it out.</em></h2>
              <p>Share a question from your training or help someone else get unstuck.</p>
              <form className="discussion-form" onSubmit={startDiscussion}>
                <label>Start a discussion<input required maxLength={100} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="What are you learning?" /></label>
                <label>Your question or note<textarea required maxLength={500} rows={4} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Add a little context for other learners" /></label>
                <button className="button button-yellow" type="submit">Post to the community <ArrowUpRight /></button>
              </form>
            </div>
            <div className="discussion-list" aria-live="polite">
              {discussions.map((discussion) => (
                <article className="discussion-thread" key={discussion.id}>
                  <span className="discussion-tag">Discussion prompt</span>
                  <h3>{discussion.title}</h3>
                  <p>{discussion.body}</p>
                  <div className="discussion-replies">
                    <strong>{discussion.replies.length} {discussion.replies.length === 1 ? "reply" : "replies"}</strong>
                    {discussion.replies.map((reply, index) => <p key={`${discussion.id}-${index}`}>{reply}</p>)}
                  </div>
                  <form className="reply-form" onSubmit={(event) => addReply(event, discussion.id)}>
                    <label className="visually-hidden" htmlFor={`reply-${discussion.id}`}>Write a reply to {discussion.title}</label>
                    <input id={`reply-${discussion.id}`} value={replyDrafts[discussion.id] ?? ""} onChange={(event) => setReplyDrafts((current) => ({ ...current, [discussion.id]: event.target.value }))} placeholder="Add a helpful reply" />
                    <button type="submit" aria-label="Post reply"><ArrowUpRight /></button>
                  </form>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}