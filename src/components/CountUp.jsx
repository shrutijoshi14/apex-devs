import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CountUp({ end, duration = 2, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let observer;
    const animate = () => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: end,
        duration: duration,
        ease: "power2.out",
        onUpdate: () => {
          setCount(Math.floor(obj.val));
        }
      });
    };

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          animate();
          observer.disconnect();
        }
      }, { threshold: 0.1 });
      observer.observe(el);
    } else {
      animate();
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}
