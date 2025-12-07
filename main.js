// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return; // kalau elemen nggak ada, jangan error

        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
    });
});

// Navbar shadow on scroll
window.addEventListener("scroll", () => {
    document.querySelector("nav").classList.toggle("scrolled", window.scrollY > 20);
});

// Active link tracking
const sections = document.querySelectorAll("header, article[id], aside[id]");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(sec => {
        const top = sec.offsetTop - 300;
        if (window.scrollY >= top) {
            current = sec.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (current && link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// Fade-in on first view
const fadeTargets = document.querySelectorAll("article, aside");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target); // stop ulang-ulang animasi
        }
    });
}, { threshold: 0.2 });

fadeTargets.forEach(t => observer.observe(t));
