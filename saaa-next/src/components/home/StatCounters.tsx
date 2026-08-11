"use client";

import { useEffect } from "react";

const counters = [
  { target: 200, suffix: "+" },
  { target: 55, suffix: "+" },
  { target: 5000, suffix: "+" },
  { target: 100, suffix: "%" },
];

function animateCounter(element: HTMLElement) {
  const target = parseInt(element.getAttribute("data-target") ?? "0", 10);
  const suffix = element.getAttribute("data-suffix") ?? "";
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime: number) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(target * easeOut);
    element.textContent = `${current}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = `${target}${suffix}`;
    }
  }

  requestAnimationFrame(update);
}

export function StatCounters() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5, rootMargin: "0px" },
    );

    document.querySelectorAll(".stat-value[data-target]").forEach((counter) => {
      observer.observe(counter);
    });

    return () => observer.disconnect();
  }, []);

  const labels = [
    "Member Companies",
    "Years of Service",
    "Professionals Trained",
    "IATA Compliance",
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {counters.map((counter, index) => (
            <div key={labels[index]} className="stat-item">
              <div
                className="stat-value"
                data-target={counter.target}
                data-suffix={counter.suffix}
              >
                0
              </div>
              <div className="stat-label">{labels[index]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
