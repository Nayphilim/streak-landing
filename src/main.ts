import "./style.css";
import { BURST_OFFSETS, doneCount, toggleWalk, type CheckState } from "./habit";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---- scroll reveals ----
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        const el = e.target as HTMLElement;
        el.style.opacity = "1";
        el.style.transform = el.dataset.final ?? "translateY(0)";
        io.unobserve(el);
      }
    }
  },
  { threshold: 0.15 },
);
document.querySelectorAll<HTMLElement>("[data-io]").forEach((el) => io.observe(el));

// ---- hero phone check-in ----
let state: CheckState = { walkDone: false, streak: 12 };
const row = document.querySelector<HTMLButtonElement>("#walk-row");
const label = document.querySelector<HTMLElement>("#walk-label");
const tick = document.querySelector<HTMLElement>("#walk-tick");
const celebrate = document.querySelector<HTMLElement>("#celebrate-card");
const particles = document.querySelectorAll<HTMLElement>("#burst span");

function paintCheckin(): void {
  const done = state.walkDone;
  if (row) {
    row.style.background = done ? "oklch(0.9 0.08 95)" : "#fff";
    row.style.borderColor = done ? "transparent" : "var(--line)";
  }
  if (label) label.style.color = done ? "var(--ink)" : "var(--muted)";
  if (tick) {
    tick.style.background = done ? "var(--orange)" : "transparent";
    tick.style.borderColor = done ? "transparent" : "var(--line)";
    tick.textContent = done ? "✓" : "";
  }
  if (celebrate) {
    celebrate.style.display = done ? "block" : "none";
    if (done) celebrate.style.animation = "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both";
  }
  document.querySelectorAll<HTMLElement>("#sticker-streak, #foot-streak").forEach((el) => {
    el.textContent = el.id === "foot-streak" ? `${state.streak}-day streak` : String(state.streak);
  });
  const cs = document.querySelector<HTMLElement>("#celebrate-streak");
  if (cs) cs.textContent = String(state.streak);
  const dc = document.querySelector<HTMLElement>("#done-count");
  if (dc) dc.textContent = `${doneCount(done)} of 3 today`;
}

function fireBurst(): void {
  particles.forEach((p, i) => {
    const rot = p.style.transform.includes("rotate") ? p.style.transform : "";
    if (!state.walkDone || reduced) {
      p.style.opacity = "0";
      p.style.transform = `translate(0px, 0px) ${rot}`.trim();
      return;
    }
    const [x, y] = BURST_OFFSETS[i] ?? [0, 0];
    p.style.opacity = "1";
    p.style.transform = `translate(0px, 0px) ${rot}`.trim();
    requestAnimationFrame(() => {
      p.style.opacity = "0";
      p.style.transform = `translate(${x}px, ${y}px) ${rot}`.trim();
    });
  });
}

row?.addEventListener("click", () => {
  state = toggleWalk(state);
  paintCheckin();
  fireBurst();
});
paintCheckin();

// ---- FAQ accordion ----
const faqs = [
  {
    q: "Is it actually free?",
    a: "Placeholder answer. Three habits, streaks, and reminders are free forever. Plus adds unlimited habits and widgets for £2.99/mo.",
  },
  {
    q: "What happens when I miss a day?",
    a: "Placeholder answer. Your streak bends: one grace day a week keeps it alive. Miss more and it gently restarts — no red screens, no shame.",
  },
  {
    q: "Does it work without an account?",
    a: "Placeholder answer. Yes — everything stays on your phone until you choose to sync.",
  },
  {
    q: "iOS and Android?",
    a: "Placeholder answer. Both, plus home-screen widgets on each.",
  },
];

const faqList = document.querySelector<HTMLElement>("#faq-list");
let faqOpen = 0;
if (faqList) {
  faqList.innerHTML = faqs
    .map(
      (f, i) => `
    <div class="faq-item" data-i="${i}" style="border-bottom:1.5px solid var(--line);cursor:pointer">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:20px 0">
        <span style="font-size:16px;font-weight:800">${f.q}</span>
        <span class="faq-icon" style="width:28px;height:28px;border-radius:50%;border:1.5px solid var(--ink);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;transition:transform 0.3s cubic-bezier(0.16,1,0.3,1)">+</span>
      </div>
      <div class="faq-body" style="max-height:0;overflow:hidden;transition:max-height 0.4s cubic-bezier(0.16,1,0.3,1)">
        <p style="margin:0;padding:0 0 20px;font-size:14.5px;line-height:1.65;color:var(--muted);font-weight:500;max-width:56ch">${f.a}</p>
      </div>
    </div>`,
    )
    .join("");

  const paintFaq = (): void => {
    faqList.querySelectorAll<HTMLElement>(".faq-item").forEach((item) => {
      const i = Number(item.dataset.i);
      const open = i === faqOpen;
      const body = item.querySelector<HTMLElement>(".faq-body");
      const icon = item.querySelector<HTMLElement>(".faq-icon");
      if (body) body.style.maxHeight = open ? "140px" : "0";
      if (icon) {
        icon.style.transform = open ? "rotate(45deg)" : "rotate(0)";
        icon.style.background = open ? "var(--ink)" : "transparent";
        icon.style.color = open ? "var(--cream)" : "var(--ink)";
      }
    });
  };
  faqList.querySelectorAll<HTMLElement>(".faq-item").forEach((item) => {
    item.addEventListener("click", () => {
      const i = Number(item.dataset.i);
      faqOpen = faqOpen === i ? -1 : i;
      paintFaq();
    });
  });
  paintFaq();
}
