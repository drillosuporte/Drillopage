const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-links");
const navAnchors = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
const sections = navAnchors
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("is-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navAnchors.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    document.addEventListener("click", (event) => {
        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            navMenu.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
}

const updateNavbar = () => {
    if (!navbar) {
        return;
    }

    navbar.classList.toggle("scrolled", window.scrollY > 24);
};

const updateActiveSection = () => {
    const currentPosition = window.scrollY + 180;
    let currentId = "";

    sections.forEach((section) => {
        if (section.offsetTop <= currentPosition) {
            currentId = `#${section.id}`;
        }
    });

    navAnchors.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === currentId);
    });
};

updateNavbar();
updateActiveSection();

window.addEventListener("scroll", () => {
    updateNavbar();
    updateActiveSection();
});

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.14,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}

const setupCounters = () => {
    const counters = document.querySelectorAll("[data-counter]");

    if (counters.length === 0) {
        return;
    }

    const animateCounter = (counter) => {
        if (counter.dataset.animated === "true") {
            return;
        }

        counter.dataset.animated = "true";

        const target = Number(counter.dataset.counter || "0");
        const decimals = Number(counter.dataset.decimals || "0");
        const suffix = counter.dataset.suffix || "";
        const duration = 1400;
        const start = performance.now();

        const formatValue = (value) => {
            if (decimals > 0) {
                return value.toFixed(decimals).replace(".", ",");
            }
            return Math.round(value).toString();
        };

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentValue = target * eased;
            counter.textContent = `${formatValue(currentValue)}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                counter.textContent = `${formatValue(target)}${suffix}`;
            }
        };

        requestAnimationFrame(tick);
    };

    if ("IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.5
            }
        );

        counters.forEach((counter) => counterObserver.observe(counter));
    } else {
        counters.forEach(animateCounter);
    }
};

const setupCarousel = () => {
    const carousel = document.querySelector("[data-carousel]");

    if (!carousel) {
        return;
    }

    const track = carousel.querySelector(".carousel-track");
    const originalSlides = Array.from(carousel.querySelectorAll(".carousel-slide"));
    const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
    const prevButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");

    if (!track || originalSlides.length === 0) {
        return;
    }

    const firstClone = originalSlides[0].cloneNode(true);
    const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);
    firstClone.classList.add("is-clone");
    lastClone.classList.add("is-clone");
    track.insertBefore(lastClone, originalSlides[0]);
    track.appendChild(firstClone);

    const slides = Array.from(track.querySelectorAll(".carousel-slide"));
    let currentIndex = 1;
    let autoplayId = null;
    let isDragging = false;
    let dragStartX = 0;
    let dragDeltaX = 0;

    const setTrackPosition = (index, animate = true) => {
        track.style.transition = animate
            ? "transform 520ms cubic-bezier(0.22, 1, 0.36, 1)"
            : "none";
        track.style.transform = `translateX(-${index * 100}%)`;
    };

    const updateDots = () => {
        let dotIndex = currentIndex - 1;

        if (currentIndex === 0) {
            dotIndex = originalSlides.length - 1;
        } else if (currentIndex === slides.length - 1) {
            dotIndex = 0;
        }

        dots.forEach((dot, index) => {
            const isActive = index === dotIndex;
            dot.classList.toggle("is-active", isActive);
            dot.setAttribute("aria-selected", String(isActive));
        });
    };

    const moveTo = (index, animate = true) => {
        currentIndex = index;
        setTrackPosition(currentIndex, animate);
        updateDots();
    };

    const next = () => moveTo(currentIndex + 1);
    const prev = () => moveTo(currentIndex - 1);

    const startAutoplay = () => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        stopAutoplay();
        autoplayId = window.setInterval(() => {
            next();
        }, 4600);
    };

    const stopAutoplay = () => {
        if (autoplayId !== null) {
            window.clearInterval(autoplayId);
            autoplayId = null;
        }
    };

    track.addEventListener("transitionend", () => {
        if (currentIndex === 0) {
            moveTo(originalSlides.length, false);
        } else if (currentIndex === slides.length - 1) {
            moveTo(1, false);
        }
    });

    const getPointerX = (event) => {
        if ("touches" in event && event.touches.length > 0) {
            return event.touches[0].clientX;
        }
        if ("changedTouches" in event && event.changedTouches.length > 0) {
            return event.changedTouches[0].clientX;
        }
        return event.clientX;
    };

    const onDragStart = (event) => {
        isDragging = true;
        dragStartX = getPointerX(event);
        dragDeltaX = 0;
        track.classList.add("is-dragging");
        stopAutoplay();
    };

    const onDragMove = (event) => {
        if (!isDragging) {
            return;
        }

        dragDeltaX = getPointerX(event) - dragStartX;
    };

    const onDragEnd = () => {
        if (!isDragging) {
            return;
        }

        isDragging = false;
        track.classList.remove("is-dragging");

        if (Math.abs(dragDeltaX) > 55) {
            if (dragDeltaX < 0) {
                next();
            } else {
                prev();
            }
        } else {
            moveTo(currentIndex);
        }

        startAutoplay();
    };

    prevButton?.addEventListener("click", () => {
        prev();
        startAutoplay();
    });

    nextButton?.addEventListener("click", () => {
        next();
        startAutoplay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            moveTo(index + 1);
            startAutoplay();
        });
    });

    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
    carousel.addEventListener("focusin", stopAutoplay);
    carousel.addEventListener("focusout", startAutoplay);

    carousel.addEventListener("mousedown", onDragStart);
    carousel.addEventListener("mousemove", onDragMove);
    carousel.addEventListener("mouseup", onDragEnd);
    carousel.addEventListener("mouseleave", onDragEnd);

    carousel.addEventListener("touchstart", onDragStart, { passive: true });
    carousel.addEventListener("touchmove", onDragMove, { passive: true });
    carousel.addEventListener("touchend", onDragEnd);

    moveTo(1, false);
    startAutoplay();
};

const setupParallax = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    const scenes = document.querySelectorAll("[data-parallax-scene]");

    scenes.forEach((scene) => {
        const layers = scene.querySelectorAll("[data-parallax]");

        if (layers.length === 0) {
            return;
        }

        scene.addEventListener("mousemove", (event) => {
            const rect = scene.getBoundingClientRect();
            const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
            const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

            layers.forEach((layer) => {
                const depth = Number(layer.getAttribute("data-parallax")) || 0;
                const x = offsetX * depth;
                const y = offsetY * depth;
                layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            });
        });

        scene.addEventListener("mouseleave", () => {
            layers.forEach((layer) => {
                layer.style.transform = "translate3d(0, 0, 0)";
            });
        });
    });
};

const setupPlayStoreTracking = () => {
    const playLinks = Array.from(document.querySelectorAll("[data-play-link]"));

    if (playLinks.length === 0) {
        return;
    }

    const config = window.drilloTrackingConfig || {};
    const landingParams = new URLSearchParams(window.location.search);
    const referrerKeys = [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "utm_term",
        "gclid",
        "gbraid",
        "wbraid"
    ];

    const buildReferrer = (ctaLocation) => {
        const referrer = new URLSearchParams();

        referrer.set("utm_source", config.defaultUtmSource || "landing");
        referrer.set("utm_medium", config.defaultUtmMedium || "organic");
        referrer.set("utm_campaign", config.defaultUtmCampaign || "drillo_landing");
        referrer.set("utm_content", ctaLocation || "play_store");

        referrerKeys.forEach((key) => {
            const value = landingParams.get(key);

            if (value) {
                referrer.set(key, value);
            }
        });

        return referrer.toString();
    };

    const updateLinkUrl = (link) => {
        const ctaLocation = link.dataset.ctaLocation || "play_store";
        const url = new URL(link.href);

        url.searchParams.set("referrer", buildReferrer(ctaLocation));
        link.href = url.toString();
    };

    const trackClick = (link) => {
        const ctaLocation = link.dataset.ctaLocation || "play_store";
        const eventParams = {
            event_category: "conversion",
            event_label: ctaLocation,
            cta_location: ctaLocation,
            outbound_url: link.href
        };

        if (typeof window.gtag === "function") {
            window.gtag("event", "play_store_click", eventParams);

            if (config.googleAdsSendTo) {
                window.gtag("event", "conversion", {
                    send_to: config.googleAdsSendTo,
                    cta_location: ctaLocation
                });
            }
        }

        if (Array.isArray(window.dataLayer)) {
            window.dataLayer.push({
                event: "play_store_click",
                ...eventParams
            });
        }

        if (typeof window.fbq === "function") {
            window.fbq("trackCustom", "PlayStoreClick", {
                cta_location: ctaLocation
            });
        }
    };

    playLinks.forEach((link) => {
        updateLinkUrl(link);
        link.addEventListener("click", () => trackClick(link));
    });
};

setupCounters();
setupCarousel();
setupParallax();
setupPlayStoreTracking();

const yearNode = document.querySelector("#current-year");

if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
}
