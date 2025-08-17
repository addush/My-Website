// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  setupFormValidation();
  setupGalleryLightbox();
  setupBlogReadMore();
});

/* Contact Form Validation */
function setupFormValidation() {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', e => {
    const name = form.elements['name'];
    const email = form.elements['email'];
    const message = form.elements['message'];
    let valid = true;
    clearErrors(form);

    if (!name.value.trim()) {
      showError(name, 'Name is required');
      valid = false;
    }
    if (!email.value.trim() || !validateEmail(email.value.trim())) {
      showError(email, 'Valid email is required');
      valid = false;
    }
    if (!message.value.trim()) {
      showError(message, 'Message cannot be empty');
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
    }
  });

  function showError(field, message) {
    const error = document.createElement('span');
    error.className = 'error-message';
    error.style.color = '#cc0000';
    error.style.fontSize = '0.9rem';
    error.textContent = message;
    field.parentNode.insertBefore(error, field.nextSibling);
    field.focus();
  }

  function clearErrors(form) {
    form.querySelectorAll('.error-message').forEach(el => el.remove());
  }

  function validateEmail(email) {
    // Basic email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

/* Simple Gallery Lightbox */
function setupGalleryLightbox() {
  const galleryImages = document.querySelectorAll('.gallery-grid img');
  if (!galleryImages.length) return;

  // Create Lightbox elements
  const lightboxOverlay = document.createElement('div');
  lightboxOverlay.id = 'lightbox-overlay';
  lightboxOverlay.style.cssText = `
    position: fixed; top:0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.8); display: none; justify-content: center; align-items: center; z-index: 9999;
  `;

  const lightboxImage = document.createElement('img');
  lightboxImage.style.maxWidth = '90%';
  lightboxImage.style.maxHeight = '90vh';
  lightboxImage.style.borderRadius = '8px';
  lightboxOverlay.appendChild(lightboxImage);
  document.body.appendChild(lightboxOverlay);

  galleryImages.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt || '';
      lightboxOverlay.style.display = 'flex';
    });
  });

  lightboxOverlay.addEventListener('click', () => {
    lightboxOverlay.style.display = 'none';
  });

  // Close lightbox on Esc key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      lightboxOverlay.style.display = 'none';
    }
  });
}

/* Blog Post "Read More" Toggle */
function setupBlogReadMore() {
  const blogPosts = document.querySelectorAll('.blog-card');
  blogPosts.forEach(card => {
    const readMoreBtn = card.querySelector('a');
    if (!readMoreBtn) return;

    readMoreBtn.addEventListener('click', event => {
      event.preventDefault();
      const fullContentId = readMoreBtn.getAttribute('href').substring(1);
      // In real application, dynamically fetch or navigate to full post.
      alert(`This should navigate or load the full blog post: ${fullContentId}`);
    });
  });
}
