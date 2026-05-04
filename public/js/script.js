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

})()