import type { Route } from "./+types/home";
import { useEffect, useState } from "react";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Pause, Play } from "../components/icons";
import { Link } from "react-router";
import { ButtonLink, Footer, Nav, PageIntro } from "../components/site";
import { products } from "../data/products";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bilatec | Electrical, Industrial & Solar" },
    { name: "description", content: "Explore Bilatec electrical, industrial and solar products, services, projects and technical learning." },
  ];
}

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const heroSlides = [
    {
      src: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=2000&q=90",
      alt: "Electrical technician working with industrial equipment",
      label: "Electrical",
    },
    {
      src: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=2000&q=90",
      alt: "Solar panels generating power across an open landscape",
      label: "Solar",
    },
    {
      src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2000&q=90",
      alt: "Metal fabrication work taking place in a workshop",
      label: "Industrial",
    },
  ];

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 6500);
    return () => window.clearInterval(interval);
  }, [paused, heroSlides.length]);

  function changeSlide(direction: number) {
    setActiveSlide((current) => (current + direction + heroSlides.length) % heroSlides.length);
  }

  return (
    <div className="site-shell">
      <Nav />
      <main>
        <section className="hero-section">
          <div className="hero-visual" role="region" aria-label="Bilatec electrical, solar and industrial work" aria-roledescription="carousel">
            {heroSlides.map((slide, index) => <img className={`hero-slide ${index === activeSlide ? "is-active" : ""}`} key={slide.src} src={slide.src} alt={index === activeSlide ? slide.alt : ""} aria-hidden={index !== activeSlide} />)}
          </div>
          <div className="hero-copy reveal-up"><p className="eyebrow"><span className="eyebrow-dot" /> Electrical / Industrial / Solar</p><h1>Powering the work<br /><em>that moves us.</em></h1><p className="hero-lede">Bilatec connects homes, businesses and communities with electrical, industrial and solar products, services and practical learning.</p><div className="hero-actions"><ButtonLink to="/products/industrial-electrical-systems">Explore products <ArrowUpRight /></ButtonLink><Link className="text-link" to="/contact">Discuss your needs <ArrowUpRight /></Link></div></div>
          <div className="hero-carousel-controls" aria-label="Hero image controls">
            <button type="button" onClick={() => changeSlide(-1)} aria-label="Previous hero image"><ChevronLeft /></button>
            <span aria-live="polite"><strong>{String(activeSlide + 1).padStart(2, "0")}</strong> / {String(heroSlides.length).padStart(2, "0")} <small>{heroSlides[activeSlide].label}</small></span>
            <button type="button" onClick={() => changeSlide(1)} aria-label="Next hero image"><ChevronRight /></button>
            <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Play hero images" : "Pause hero images"}>{paused ? <Play /> : <Pause />}</button>
          </div>
        </section>
        <section className="section light-section" id="how-it-works"><PageIntro label="What Bilatec does" title={<>Practical systems.<br /><em>Useful expertise.</em></>} copy="From product sales and supply to technical services and learning, Bilatec works across electrical, industrial and solar needs." /><div className="feature-grid home-product-grid">{products.slice(0, 3).map((product) => <Link className="feature-card feature-card-image" to={`/products/${product.slug}`} key={product.slug}><img src={product.image} alt="" /><div><span>{product.category}</span><h3>{product.title}</h3><p>{product.summary}</p></div></Link>)}</div></section>
        <section className="split-section"><div className="split-image"><img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1100&q=85" alt="Solar panels arranged across a rooftop" /><span className="image-tag">Electrical and solar solutions</span></div><div className="split-copy"><p className="eyebrow">For homes and businesses</p><h2>Good systems<br /><em>start with fit.</em></h2><p>Every project starts by understanding the work to be done, the people who rely on it, and the products and support that suit the application.</p><ul className="check-list"><li><Check /> Electrical and industrial products</li><li><Check /> Solar equipment and system support</li><li><Check /> Technical learning and skills development</li></ul><ButtonLink to="/solutions" variant="dark">Explore solutions <ArrowUpRight /></ButtonLink></div></section>
        <section className="band-cta"><p className="eyebrow">Work with Bilatec</p><h2>Have a need to solve<br /><em>or a skill to build?</em></h2><ButtonLink to="/contact">Tell us about it <ArrowUpRight /></ButtonLink></section>
      </main><Footer />
    </div>
  );
}
