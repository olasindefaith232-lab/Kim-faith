import type { Route } from "./+types/products";
import { useParams } from "react-router";
import { ArrowUpRight, Check } from "../components/icons";
import { ButtonLink, Footer, Nav, PageIntro } from "../components/site";
import { products } from "../data/products";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products & Services | Bilatec" },
    {
      name: "description",
      content: "Explore Bilatec electrical, industrial, plumbing, fabrication, motor, automation, and solar products and services.",
    },
  ];
}

export default function Product() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <div className="site-shell">
        <Nav />
        <main className="course-not-found">
          <p className="eyebrow">Product not found</p>
          <h1>Let&apos;s find<br /><em>the right solution.</em></h1>
          <ButtonLink to="/contact">Ask Bilatec <ArrowUpRight /></ButtonLink>
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
            <p className="eyebrow">{product.category} / Products and services</p>
            <h1>{product.title}</h1>
            <p>{product.summary}</p>
            <ButtonLink to={`/contact?type=product&product=${product.slug}`}>Enquire about this product <ArrowUpRight /></ButtonLink>
          </div>
          <div className="course-visual" aria-hidden="true">
            <img src={product.image} alt="" />
            <span>{product.category.toUpperCase()}</span>
            <small>Products and practical support for real applications.</small>
          </div>
        </section>
        <section className="section product-details">
          <PageIntro label="Product information" title={<>Made for the work<br /><em>it needs to do.</em></>} copy={product.purpose} />
          <div className="product-detail-grid">
            <article><p className="eyebrow">Common applications</p>{product.applications.map((application) => <div className="product-detail-item" key={application}><Check /><h3>{application}</h3></div>)}</article>
            <article><p className="eyebrow">What it supports</p>{product.benefits.map((benefit) => <div className="product-detail-item" key={benefit}><Check /><h3>{benefit}</h3></div>)}</article>
          </div>
        </section>
        <section className="course-community">
          <div>
            <p className="eyebrow">Related learning available</p>
            <h2>Build confidence<br /><em>with practice.</em></h2>
          </div>
          <p>Bilatec also offers related technical learning for people who want to develop skills in this area.</p>
          <ButtonLink to="/contact?type=training">Ask about learning <ArrowUpRight /></ButtonLink>
        </section>
      </main>
      <Footer />
    </div>
  );
}