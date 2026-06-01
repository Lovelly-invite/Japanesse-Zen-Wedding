import type { Variants } from "framer-motion";

/**
 * Varian animasi Zen.
 * Durasi minimum 0.8s, maksimum 2s. Easing halus. Tanpa bounce.
 */
const easingHalus: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export const varianFadeUp: Variants = {
  tersembunyi: { opacity: 0, y: 20 },
  terlihat: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easingHalus },
  },
};

export const varianFadeIn: Variants = {
  tersembunyi: { opacity: 0 },
  terlihat: {
    opacity: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

export const varianSoftReveal: Variants = {
  tersembunyi: { opacity: 0, scale: 0.98 },
  terlihat: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.0, ease: easingHalus },
  },
};

export const varianContainer: Variants = {
  tersembunyi: {},
  terlihat: {
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};
