/* ============================================================
   AUZAIR YOUSF KHAN — PORTFOLIO SCRIPTS
============================================================ */

/* ===== TYPING ANIMATION ===== */
const typingRoles = [
  "Computer Science Student",
  "Python Developer",
  "Web Developer",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById("typingText");

function type() {
  const current = typingRoles[roleIndex];

  if (!isDeleting) {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, 1800); // pause before deleting
      return;
    }
  } else {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % typingRoles.length;
    }
  }

  const speed = isDeleting ? 60 : 95;
  setTimeout(type, speed);
}
setTimeout(type, 700);


/* ===== NAVBAR: scroll + active link ===== */
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  // Sticky shadow
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Active link tracking
  let current = "";
  sections.forEach((sec) => {
    const top = sec.offsetTop - 90;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });

  // Back to top visibility
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
});


/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById("hamburger");
const navLinksWrapper = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinksWrapper.classList.toggle("open");
});

// Close on link click
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinksWrapper.classList.remove("open");
  });
});

// Close on outside click
document.addEventListener("click", (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove("open");
    navLinksWrapper.classList.remove("open");
  }
});


/* ===== DARK / LIGHT MODE ===== */
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const htmlEl = document.documentElement;

// Load saved preference
const savedTheme = localStorage.getItem("theme") || "dark";
htmlEl.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = htmlEl.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  htmlEl.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
}


/* ===== BACK TO TOP ===== */
const backToTopBtn = document.getElementById("backToTop");

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* ===== FADE-IN ON SCROLL (IntersectionObserver) ===== */
const fadeEls = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Don't unobserve skill cards — skill bar animation runs on visible class
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

fadeEls.forEach((el) => observer.observe(el));


/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector("button[type='submit']");
  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;

  // Simulate a short delay (replace with real fetch/EmailJS call in production)
  setTimeout(() => {
    btn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Send Message`;
    btn.disabled = false;
    formSuccess.classList.add("show");
    contactForm.reset();

    setTimeout(() => {
      formSuccess.classList.remove("show");
    }, 5000);
  }, 1500);
});


/* ===== FOOTER YEAR ===== */
document.getElementById("year").textContent = new Date().getFullYear();


/* ===== SMOOTH NAV SCROLL with offset ===== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});
