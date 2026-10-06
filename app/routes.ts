import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("products/:slug", "routes/products.tsx"),
	route("learning", "routes/learning.tsx"),
	route("solutions", "routes/solutions.tsx"),
	route("projects", "routes/projects.tsx"),
	route("about", "routes/about.tsx"),
	route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;
