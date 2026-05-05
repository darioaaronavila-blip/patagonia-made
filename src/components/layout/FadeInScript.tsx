"use client";

import { useEffect } from "react";

export default function FadeInScript() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 }
    );

    const observe = () =>
      document.querySelectorAll(".fade-in:not(.visible)").forEach((el) =>
        observer.observe(el)
      );

    observe();

    // Re-scan when new content is added (e.g. cart drawer)
    const mutation = new MutationObserver(observe);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, []);

  return null;
}
