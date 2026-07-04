/* =====================================================================
   Goddard Projects Farm — Main JavaScript
   Smooth scroll, gallery lightbox, contact form validation
   ===================================================================== */

(function () {
  'use strict';

  /* ===================================================================
     Smooth Scroll — intercept internal anchor links
     =================================================================== */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;

      var targetId = link.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* ===================================================================
     Gallery Lightbox
     =================================================================== */
  function initLightbox() {
    var galleryItems = document.querySelectorAll('.gallery-item');
    if (!galleryItems.length) return;

    // Collect image hrefs
    var images = [];
    galleryItems.forEach(function (item) {
      images.push(item.getAttribute('href'));
    });

    // Build lightbox DOM once
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Image gallery lightbox');

    var imgEl = document.createElement('img');
    imgEl.className = 'lightbox-img';
    imgEl.alt = '';

    var closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.setAttribute('aria-label', 'Close lightbox');
    closeBtn.innerHTML = '&times;';

    var prevBtn = document.createElement('button');
    prevBtn.className = 'lightbox-nav lightbox-prev';
    prevBtn.setAttribute('aria-label', 'Previous image');
    prevBtn.innerHTML = '&#8249;';

    var nextBtn = document.createElement('button');
    nextBtn.className = 'lightbox-nav lightbox-next';
    nextBtn.setAttribute('aria-label', 'Next image');
    nextBtn.innerHTML = '&#8250;';

    lightbox.appendChild(imgEl);
    lightbox.appendChild(closeBtn);
    if (images.length > 1) {
      lightbox.appendChild(prevBtn);
      lightbox.appendChild(nextBtn);
    }

    document.body.appendChild(lightbox);

    var currentIndex = 0;

    function showImage(index) {
      if (index < 0 || index >= images.length) return;
      currentIndex = index;
      imgEl.src = images[currentIndex];
      imgEl.alt = 'Gallery image ' + (currentIndex + 1) + ' of ' + images.length;
    }

    function open(index) {
      showImage(index);
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function close() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      // Return focus to the gallery item that was clicked
      galleryItems[currentIndex].focus();
    }

    function next() {
      showImage((currentIndex + 1) % images.length);
    }

    function prev() {
      showImage((currentIndex - 1 + images.length) % images.length);
    }

    // Attach gallery item click handlers
    galleryItems.forEach(function (item, i) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        open(i);
      });
    });

    // Close button
    closeBtn.addEventListener('click', close);

    // Click outside image to close
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) close();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;

      switch (e.key) {
        case 'Escape':
          close();
          break;
        case 'ArrowRight':
          e.preventDefault();
          next();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prev();
          break;
      }
    });

    // Nav buttons
    if (images.length > 1) {
      nextBtn.addEventListener('click', next);
      prevBtn.addEventListener('click', prev);
    }
  }

  /* ===================================================================
     Contact Form — client-side validation
     =================================================================== */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var nameField = document.getElementById('name');
    var emailField = document.getElementById('email');
    var messageField = document.getElementById('message');

    function showError(field, msg) {
      var parent = field.closest('.form-field');
      if (!parent) return;
      parent.classList.add('error');
      var errorEl = parent.querySelector('.field-error');
      if (errorEl) errorEl.textContent = msg;
    }

    function clearError(field) {
      var parent = field.closest('.form-field');
      if (!parent) return;
      parent.classList.remove('error');
      var errorEl = parent.querySelector('.field-error');
      if (errorEl) errorEl.textContent = '';
    }

    function clearAllErrors() {
      [nameField, emailField, messageField].forEach(clearError);
    }

    function validate() {
      var valid = true;

      // Name: required
      if (!nameField.value.trim()) {
        showError(nameField, 'Please enter your name.');
        valid = false;
      } else {
        clearError(nameField);
      }

      // Email: required + format
      var emailVal = emailField.value.trim();
      if (!emailVal) {
        showError(emailField, 'Please enter your email address.');
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        showError(emailField, 'Please enter a valid email address.');
        valid = false;
      } else {
        clearError(emailField);
      }

      // Message: required
      if (!messageField.value.trim()) {
        showError(messageField, 'Please enter a message.');
        valid = false;
      } else {
        clearError(messageField);
      }

      return valid;
    }

    form.addEventListener('submit', function (e) {
      clearAllErrors();

      if (!validate()) {
        e.preventDefault();
      }
      // If valid, let the form submit naturally via mailto:
    });

    // Clear errors on input
    [nameField, emailField, messageField].forEach(function (field) {
      if (!field) return;
      field.addEventListener('input', function () {
        clearError(field);
      });
    });
  }

  /* ===================================================================
     Initialize everything on DOMContentLoaded
     =================================================================== */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initSmoothScroll();
      initLightbox();
      initContactForm();
    });
  } else {
    initSmoothScroll();
    initLightbox();
    initContactForm();
  }
})();
