/**
 * Lazily-loaded framer-motion feature bundle.
 *
 * `m` ships almost no logic on its own; the animation and gesture
 * implementations live here, and <LazyMotion> fetches this as a separate chunk
 * once the page is idle. That takes ~25 KB out of the initial bundle.
 *
 * `domAnimation` covers animation, exit (AnimatePresence), inView
 * (whileInView), hover, tap and focus — everything this site uses. It excludes
 * drag and layout animations, which are not used anywhere.
 */
export { domAnimation as default } from "framer-motion";
