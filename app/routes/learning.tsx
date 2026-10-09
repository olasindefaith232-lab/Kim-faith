import { useEffect, useState, type FormEvent } from "react";
import type { Route } from "./+types/learning";
import { Link } from "react-router";
import { ArrowUpRight } from "../components/icons";
import { Footer, Nav } from "../components/site";
import { courses } from "../data/courses";
import { requestApi } from "../lib/api";

type Discussion = {
  id: string;
  title: string;
  body: string;
  replies: string[];
};

const starterDiscussions: Discussion[] = [
  {
    id: "sample-plc",
    title: "What should I know before my first PLC lesson?",
    body: "Which control-circuit concepts would you want to review before getting started?",
    replies: [],
  },
  {
    id: "sample-inverter",
    title: "Choosing cable for a home inverter setup",
    body: "What questions come up for you when learning about cable sizing and inverter installations?",
    replies: [],
  },
  {
    id: "sample-workshop",
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
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [communityMessage, setCommunityMessage] = useState("");
  const [communityError, setCommunityError] = useState(false);

  useEffect(() => {
    requestApi<{ discussions: Discussion[] }>("/discussions")
      .then(({ discussions: loadedDiscussions }) => setDiscussions(loadedDiscussions))
      .catch(() => {
        setCommunityError(true);
        setCommunityMessage("The community feed is unavailable. Sample topics are shown.");
      });
  }, []);

  async function startDiscussion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCommunityError(false);
    try {
      const result = await requestApi<{ discussion: Discussion }>("/discussions", {
        method: "POST",
        body: JSON.stringify({ title, body }),
      });
      setDiscussions((current) => [result.discussion, ...current.filter((discussion) => !discussion.id.startsWith("sample-"))]);
      setTitle("");
      setBody("");
      setCommunityMessage("Discussion posted.");
    } catch (error) {
      setCommunityError(true);
      setCommunityMessage(error instanceof Error ? error.message : "Unable to post your discussion.");
    }
  }

  async function addReply(event: FormEvent<HTMLFormElement>, discussionId: string) {
    event.preventDefault();
    const reply = replyDrafts[discussionId]?.trim();
    if (!reply || discussionId.startsWith("sample-")) return;
    setCommunityError(false);
    try {
      const result = await requestApi<{ reply: { body: string } }>(`/discussions/${discussionId}/replies`, {
        method: "POST",
        body: JSON.stringify({ body: reply }),
      });
      setDiscussions((current) => current.map((discussion) => discussion.id === discussionId
        ? { ...discussion, replies: [...discussion.replies, result.reply.body] }
        : discussion));
      setReplyDrafts((current) => ({ ...current, [discussionId]: "" }));
      setCommunityMessage("Reply posted.");
    } catch (error) {
      setCommunityError(true);
      setCommunityMessage(error instanceof Error ? error.message : "Unable to post your reply.");
    }
  }

  return (
    <div className="site-shell">
      <Nav />
      <main>
        <section className="learning-hero">
          <div>
            <p className="eyebrow">Technical learning at Bilatec</p>
            <h1>Understand it.<br />Practise it.<br /><em>Build skill.</em></h1>
            <p>Explore focused learning in electrical work, solar, plumbing, fabrication, motor repair and automation. Each course connects core ideas with practical exercises.</p>
            <a className="text-link" href="#courses">Explore courses <ArrowUpRight /></a>
          </div>
          <div className="learning-hero-art">
            <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=85" alt="Learner working with technical equipment in a workshop" />
            <span className="learning-art-sun" />
            <strong>LEARN<br />BY DOING</strong>
            <small>SKILLS / PRACTICE / COMMUNITY</small>
          </div>
        </section>

        <section className="section learning-courses" id="courses">
          <div className="learning-section-heading">
            <div><p className="eyebrow">Find your next skill</p><h2>Practical paths.<br /><em>Real progress.</em></h2></div>
            <p>Choose a subject to see what you will study, understand and practise.</p>
          </div>
          <div className="learning-course-grid">
            {courses.map((course) => (
              <article className="learning-course" key={course.slug}>
                <img className="learning-course-image" src={course.image} alt="" />
                <span className="learning-course-number">{course.category}</span>
                <h3>{course.title}</h3>
                <p>{course.summary}</p>
                <Link className="learning-course-link" to={`/contact?type=training&course=${course.slug}`}>Ask about this course <ArrowUpRight /></Link>
              </article>
            ))}
          </div>
        </section>

        <section className="discussion-section" id="community">
          <div className="discussion-layout">
            <div className="discussion-heading">
              <p className="eyebrow">The learning community</p>
              <h2>Ask it.<br /><em>Work it out.</em></h2>
              <p>Share a question from your training or help someone else get unstuck.</p>
              {communityMessage && <p className={`community-message ${communityError ? "is-error" : "is-success"}`} role={communityError ? "alert" : "status"}>{communityMessage}</p>}
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
                    <input id={`reply-${discussion.id}`} value={replyDrafts[discussion.id] ?? ""} onChange={(event) => setReplyDrafts((current) => ({ ...current, [discussion.id]: event.target.value }))} placeholder="Add a helpful reply" disabled={discussion.id.startsWith("sample-")} />
                    <button type="submit" aria-label="Post reply" disabled={discussion.id.startsWith("sample-")}><ArrowUpRight /></button>
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