/* =====================================================================
   OM POLO FIBRE PLAST - Main JavaScript
   Handles: preloader, sticky nav, mobile menu, scroll reveal,
            scroll-to-top, products modal, gallery lightbox,
            FAQ accordion, animated counters, contact form.
   All features are progressive & namespaced. No dependencies.
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- 1. Preloader ---------- */
  window.addEventListener("load", function () {
    var pre = document.getElementById("preloader");
    if (pre) {
      setTimeout(function () {
        pre.classList.add("hidden");
      }, 400);
    }
  });

  /* Wait for DOM ready for the rest */
  document.addEventListener("DOMContentLoaded", function () {

    /* ---------- 2. Sticky header on scroll ---------- */
    var header = document.querySelector(".header");
    var scrollTopBtn = document.querySelector(".scroll-top");

    function onScroll() {
      var y = window.scrollY;
      if (header) header.classList.toggle("scrolled", y > 20);
      if (scrollTopBtn) scrollTopBtn.classList.toggle("show", y > 500);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ---------- 3. Mobile navigation toggle ---------- */
    var toggle = document.querySelector(".nav__toggle");
    var menu = document.querySelector(".nav__menu");
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var open = menu.classList.toggle("open");
        toggle.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        document.body.style.overflow = open ? "hidden" : "";
      });
      // Close menu when a link is clicked
      menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          menu.classList.remove("open");
          toggle.classList.remove("open");
          document.body.style.overflow = "";
        });
      });
    }

    /* ---------- 4. Scroll-to-top button ---------- */
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    /* ---------- 5. Scroll reveal (IntersectionObserver) ---------- */
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("visible"); });
    }

    /* ---------- 6. Animated counters ---------- */
    var counters = document.querySelectorAll("[data-count]");
    if ("IntersectionObserver" in window && counters.length) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseFloat(el.getAttribute("data-count"));
          var suffix = el.getAttribute("data-suffix") || "";
          var start = 0;
          var dur = 1600;
          var startTime = null;
          function step(ts) {
            if (!startTime) startTime = ts;
            var p = Math.min((ts - startTime) / dur, 1);
            var val = Math.floor(p * (target - start) + start);
            el.textContent = val + suffix;
            if (p < 1) requestAnimationFrame(step);
            else el.textContent = target + suffix;
          }
          requestAnimationFrame(step);
          cio.unobserve(el);
        });
      }, { threshold: 0.5 });
      counters.forEach(function (c) { cio.observe(c); });
    }

    /* ---------- 7. FAQ accordion ---------- */
    var faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(function (item) {
      var q = item.querySelector(".faq-q");
      var a = item.querySelector(".faq-a");
      if (!q || !a) return;
      q.addEventListener("click", function () {
        var isOpen = item.classList.contains("open");
        // close all
        faqItems.forEach(function (i) {
          i.classList.remove("open");
          var ans = i.querySelector(".faq-a");
          if (ans) ans.style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add("open");
          a.style.maxHeight = a.scrollHeight + "px";
        }
      });
    });

    /* ---------- 8. Product modal ---------- */
    var productModal = document.getElementById("product-modal");
    if (productModal) {
      var pmImg = productModal.querySelector("[data-pm-img]");
      var pmTag = productModal.querySelector("[data-pm-tag]");
      var pmTitle = productModal.querySelector("[data-pm-title]");
      var pmDesc = productModal.querySelector("[data-pm-desc]");
      var pmSpecs = productModal.querySelector("[data-pm-specs]");

      function openProduct(card) {
        var data = card.dataset;
        if (pmImg) { pmImg.src = data.img; pmImg.alt = data.title; }
        if (pmTag) pmTag.textContent = data.tag || "FRP Product";
        if (pmTitle) pmTitle.textContent = data.title || "";
        if (pmDesc) pmDesc.textContent = data.desc || "";
        if (pmSpecs) {
          var specs = (data.specs || "").split("|").filter(Boolean);
          pmSpecs.innerHTML = specs.map(function (s) {
            return '<li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg><span>' + s.trim() + "</span></li>";
          }).join("");
        }
        productModal.classList.add("open");
        document.body.style.overflow = "hidden";
      }

      document.querySelectorAll("[data-product]").forEach(function (card) {
        card.addEventListener("click", function () { openProduct(card); });
      });

      productModal.querySelectorAll("[data-close-modal]").forEach(function (el) {
        el.addEventListener("click", function (e) {
          if (e.target === productModal || el.hasAttribute("data-close-modal")) {
            productModal.classList.remove("open");
            document.body.style.overflow = "";
          }
        });
      });
    }

    /* ---------- 9. Gallery lightbox ---------- */
    var lightbox = document.getElementById("lightbox");
    if (lightbox) {
      var lbImg = lightbox.querySelector("[data-lb-img]");
      var lbCounter = lightbox.querySelector("[data-lb-counter]");
      var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
      var current = 0;

      function visibleItems() {
        return galleryItems.filter(function (it) { return it.style.display !== "none"; });
      }
      function showAt(index) {
        var items = visibleItems();
        if (!items.length) return;
        current = (index + items.length) % items.length;
        var img = items[current].querySelector("img");
        if (lbImg && img) { lbImg.src = img.src; lbImg.alt = img.alt; }
        if (lbCounter) lbCounter.textContent = (current + 1) + " / " + items.length;
      }
      galleryItems.forEach(function (item) {
        item.addEventListener("click", function () {
          var items = visibleItems();
          showAt(items.indexOf(item));
          lightbox.classList.add("open");
          document.body.style.overflow = "hidden";
        });
      });
      lightbox.querySelector("[data-lb-close]").addEventListener("click", function () {
        lightbox.classList.remove("open");
        document.body.style.overflow = "";
      });
      lightbox.querySelector("[data-lb-prev]").addEventListener("click", function (e) {
        e.stopPropagation(); showAt(current - 1);
      });
      lightbox.querySelector("[data-lb-next]").addEventListener("click", function (e) {
        e.stopPropagation(); showAt(current + 1);
      });
      lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) {
          lightbox.classList.remove("open");
          document.body.style.overflow = "";
        }
      });
      document.addEventListener("keydown", function (e) {
        if (!lightbox.classList.contains("open")) return;
        if (e.key === "Escape") { lightbox.classList.remove("open"); document.body.style.overflow = ""; }
        if (e.key === "ArrowLeft") showAt(current - 1);
        if (e.key === "ArrowRight") showAt(current + 1);
      });

      /* ---------- 10. Gallery filters ---------- */
      var filterBtns = document.querySelectorAll(".filter-btn");
      filterBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          filterBtns.forEach(function (b) { b.classList.remove("active"); });
          btn.classList.add("active");
          var cat = btn.getAttribute("data-filter");
          galleryItems.forEach(function (item) {
            var show = cat === "all" || item.getAttribute("data-category") === cat;
            item.style.display = show ? "" : "none";
          });
        });
      });
    }

    /* ---------- 11. Close modals on Escape ---------- */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && productModal && productModal.classList.contains("open")) {
        productModal.classList.remove("open");
        document.body.style.overflow = "";
      }
    });

    /* ---------- 12. Contact form (AJAX submit to FormSubmit) ---------- */
    var form = document.getElementById("enquiry-form");
    if (form) {
      var alertBox = document.getElementById("form-alert");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var btn = form.querySelector('button[type="submit"]');
        var original = btn ? btn.innerHTML : "";
        if (btn) { btn.disabled = true; btn.innerHTML = "Sending..."; }

        fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        })
          .then(function (res) { return res.json().catch(function () { return {}; }); })
          .then(function () {
            if (alertBox) {
              alertBox.classList.add("show");
              alertBox.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            form.reset();
          })
          .catch(function () {
            // Fallback: submit normally so the enquiry is never lost
            form.submit();
          })
          .finally(function () {
            if (btn) { btn.disabled = false; btn.innerHTML = original; }
          });
      });
    }

    /* ---------- 13. Footer year ---------- */
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
