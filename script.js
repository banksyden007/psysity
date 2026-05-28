const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const videoButtons = document.querySelectorAll("[data-video-button]");
const modal = document.querySelector("[data-video-modal]");
const modalClose = document.querySelector("[data-modal-close]");
const modalTitle = document.querySelector("#video-modal-title");
const modalCopy = document.querySelector("[data-video-modal-copy]");
const filterButtons = document.querySelectorAll("[data-filter]");
const videoCards = document.querySelectorAll("[data-category]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const messageField = document.querySelector("[data-message-field]");
const messageCount = document.querySelector("[data-message-count]");
const contactLinks = document.querySelector("[data-contact-links]");

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const revealSite = () => {
  if (typeof window.__showSite === "function") {
    window.__showSite();
  } else {
    document.documentElement.classList.add("boot-ready");
    document.documentElement.classList.remove("is-booting");
  }
};

if (document.fonts?.ready) {
  document.fonts.ready.then(() => requestAnimationFrame(revealSite));
} else {
  requestAnimationFrame(revealSite);
}

const updateMessageCount = () => {
  if (messageField && messageCount) {
    messageCount.textContent = String(messageField.value.length);
  }
};

messageField?.addEventListener("input", updateMessageCount);
updateMessageCount();

contactLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("pointerenter", () => {
    contactLinks.querySelectorAll("a").forEach((item) => item.classList.toggle("is-selected", item === link));
  });

  link.addEventListener("focus", () => {
    contactLinks.querySelectorAll("a").forEach((item) => item.classList.toggle("is-selected", item === link));
  });

  link.addEventListener("pointerdown", () => {
    contactLinks.querySelectorAll("a").forEach((item) => item.classList.toggle("is-selected", item === link));
  });
});

const closeMenu = () => {
  nav?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
};

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

const openModal = (button) => {
  const card = button.closest(".video-card");
  const title = card?.querySelector("h3")?.textContent?.trim();

  if (title) {
    modalTitle.textContent = title;
    modalCopy.textContent =
      "Этот ролик пока в подготовке. Позже здесь откроется плеер, а сейчас можно оставить запрос на консультацию.";
  }

  modal.hidden = false;
  document.body.classList.add("modal-open");
  modalClose?.focus();
};

const closeModal = () => {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
};

videoButtons.forEach((button) => {
  button.addEventListener("click", () => openModal(button));
});

modalClose?.addEventListener("click", closeModal);

modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeModal();
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));

    videoCards.forEach((card) => {
      const matches = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !matches);
    });
  });
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  contactForm.reset();
  updateMessageCount();
  formStatus.textContent = "Спасибо. Сообщение подготовлено, осталось подключить отправку на почту или в мессенджер.";
});
