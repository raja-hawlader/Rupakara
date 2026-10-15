(function () {
"use strict";

document.addEventListener("DOMContentLoaded", function () {

    var menuToggle = document.querySelector(".menu-toggle");
    var navigation = document.querySelector(".navigation");
    var navigationLinks = document.querySelectorAll(".navigation a");

if (menuToggle) {
    menuToggle.setAttribute("aria-controls", "main-navigation");
}

    function closeMenu() {
        if (navigation) navigation.classList.remove("open");

        if (menuToggle) {
            menuToggle.classList.remove("is-active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
        }
    }

    if (menuToggle && navigation) {
        menuToggle.addEventListener("click", function () {
            var menuIsOpen = navigation.classList.toggle("open");

            menuToggle.classList.toggle("is-active", menuIsOpen);
            menuToggle.setAttribute(
                "aria-expanded",
                menuIsOpen ? "true" : "false"
            );
            menuToggle.setAttribute(
                "aria-label",
                menuIsOpen ? "Close navigation" : "Open navigation"
            );
        });
    }

    navigationLinks.forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 760) closeMenu();
    });

    var header = document.querySelector(".site-header");

    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("header-scrolled");
        } else {
            header.classList.remove("header-scrolled");
        }
    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    var revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        var revealObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.10
            }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }

    var galleryItems = document.querySelectorAll(".gallery-item");

    if (galleryItems.length > 0) {
        var lightbox = document.createElement("div");
        var lightboxImage = document.createElement("img");
        var lightboxClose = document.createElement("button");
        var lastFocusedGalleryItem = null;

       lightbox.className = "lightbox";
lightbox.setAttribute("role", "dialog");
lightbox.setAttribute("aria-modal", "true");
lightbox.setAttribute("aria-hidden", "true");
lightbox.setAttribute("aria-label", "Image preview");

        lightboxImage.className = "lightbox-image";
        lightboxImage.setAttribute("alt", "");

        lightboxClose.className = "lightbox-close";
        lightboxClose.type = "button";
        lightboxClose.setAttribute("aria-label", "Close image");
        lightboxClose.textContent = "×";

        lightbox.appendChild(lightboxImage);
        lightbox.appendChild(lightboxClose);
        document.body.appendChild(lightbox);

        function openLightbox(imageSource, imageAlt) {
            if (!imageSource) return;

            lightboxImage.src = imageSource;
            lightboxImage.alt = imageAlt || "Gallery image";
            lightbox.classList.add("is-open");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.classList.add("lightbox-open");
        }

        function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    lightboxImage.removeAttribute("src");

    if (lastFocusedGalleryItem) {
        lastFocusedGalleryItem.focus();
        lastFocusedGalleryItem = null;
    }
}

        galleryItems.forEach(function (item) {
    item.addEventListener("click", function () {
        var image = item.querySelector("img");

        if (!image) return;

        lastFocusedGalleryItem = item;

        openLightbox(
            image.currentSrc || image.src,
            image.alt
        );

        lightboxClose.focus();
    });
});

        lightboxClose.addEventListener("click", closeLightbox);

        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) closeLightbox();
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") closeLightbox();
        });
    }

    var internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            var targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            var targetElement = document.querySelector(targetId);

            if (!targetElement) return;

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    var yearElements = document.querySelectorAll("[data-year]");
    var currentYear = new Date().getFullYear();

    yearElements.forEach(function (element) {
        element.textContent = currentYear;
    });

});

})();