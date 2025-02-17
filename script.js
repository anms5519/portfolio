document.addEventListener("DOMContentLoaded", function () {
    gsap.from(".title", { opacity: 0, y: -50, duration: 1, ease: "power2.out" });
    gsap.from(".subtitle", { opacity: 0, y: -20, duration: 1.5, ease: "power2.out" });
    gsap.from("nav ul li", { opacity: 0, x: -30, duration: 1, stagger: 0.3, ease: "power2.out" });
});
