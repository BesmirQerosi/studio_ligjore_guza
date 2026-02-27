(function () {
  "use strict";

  /* ---- DOM References ---- */
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const backToTop = document.getElementById("back-to-top");
  const footerYear = document.getElementById("footer-year");

  /* ---- Footer Year ---- */
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  /* ---- Navbar: Add .scrolled class on scroll ---- */
  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Back to top button
    if (window.scrollY > 400) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile Menu Toggle ---- */
  function openMenu() {
    navMenu.classList.add("open");
    navToggle.classList.add("active");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    navMenu.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  navToggle.addEventListener("click", function () {
    if (navMenu.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when a link is clicked
  navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Close menu on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navMenu.classList.contains("open")) {
      closeMenu();
    }
  });

  /* ---- Smooth Scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navbarHeight = navbar.offsetHeight;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  /* ---- Intersection Observer: Fade-in animations ---- */
  const fadeEls = document.querySelectorAll(
    ".about__grid, .service-card, .why-card, .stat-item, .contact__info, .contact-form",
  );

  fadeEls.forEach(function (el) {
    el.classList.add("fade-in");
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    fadeEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ---- Modal System for Services ---- */
  const serviceModal = document.getElementById("service-modal");
  const modalClose = document.getElementById("modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalEyebrow = document.getElementById("modal-eyebrow");

  const serviceData = {
    civile: {
      title: "E Drejta Civile",
      eyebrow: "Shërbimi Ligjor",
      image: "images/modal-civile.jpg",
      description: `
        <p>E drejta civile përbën shtyllën kryesore të marrëdhënieve juridike mes individëve dhe subjekteve private. Studio Ligjore Guza ofron përfaqësim të specializuar në një gamë të gjerë çështjesh civile.</p>
        <p>Ne asistojmë në hartimin dhe interpretimin e kontratave të ndryshme, zgjidhjen e mosmarrëveshjeve të pronësisë, kërkimet e dëmshpërblimit pasuror dhe jopasuror, si dhe ndjekjen e procedurave të ekzekutimit të titujve ekzekutivë.</p>
        <ul>
          <li>Konsulencë mbi kontratat (shitblerje, qira, sipërmarrje)</li>
          <li>Kërkesëpadi për shpërblim dëmi</li>
          <li>Vërtetime fakti juridik</li>
          <li>Mbrojtje e posedimit dhe pronësisë</li>
        </ul>
      `,
    },
    penale: {
      title: "E Drejta Penale",
      eyebrow: "Mbrojtje Ligjore",
      image: "images/modal-penale.jpg",
      description: `
        <p>Përballja me sistemin e drejtësisë penale kërkon një mbrojtje rigoroze dhe profesionale. Studio jonë garanton respektimin e të gjitha të drejtave tuaja procesuale në çdo fazë të hetimit dhe gjykimit.</p>
        <p>Ne ofrojmë mbrojtje të kualifikuar për vepra të ndryshme penale, duke filluar nga ato kundër personit, pasurisë, e deri te çështjet komplekse të korrupsionit apo krimit ekonomik.</p>
        <ul>
          <li>Përfaqësim gjatë fazës së pyetjes në polici/prokurori</li>
          <li>Mbrojtje në gjykatë për të gjitha shkallët e gjykimit</li>
          <li>Ankimime kundër masave të sigurimit</li>
          <li>Përgatitje e kallëzimeve penale</li>
        </ul>
      `,
    },
    familjare: {
      title: "E Drejta Familjare",
      eyebrow: "Asistencë Humane",
      image: "images/modal-familjare.jpg",
      description: `
        <p>Çështjet familjare kërkojnë jo vetëm njohuri të thella ligjore, por edhe një qasje njerëzore dhe të kujdesshme. Ne trajtojmë çdo rast me diskrecion maksimal.</p>
        <p>Nga zgjidhja e martesës e deri te mbrojtja e interesave të fëmijëve, ne jemi pranë jush për të gjetur zgjidhjet më pak traumatike dhe më të drejta ligjërisht.</p>
        <ul>
          <li>Zgjidhje martese (divorc)</li>
          <li>Lënie për rritje dhe edukim të fëmijëve</li>
          <li>Caktimi i pensionit ushqimor</li>
          <li>Ndarja e pasurisë bashkëshortore</li>
        </ul>
      `,
    },
    pronesise: {
      title: "E Drejta e Pronësisë",
      eyebrow: "Mbrojtje Asetesh",
      image: "images/modal-pronesise.jpg",
      description: `
        <p>Pronësia është një nga të drejtat më të rëndësishme dhe shpeshherë më të debatuara në Shqipëri. Ne ofrojmë siguri juridike për asetet tuaja të paluajtshme.</p>
        <p>Studio jonë asiston në proceset e regjistrimit, legalizimit dhe zgjidhjes së mbivendosjeve apo konflikteve të vjetra pronësore përmes rrugëve administrative dhe gjyqësore.</p>
        <ul>
          <li>Përfaqësim pranë ASHK-së</li>
          <li>Padi rivendikimi e pushim shqetësimi</li>
          <li>Legalizime dhe privatizime</li>
          <li>Trajtimi i pronave të ish-pronarëve</li>
        </ul>
      `,
    },
    tregtare: {
      title: "E Drejta Tregtare",
      eyebrow: "Partneritet Biznesi",
      image: "images/modal-tregtare.jpg",
      description: `
        <p>Në botën dinamike të biznesit, siguria ligjore është parësore për suksesin afatgjatë. Studio Ligjore Guza është partneri juaj i besueshëm në rritjen e sipërmarrjes suaj.</p>
        <p>Ne ofrojmë mbështetje që nga krijimi i shoqërive tregtare, qeverisja korporative, negociatat e kontratave komplekse dhe deri te përfaqësimi në arbitrazh.</p>
        <ul>
          <li>Regjistrim dhe ndryshime në QKB</li>
          <li>Hartim statuti dhe marrëveshje me aksionarë</li>
          <li>Zgjidhje mosmarrëveshjesh mes ortakëve</li>
          <li>Përfaqësim në gjykatat tregtare</li>
        </ul>
      `,
    },
    aksidente: {
      title: "Dëmshpërblimet nga Aksidentet Rrugore",
      eyebrow: "Mbrojtje e Viktimave",
      image: "images/modal-aksidente.jpg",
      description: `
        <p>Aksidentet rrugore shpesh lënë pasoja të rënda fizike, emocionale dhe financiare. Studio Ligjore Guza është pranë jush për të garantuar që ju të merrni dëmshpërblimin e plotë dhe të drejtë.</p>
        <p>Ne përfaqësojmë viktimat dhe familjet e tyre në negociata me kompanitë e sigurimit dhe në gjykata, duke siguruar kompensim për të gjitha dëmet e pësuar.</p>
        <ul>
          <li>Kërkesë dëmshpërblimi ndaj kompanive të sigurimit (SIGAL, INSIG, etj.)</li>
          <li>Llogaritje e dëmit trupor, psikologjik dhe pasuror</li>
          <li>Përfaqësim gjyqësor kundër shoferëve fajtorë</li>
          <li>Ndjekje e çështjeve të invaliditetit dhe humbjes së të ardhurave</li>
        </ul>
      `,
    },
  };

  const modalImage = document.getElementById("modal-image");
  const modalPlaceholder = document.getElementById("modal-placeholder");

  function openModal(serviceId) {
    const data = serviceData[serviceId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalEyebrow.textContent = data.eyebrow;
    modalDescription.innerHTML = data.description;

    // Swap the modal image for this service
    if (data.image) {
      modalImage.src = data.image;
      modalImage.alt = data.title;
      modalImage.style.display = "block";
      modalPlaceholder.style.display = "none";
    } else {
      modalImage.style.display = "none";
      modalPlaceholder.style.display = "flex";
    }

    serviceModal.classList.add("open");
    serviceModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    serviceModal.classList.remove("open");
    serviceModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Event Listeners for Service Buttons
  document.querySelectorAll(".service-card__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const serviceId = btn.getAttribute("data-service");
      openModal(serviceId);
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  // Close on outside click
  serviceModal.addEventListener("click", (e) => {
    if (e.target === serviceModal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && serviceModal.classList.contains("open")) {
      closeModal();
    }
  });

  /* ---- Active nav link highlight on scroll ---- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.navbar__nav a[href^="#"]');

  function highlightNavLink() {
    const scrollPos = window.scrollY + navbar.offsetHeight + 80;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        navLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNavLink, { passive: true });
})();
