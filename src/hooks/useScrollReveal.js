import { useEffect, useRef } from 'react';

/**
 * Adds the "visible" class to elements with className="reveal"
 * when they scroll into view. Uses IntersectionObserver for
 * performant, GPU-friendly scroll-triggered animations.
 */
export default function useScrollReveal() {
    const containerRef = useRef(null);

    useEffect(() => {
        const root = containerRef.current || document;
        const elements = root.querySelectorAll('.reveal');
        if (!elements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                }
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        for (const el of elements) observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return containerRef;
}
