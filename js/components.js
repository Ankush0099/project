/* =====================================================================
   OM POLO FIBRE PLAST - Shared components injector
   Injects the footer, floating action buttons and scroll-to-top button
   into inner pages (any element with [data-footer]) so the markup is
   maintained in a single place. main.js then wires up behaviour.
   ===================================================================== */
(function () {
  "use strict";

  var footerHTML =
    '<footer class="footer">' +
    '  <div class="container">' +
    '    <div class="footer__grid">' +
    '      <div class="footer__brand">' +
    '        <img src="images/logo.png" alt="OM POLO FIBRE PLAST logo" />' +
    '        <p>Premium FRP / GRP manufacturing for power plants, paper mills and process industries. Quality, reliability and performance in every product.</p>' +
    '      </div>' +
    '      <div>' +
    '        <h4>Quick Links</h4>' +
    '        <ul class="footer__links">' +
    '          <li><a href="index.html">Home</a></li>' +
    '          <li><a href="about.html">About Us</a></li>' +
    '          <li><a href="products.html">Products</a></li>' +
    '          <li><a href="services.html">Services</a></li>' +
    '          <li><a href="projects.html">Projects</a></li>' +
    '          <li><a href="gallery.html">Gallery</a></li>' +
    '        </ul>' +
    '      </div>' +
    '      <div>' +
    '        <h4>Our Solutions</h4>' +
    '        <ul class="footer__links">' +
    '          <li><a href="products.html">FRP Tanks &amp; Vessels</a></li>' +
    '          <li><a href="products.html">Pipes &amp; Fittings</a></li>' +
    '          <li><a href="products.html">Ducting Systems</a></li>' +
    '          <li><a href="products.html">Scrubbers</a></li>' +
    '          <li><a href="services.html">Custom Fabrication</a></li>' +
    '        </ul>' +
    '      </div>' +
    '      <div>' +
    '        <h4>Contact Us</h4>' +
    '        <ul class="footer__contact">' +
    '          <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>245 New Shanti Colony, Chitta Mandir Road, Yamuna Nagar, Haryana &ndash; 135001</li>' +
    '          <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg><a href="tel:+917706042905">+91 77060 42905</a></li>' +
    '          <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><a href="mailto:ompolofibreplast27@gmail.com">ompolofibreplast27@gmail.com</a></li>' +
    '        </ul>' +
    '        <div class="footer__social">' +
    '          <a href="https://wa.me/917706042905" aria-label="WhatsApp" target="_blank" rel="noopener"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24z"/></svg></a>' +
    '          <a href="mailto:ompolofibreplast27@gmail.com" aria-label="Email"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></a>' +
    '          <a href="tel:+917706042905" aria-label="Call"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg></a>' +
    '        </div>' +
    '      </div>' +
    '    </div>' +
    '    <div class="footer__bottom">' +
    '      <span>&copy; <span id="year">2026</span> OM POLO FIBRE PLAST. All rights reserved.</span>' +
    '      <span>Power Plants &nbsp;|&nbsp; Paper Mills &nbsp;|&nbsp; Industrial Solutions</span>' +
    '    </div>' +
    '  </div>' +
    '</footer>';

  var fabHTML =
    '<div class="fab-stack">' +
    '  <a href="https://wa.me/917706042905?text=Hello%20OM%20POLO%20FIBRE%20PLAST%2C%20I%20have%20an%20enquiry." class="fab fab--whatsapp" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.738-.981z"/></svg></a>' +
    '  <a href="tel:+917706042905" class="fab fab--call" aria-label="Call now"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg></a>' +
    '  <a href="mailto:ompolofibreplast27@gmail.com" class="fab fab--email" aria-label="Send email"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></a>' +
    '</div>' +
    '<button class="scroll-top" aria-label="Scroll to top"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg></button>';

  document.addEventListener("DOMContentLoaded", function () {
    var slot = document.querySelector("[data-footer]");
    if (slot) {
      slot.outerHTML = footerHTML + fabHTML;
    }
  });
})();
