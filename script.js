const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const typedText = document.getElementById("typedText");

const typingWords = ["Flutter Developer", "UI/UX Designer", "API Integration"];
let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

function applyTheme(theme) {
  const isDark = theme === "dark";
  body.classList.toggle("dark", isDark);
  themeIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    applyTheme(savedTheme);
    return;
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

themeToggle.addEventListener("click", () => {
  const current = body.classList.contains("dark") ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("theme", next);
});

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

function runTypingAnimation() {
  const currentWord = typingWords[wordIndex];

  if (!deleting) {
    typedText.textContent = currentWord.slice(0, letterIndex + 1);
    letterIndex += 1;
    if (letterIndex === currentWord.length) {
      deleting = true;
      setTimeout(runTypingAnimation, 1300);
      return;
    }
    setTimeout(runTypingAnimation, 90);
  } else {
    typedText.textContent = currentWord.slice(0, letterIndex - 1);
    letterIndex -= 1;
    if (letterIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
    }
    setTimeout(runTypingAnimation, 50);
  }
}

const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((element) => observer.observe(element));

initTheme();
runTypingAnimation();
