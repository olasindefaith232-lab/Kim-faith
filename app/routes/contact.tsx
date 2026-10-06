import type { Route } from "./+types/contact";
import { useSearchParams } from "react-router";
import { ArrowUpRight, Check } from "../components/icons";
import { Footer, Nav } from "../components/site";
import { courses } from "../data/courses";

export function meta({}: Route.MetaArgs) { return [{ title: "Course Enquiries | Bilatec" }, { name: "description", content: "Ask about practical skills and trade training courses at Bilatec." }]; }

export default function Contact() {
	const [searchParams] = useSearchParams();
	const selectedCourse = courses.find((course) => course.slug === searchParams.get("course"));

	return (
		<div className="site-shell">
			<Nav />
			<main>
				<section className="contact-section">
					<div className="contact-intro">
						<p className="eyebrow">Let&apos;s plan what&apos;s next</p>
						<h1>Ready to build<br /><em>your skills?</em></h1>
						<p>Tell us what you would like to learn and our training team will help you find the right course. We&apos;ll get back to you within one business day.</p>
						<div className="contact-details">
							<span>Prefer email?</span>
							<a href="mailto:hello@bilatec.com">hello@bilatec.com <ArrowUpRight /></a>
							<span>Call the training team</span>
							<a href="tel:+18002452832">1 800 BILATEC <ArrowUpRight /></a>
						</div>
					</div>
					<form className="contact-form" onSubmit={(event) => event.preventDefault()}>
						<label>Your name<input type="text" placeholder="Jane Smith" /></label>
						<label>Email address<input type="email" placeholder="jane@example.com" /></label>
						<label>What would you like to learn?<textarea placeholder="Tell us what skills you want to build" rows={4} /></label>
						<label className="select-label">Course or skill of interest
							<select defaultValue={selectedCourse?.slug ?? ""}>
								<option value="" disabled>Select one</option>
								{courses.map((course) => <option key={course.slug} value={course.slug}>{course.title}</option>)}
								<option value="other">Something else / not sure yet</option>
							</select>
						</label>
						<button className="button button-yellow" type="submit">Send my enquiry <ArrowUpRight /></button>
						<small>We&apos;ll only use your details to respond to your training enquiry.</small>
					</form>
				</section>
				<section className="contact-reassurance">
					<div><Check /><span><strong>Practical course guidance</strong><small>Get help choosing where to start.</small></span></div>
					<div><Check /><span><strong>Hands-on learning</strong><small>Build skills through workshop practice.</small></span></div>
					<div><Check /><span><strong>Real people, real support</strong><small>Ask questions before you enroll.</small></span></div>
				</section>
			</main>
			<Footer />
		</div>
	);
}