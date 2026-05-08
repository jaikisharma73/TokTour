(() => {
  'use strict'

  // === Bootstrap Form Validation ===
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  })

  // === Navbar Scroll Effect ===
  const navbar = document.querySelector('.navbar')
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled')
      } else {
        navbar.classList.remove('scrolled')
      }
    })
  }

  // === Stagger Animation for Cards ===
  const cards = document.querySelectorAll('.pro-card')
  if (cards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = `${i * 0.06}s`
          entry.target.classList.add('animate-in')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    cards.forEach(card => {
      card.style.opacity = '0'
      observer.observe(card)
    })
  }

  // === Hero Button Hover ===
  const heroBtn = document.querySelector('.hero-search-form button')
  if (heroBtn) {
    heroBtn.addEventListener('mouseenter', () => {
      heroBtn.style.transform = 'translateY(-2px) scale(1.02)'
      heroBtn.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)'
    })
    heroBtn.addEventListener('mouseleave', () => {
      heroBtn.style.transform = ''
      heroBtn.style.boxShadow = ''
    })
  }
  
  // === Toggle Like Functionality ===
  window.toggleLike = async (event, listingId) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    try {
      const response = await fetch(`/listings/${listingId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.redirected) {
        window.location.href = response.url;
        return;
      }

      const data = await response.json();
      if (data.success) {
        const btns = document.querySelectorAll(`.like-btn[data-id="${listingId}"]`);
        const countDivs = document.querySelectorAll(`[id="count-${listingId}"]`);

        btns.forEach(btn => {
          const icon = btn.querySelector('i');
          if (data.liked) {
            btn.classList.add('liked');
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
          } else {
            btn.classList.remove('liked');
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
          }
        });

        countDivs.forEach(countDiv => {
          if (data.count > 0) {
            countDiv.innerText = data.count;
            countDiv.style.display = 'block';
          } else {
            countDiv.style.display = 'none';
          }
        });
      } else {
        if (response.status === 401) {
          window.location.href = "/login";
        }
      }
    } catch (err) {
      console.error("Error liking listing:", err);
      // If we get an error, it might be because the response wasn't JSON (like a redirect to login)
      // but fetch doesn't follow redirects for POST by default in some cases or the response might be HTML
      if (err.message.includes("Unexpected token")) {
          window.location.href = "/login";
      }
    }
  };

})()