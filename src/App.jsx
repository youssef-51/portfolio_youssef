import { useEffect, useRef, useState } from "react";
import { Mail, Phone, Link, ChevronDown, Sparkles, Sun, Moon, Download } from "lucide-react";
import {
  SiAngular,
  SiApachekafka,
  SiCss,
  SiDocker,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGitlab,
  SiHtml5,
  SiIntellijidea,
  SiJavascript,
  SiMinio,
  SiMysql,
  SiPostgresql,
  SiReact,
  SiSpringboot,
  SiTypescript,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { VscVscode } from "react-icons/vsc";
import portrait from "./assets/ChatGPT Image Sep 27, 2026, 02_02_39 AM.png";
import cvFile from "./assets/CV_EL_HADAR_YOUSSEF.pdf";
import "./App.css";

const ROLES = [
  "Développeur Backend — Java / Spring Boot",
  "Développeur Frontend — React / Angular",
  "Architecture Microservices & Kafka",
  "Étudiant Ingénieur — ENSA Marrakech",
];

const NAV_ITEMS = [
  { id: "about", label: "À propos" },
  { id: "skills", label: "Compétences" },
  { id: "experience", label: "Expérience" },
  { id: "projects", label: "Projets" },
  { id: "contact", label: "Contact" },
];

// Per-technology badge: abbreviation + brand-ish color. Kept as compact
// monogram badges (not traced logos) so they stay crisp at small sizes.
const TECH = {
  Java: { icon: FaJava, c: "#ED8B00" },
  JavaFX: { l: "JFX", c: "#ED8B00" },
  MVC: { l: "MVC", c: "#64748B" },
  "Spring Boot": { icon: SiSpringboot, c: "#6DB33F" },
  "Spring MVC": { icon: SiSpringboot, c: "#6DB33F" },
  "Spring Security": { icon: SiSpringboot, c: "#6DB33F" },
  "Spring Cloud": { icon: SiSpringboot, c: "#6DB33F" },
  JWT: { l: "JWT", c: "#FB015B" },
  "API REST": { l: "API", c: "#38BDF8" },
  React: { icon: SiReact, c: "#61DAFB" },
  Angular: { icon: SiAngular, c: "#DD0031" },
  TypeScript: { icon: SiTypescript, c: "#3178C6" },
  JavaScript: { icon: SiJavascript, c: "#F0DB4F", dark: true },
  HTML: { icon: SiHtml5, c: "#E34F26" },
  CSS: { icon: SiCss, c: "#2965F1" },
  MySQL: { icon: SiMysql, c: "#4479A1" },
  PostgreSQL: { icon: SiPostgresql, c: "#336791" },
  Git: { icon: SiGit, c: "#F05032" },
  GitHub: { icon: SiGithub, c: "#B0B6C1", dark: true },
  GitLab: { icon: SiGitlab, c: "#FC6D26" },
  Docker: { icon: SiDocker, c: "#2496ED" },
  "CI/CD": { l: "CI", c: "#F59E0B" },
  "GitHub Actions": { icon: SiGithubactions, c: "#2088FF" },
  "VS Code": { icon: VscVscode, c: "#007ACC" },
  "IntelliJ IDEA": { icon: SiIntellijidea, c: "#FE315D" },
  UML: { l: "UML", c: "#8B7CF6" },
  Bruno: { l: "Br", c: "#F97316" },
  Kafka: { icon: SiApachekafka, c: "#8C8C8C" },
  Minio: { icon: SiMinio, c: "#C72E49" },
};

function techMeta(name) {
  return TECH[name] || { l: name.slice(0, 2), c: "#8B7CF6" };
}

function TechChip({ name, size = "md" }) {
  const meta = techMeta(name);
  const Icon = meta.icon;
  return (
    <span className={`chip chip-${size}`}>
      <span
        className="chip-badge"
        style={{
          background: `${meta.c}1F`,
          color: meta.dark ? "#171923" : meta.c,
          boxShadow: `inset 0 0 0 1px ${meta.c}40`,
        }}
      >
        {Icon ? <Icon size="1em" aria-hidden="true" /> : meta.l}
      </span>
      {name}
    </span>
  );
}

const SKILL_GROUPS = [
  { title: "Backend", items: ["Java", "Spring Boot", "Spring MVC", "Spring Security"] },
  { title: "Frontend", items: ["React", "Angular", "HTML", "CSS", "JavaScript", "TypeScript"] },
  { title: "Bases de données", items: ["MySQL", "PostgreSQL"] },
  { title: "Outils", items: ["Git", "GitHub", "GitLab", "CI/CD", "GitHub Actions", "VS Code", "IntelliJ IDEA", "Docker", "JWT", "API REST", "UML", "Bruno"] },
];

const SKILL_MARQUEE = [
  "Java", "Spring Boot", "React", "Angular", "TypeScript", "JavaScript", "HTML", "CSS",
  "MySQL", "PostgreSQL", "Git", "GitHub", "GitLab", "Docker", "Kafka", "Minio",
  "Java", "Spring Boot", "React", "Angular", "TypeScript", "JavaScript", "HTML", "CSS",
  "MySQL", "PostgreSQL", "Git", "GitHub", "GitLab", "Docker", "Kafka", "Minio",
];

const PROJECTS = [
  {
    title: "Plateforme de gestion hôtelière",
    stack: ["Spring Boot", "React", "MySQL", "JWT"],
    points: [
      "Application full-stack centralisant la gestion des réservations, chambres, clients et paiements.",
      "Implémentation d'un service de gestion des hôtels et d'un service d'upload de fichiers.",
      "Sécurisation de l'API REST par JWT et contrôle d'accès par rôles.",
    ],
  },
  {
    title: "Okane Transfer — Plateforme de transfert d'argent",
    stack: ["Spring MVC", "Spring Security", "Angular", "PostgreSQL", "Docker"],
    points: [
      "Simulation de transferts d'argent intégrant la gestion multidevise, les corridors de transfert et les grilles tarifaires.",
      "Mise en place d'espaces Administration, Agent et Client, sécurisés via Spring Security et JWT.",
    ],
  },
  {
    title: "Application de bureau de gestion de stock",
    stack: ["JavaFX", "MySQL", "MVC"],
    points: [
      "Développement d'une application JavaFX selon l'architecture MVC pour gérer les produits, fournisseurs et commandes.",
      "Mise en place d'alertes de seuil de stock et de fonctionnalités de gestion des factures et de génération de rapports PDF.",
    ],
  },
];

const LANGUAGES = [
  { name: "Arabe", level: 5 },
  { name: "Français", level: 4 },
  { name: "Anglais", level: 3 },
];

const SOFT_SKILLS = ["Travail en équipe", "Résolution de problèmes", "Adaptabilité", "Apprentissage continu", "Gestion du temps"];

function useTypingRoles(roles) {
  const [text, setText] = useState("");
  useEffect(() => {
    let roleIndex = 0, charIndex = 0, deleting = false, timeoutId;
    const tick = () => {
      const word = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        setText(word.slice(0, charIndex));
        if (charIndex === word.length) { deleting = true; timeoutId = setTimeout(tick, 1600); return; }
      } else {
        charIndex--;
        setText(word.slice(0, charIndex));
        if (charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
      }
      timeoutId = setTimeout(tick, deleting ? 28 : 48);
    };
    timeoutId = setTimeout(tick, 300);
    return () => clearTimeout(timeoutId);
  }, [roles]);
  return text;
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      let current = active;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);
  return active;
}

function useInView(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16, ...options },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return [elementRef, isVisible];
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    return savedTheme ? savedTheme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [openProject, setOpenProject] = useState(0);
  const roleText = useTypingRoles(ROLES);
  const activeSection = useActiveSection(NAV_ITEMS.map((n) => n.id));
  const projectRefs = useRef([]);
  const [skillsRef, skillsVisible] = useInView();

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    window.localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div className={`portfolio ${isDark ? "theme-dark" : "theme-light"}`}>
      <div className="bg-orb orb-a" />
      <div className="bg-orb orb-b" />

      <nav className="nav">
        <div className="logo">Y<span>.</span>EH</div>
        <div className={`nav-links ${navOpen ? "open" : ""}`}>
          {NAV_ITEMS.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? "active" : ""} onClick={() => setNavOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
        <button className="theme-toggle" type="button" aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"} onClick={() => setIsDark((current) => !current)}>
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button className="nav-toggle" aria-label="Menu" onClick={() => setNavOpen((o) => !o)}>
          <span /><span /><span />
        </button>
      </nav>

      <section className="hero" id="top">
        <div className="hero-layout">
          <div className="hero-copy">
            <h1>Youssef<br /><span>El Hadar</span></h1>
            <div className="role-line mono"><span>{roleText}</span><span className="cursor" /></div>
            <p className="hero-desc">
              Étudiant en dernière année d'ingénierie informatique à l'ENSA Marrakech, passionné par le
              développement logiciel et les architectures microservices. À la recherche d'un stage de fin d'études (PFE).
            </p>
            <div className="hero-cta">
              <a href="#projects" className="btn btn-primary">Voir mes projets</a>
              <a href="#contact" className="btn btn-ghost">Me contacter</a>
              <a className="btn btn-download" href={cvFile} download="EL_HADAR_YOUSSEF_CV.pdf">
                <Download size={16} aria-hidden="true" /> Télécharger mon CV
              </a>
            </div>
            <div className="hero-stack">
              {["Java", "Spring Boot", "React", "Angular", "Docker", "PostgreSQL"].map((t) => (
                <TechChip key={t} name={t} size="sm" />
              ))}
            </div>
          </div>

          <div className="hero-visual" aria-label="Portrait de Youssef El Hadar">
            <div className="hero-visual-glow" />
            <div className="profile-orbit orbit-one" />
            <div className="profile-orbit orbit-two" />
            <figure className="portrait-frame">
              <img src={portrait} alt="Portrait de Youssef El Hadar" />
            </figure>
          </div>

        </div>
      </section>

      <section id="about">
        <div className="section-head"><span className="section-num mono">01</span><h2>À propos</h2></div>
        <div className="about-grid">
          <div className="glass-panel">
            <p>Étudiant en dernière année d'ingénierie informatique à l'ENSA Marrakech, passionné par le développement logiciel et les architectures microservices.</p>
            <p>Mon parcours m'a permis d'acquérir une expérience pratique dans la conception d'applications web appuyées par Spring Boot, React, Angular, Kafka et Docker. Rigoureux et curieux, je souhaite concevoir des solutions robustes, évolutives et adaptées aux besoins métiers.</p>
          </div>
          <div>
            <div className="edu-card">
              <h3>Diplôme d'Ingénieur en Informatique</h3>
              <div className="school mono">ENSA Marrakech — Université Cadi Ayyad</div>
              <div className="yr">5e année · en cours</div>
            </div>
            <div className="edu-card">
              <h3>Classes préparatoires intégrées</h3>
              <div className="school mono">ENSA Marrakech</div>
              <div className="yr">2022 — 2024</div>
            </div>
            <div className="edu-card">
              <h3>Baccalauréat Sciences Mathématiques</h3>
              <div className="school mono">2022</div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="section-head"><span className="section-num mono">02</span><h2>Compétences techniques</h2></div>
        <div className="skills-marquee" aria-label="Technologies maîtrisées">
          <div className="skills-marquee-track">
            {SKILL_MARQUEE.map((name, index) => (
              <div className="marquee-tech" key={`${name}-${index}`}>
                <TechChip name={name} size="sm" />
              </div>
            ))}
          </div>
        </div>
        <div ref={skillsRef} className={`skills-grid ${skillsVisible ? "is-visible" : ""}`}>
          {SKILL_GROUPS.map((group) => (
            <div className="skill-cat glass-panel" style={{ "--skill-index": SKILL_GROUPS.indexOf(group) }} key={group.title}>
              <h3>{group.title}</h3>
              <div className="chip-row">
                {group.items.map((name) => <TechChip key={name} name={name} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="experience">
        <div className="section-head"><span className="section-num mono">03</span><h2>Expérience</h2></div>
        <div className="exp-card glass-panel">
          <div className="exp-top">
            <h3>DriveEdu Web — Plateforme de gestion d'auto-école</h3>
            <span className="exp-date mono">Juil — Août 2026</span>
          </div>
          <div className="exp-org">Stage · ENSA Marrakech (ENSA-M)</div>
          <div className="chip-row" style={{ marginBottom: 22 }}>
            {["Java", "Spring Boot", "Spring Cloud", "Kafka", "Minio", "PostgreSQL", "React", "TypeScript", "Docker"].map((s) => (
              <TechChip key={s} name={s} size="sm" />
            ))}
          </div>
          <ul>
            <li>Développement de DriveEdu, une plateforme d'éducation à la conduite basée sur des microservices, permettant aux étudiants de s'inscrire à l'auto-école et d'accéder à des séries d'entraînement et des tutoriels.</li>
            <li>Conception et mise en œuvre d'une architecture microservices, avec routage via API Gateway, découverte des services via Eureka et échanges asynchrones via Kafka.</li>
            <li>Développement des services métier : Registration, Tutorial, Notification, Progression.</li>
            <li>Réalisation d'une interface React intégrée aux services backend via l'API Gateway.</li>
          </ul>
        </div>
      </section>

      <section id="projects">
        <div className="section-head"><span className="section-num mono">04</span><h2>Projets de développement</h2></div>
        <div className="proj-list">
          {PROJECTS.map((project, i) => {
            const isOpen = openProject === i;
            return (
              <div className={`proj-item glass-panel ${isOpen ? "open" : ""}`} key={project.title}>
                <div className="proj-head" onClick={() => setOpenProject(isOpen ? null : i)}>
                  <div>
                    <h3>{project.title}</h3>
                    <div className="chip-row" style={{ marginTop: 10 }}>
                      {project.stack.map((s) => <TechChip key={s} name={s} size="sm" />)}
                    </div>
                  </div>
                  <ChevronDown className="proj-chevron" size={18} />
                </div>
                <div
                  className="proj-body"
                  ref={(el) => (projectRefs.current[i] = el)}
                  style={{ maxHeight: isOpen ? `${projectRefs.current[i]?.scrollHeight ?? 400}px` : "0px" }}
                >
                  <div className="proj-body-inner">
                    <ul>{project.points.map((p) => <li key={p}>{p}</li>)}</ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="more">
        <div className="two-col">
          <div>
            <div className="section-head"><span className="section-num mono">05</span><h2>Langues</h2></div>
            <div className="pill-list glass-panel">
              {LANGUAGES.map((lang) => (
                <div className="pill-row" key={lang.name}>
                  <span>{lang.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="section-head"><span className="section-num mono">06</span><h2>Compétences personnelles</h2></div>
            <div className="soft-grid">
              {SOFT_SKILLS.map((s) => <span className="soft-tag" key={s}>{s}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="section-head"><span className="section-num mono">07</span><h2 className="contact-eyebrow">Contact</h2></div>
        <h2 className="contact-lead">Disponible pour un stage de fin d'études (PFE). Discutons de votre projet.</h2>
        <div className="contact-links glass-panel">
          <a className="c-link" href="mailto:youssefelhadar51@gmail.com"><Mail size={18} strokeWidth={1.8} />youssefelhadar51@gmail.com</a>
          <a className="c-link" href="tel:+2120622618851"><Phone size={18} strokeWidth={1.8} />+212 0622618851</a>
          <a className="c-link" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><Link size={18} strokeWidth={1.8} />Youssef El Hadar — LinkedIn</a>
        </div>
      </section>

      <footer>
        <span>© 2026 Youssef El Hadar</span>
        <span>ENSA Marrakech · Université Cadi Ayyad</span>
      </footer>
    </div>
  );
}
