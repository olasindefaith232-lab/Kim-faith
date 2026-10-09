import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { ArrowUpRight, ChevronDown, Close, Facebook, Menu, TikTok, WhatsApp } from "./icons";
import { products } from "../data/products";
export function Logo() { return <Link className="logo" to="/"><span className="logo-mark" aria-hidden="true">B</span><span>Bilatec</span></Link>; }
export function Nav() {
	const [open, setOpen] = useState(false);
	const [productsOpen, setProductsOpen] = useState(false);
	const location = useLocation();
	const productsActive = location.pathname.startsWith("/products/");
	const links = [["/solutions", "Solutions"], ["/projects", "Projects"], ["/about", "About"], ["/contact", "Contact"]];
	const closeNav = () => { setOpen(false); setProductsOpen(false); };

	return (
		<header className="nav-wrap">
			<nav className="nav" aria-label="Main navigation">
				<Logo />
				<div className={`nav-links ${open ? "is-open" : ""}`}>
					<NavLink to="/" onClick={closeNav}>Home</NavLink>
					<div className={`product-menu ${productsOpen ? "is-open" : ""} ${productsActive ? "is-active" : ""}`}>
						<button className="product-menu-trigger" aria-expanded={productsOpen} aria-haspopup="true" aria-controls="product-menu-items" onClick={() => setProductsOpen(!productsOpen)}>
							Products <span className="product-menu-chevron"><ChevronDown /></span>
						</button>
						<div className="product-menu-items" id="product-menu-items">
							<div className="product-menu-heading"><span>Product directory</span><small>Electrical · Industrial · Solar</small></div>
							{products.map((product) => (
								<NavLink key={product.slug} to={`/products/${product.slug}`} onClick={closeNav}>
									<span className="product-menu-item-copy"><strong>{product.title}</strong><small>{product.category}</small></span>
									<ArrowUpRight size={16} />
								</NavLink>
							))}
						</div>
					</div>
					<NavLink to="/learning" onClick={closeNav}>Learning</NavLink>
					{links.map(([to, label]) => <NavLink key={to} to={to} onClick={closeNav}>{label}</NavLink>)}
					<ButtonLink to="/contact" onClick={closeNav}>Make an enquiry <ArrowUpRight /></ButtonLink>
				</div>
				<button className={`menu-toggle ${open ? "is-open" : ""}`} onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}>
					{open ? <Close /> : <Menu />}
				</button>
			</nav>
		</header>
	);
}
export function ButtonLink({ to, children, variant = "yellow", onClick }: { to: string; children: React.ReactNode; variant?: "yellow" | "dark"; onClick?: () => void }) { return <Link onClick={onClick} className={`button button-${variant}`} to={to}>{children}</Link>; }
export function PageIntro({ label, title, copy }: { label: string; title: React.ReactNode; copy: string }) { return <div className="page-intro reveal-up"><p className="eyebrow">{label}</p><h2>{title}</h2><p>{copy}</p></div>; }
export function Stat({ number, label }: { number: string; label: string }) { return <div className="stat"><strong>{number}</strong><span>{label}</span></div>; }
export function Testimonial() { return <section className="quote-section"><div className="quote-mark">“</div><blockquote>Bilatec made the biggest upgrade to our home feel surprisingly human. We know where our power comes from now, and that feels good.</blockquote><div className="quote-person"><div className="avatar">JM</div><span><strong>Julia & Mark</strong><small>Bilatec homeowners, Portland</small></span></div></section>; }
export function Footer() { return <footer className="footer"><div className="footer-top"><div><Logo /><p>Electrical, industrial, solar<br />products, services and learning.</p></div><div className="footer-links"><div><span>Explore</span><Link to="/">Home</Link><Link to="/products/industrial-electrical-systems">Products</Link><Link to="/learning">Learning</Link><Link to="/solutions">Solutions</Link><Link to="/projects">Projects</Link><Link to="/about">About</Link></div><div><span>Get in touch</span><Link to="/contact">Product enquiry</Link><Link to="/contact?type=project">Start a project</Link><Link to="/contact?type=training">Learning enquiry</Link></div></div><div className="footer-cta"><p>Have a project<br /><em>in mind?</em></p><ButtonLink to="/contact">Contact Bilatec <ArrowUpRight /></ButtonLink></div></div><div className="footer-bottom"><span>Bilatec</span><span>Electrical, industrial and solar solutions</span><div className="social-links"><a href="https://www.tiktok.com/" aria-label="TikTok"><TikTok /></a><a href="https://www.facebook.com/" aria-label="Facebook"><Facebook /></a><a href="https://www.whatsapp.com/" aria-label="WhatsApp"><WhatsApp /></a></div></div></footer>; }
