import type { Route } from "./+types/contact";
import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router";
import { ArrowUpRight, Check } from "../components/icons";
import { Footer, Nav } from "../components/site";
import { courses } from "../data/courses";
import { products } from "../data/products";
import { requestApi } from "../lib/api";

export function meta({}: Route.MetaArgs) { return [{ title: "Contact Bilatec" }, { name: "description", content: "Contact Bilatec about products, projects, technical learning, or a general enquiry." }]; }

export default function Contact() {
	const [searchParams] = useSearchParams();
	const [submissionState, setSubmissionState] = useState<"idle" | "sending" | "success" | "error">("idle");
	const [submissionMessage, setSubmissionMessage] = useState("");
	const selectedCourse = courses.find((course) => course.slug === searchParams.get("course"));
	const selectedProduct = products.find((product) => product.slug === searchParams.get("product"));
	const enquiryType = searchParams.get("type") ?? "";

	async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.currentTarget;
		const values = new FormData(form);
		setSubmissionState("sending");
		setSubmissionMessage("");
		try {
			await requestApi("/enquiries", {
				method: "POST",
				body: JSON.stringify({
					name: values.get("name"),
					email: values.get("email"),
					type: values.get("type"),
					message: values.get("message"),
					productSlug: selectedProduct?.slug,
					courseSlug: selectedCourse?.slug,
				}),
			});
			form.reset();
			setSubmissionState("success");
			setSubmissionMessage("Your enquiry has been sent to Bilatec.");
		} catch (error) {
			setSubmissionState("error");
			setSubmissionMessage(error instanceof Error ? error.message : "Unable to send your enquiry. Please try again.");
		}
	}

	return (
		<div className="site-shell">
			<Nav />
			<main>
				<section className="contact-section">
					<div className="contact-intro">
						<p className="eyebrow">Contact Bilatec</p>
						<h1>What can we<br /><em>help you with?</em></h1>
						<p>Choose the kind of enquiry and tell us a little about what you need. Bilatec works across products, projects, technical learning and general enquiries.</p>
						<div className="contact-details"><span>Enquiries</span><p>Use the form to share your request and the right team can follow up.</p></div>
					</div>
					<form className="contact-form" onSubmit={submitEnquiry}>
						<label>Your name<input required name="name" type="text" autoComplete="name" placeholder="Your name" /></label>
						<label>Email address<input required name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label>
						<label>What is your enquiry about?
							<select required name="type" defaultValue={enquiryType}>
								<option value="" disabled>Select an enquiry type</option>
								<option value="product">Buy or enquire about a product</option>
								<option value="project">Enquire about a project</option>
								<option value="training">Apply for training or learning</option>
								<option value="general">General enquiry</option>
							</select>
						</label>
						{selectedProduct && <label>Product of interest<input readOnly value={selectedProduct.title} /></label>}
						{selectedCourse && <label>Course of interest<input readOnly value={selectedCourse.title} /></label>}
						<label>Tell us more<textarea required name="message" placeholder="Share a few details about what you need" rows={4} /></label>
						<button className="button button-yellow" type="submit" disabled={submissionState === "sending"}>{submissionState === "sending" ? "Sending..." : "Send my enquiry"} <ArrowUpRight /></button>
						{submissionMessage && <p className={`form-status is-${submissionState}`} role={submissionState === "error" ? "alert" : "status"}>{submissionMessage}</p>}
						<small>Share only the information needed to respond to your enquiry.</small>
					</form>
				</section>
				<section className="contact-reassurance">
					<div><Check /><span><strong>Products and supply</strong><small>Enquire about electrical, industrial and solar products.</small></span></div>
					<div><Check /><span><strong>Projects and services</strong><small>Share the work you need help with.</small></span></div>
					<div><Check /><span><strong>Learning and training</strong><small>Ask about available technical courses.</small></span></div>
				</section>
			</main>
			<Footer />
		</div>
	);
}