(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 12);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });


  // Keep "years old" accurate without editing the page each January
  document.querySelectorAll('[data-years-since]').forEach(function (el) {
    var n = new Date().getFullYear() - Number(el.getAttribute('data-years-since'));
    if (n > 0) el.textContent = String(n);
  });

  // Newsletter: no mail provider connected yet, so sign-ups open a pre-filled email for now
  var form = document.getElementById('signup');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('signup-email');
      var note = document.getElementById('signup-note');
      if (!email.value || !email.checkValidity()) {
        note.textContent = 'Please enter a valid email address.';
        email.focus();
        return;
      }
      note.textContent = 'Opening your email app to confirm your sign-up…';
      window.location.href = 'mailto:hello@67bridge.com?subject=' + encodeURIComponent('Newsletter sign-up') +
        '&body=' + encodeURIComponent('Please add me to the Bridge Arts Foundation newsletter: ' + email.value);
    });
  }

  // Gentle reveal on scroll (skipped if the visitor prefers reduced motion)
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.section-head, .split, .pillars li, .event, .mosaic figure, .stats, .floor, .newsletter-inner, .visit-card, .role');
  if (reduce || !('IntersectionObserver' in window)) return;
  targets.forEach(function (el) { el.classList.add('reveal'); });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  targets.forEach(function (el) { io.observe(el); });
})();
