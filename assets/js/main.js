/**
* Template Name: MyResume - v4.8.1
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  document.addEventListener("contextmenu", function(e){
    if (e.target.nodeName === "IMG") {
        e.preventDefault();
    }
  }, false);

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let scrollY = window.pageYOffset
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      // getBoundingClientRect gives accurate position regardless of CSS positioning
      let sectionTop = section.getBoundingClientRect().top + scrollY - 50
      let sectionBottom = sectionTop + section.offsetHeight
      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  window.addEventListener('scroll', navbarlinksActive)

  const tester = select(".tester");
  var blurb_end = false;

  const hero_text = select("#hero p");

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    var blurb = new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 30,
      backSpeed: 10,
      backDelay: 1000,
      onComplete: function(self) { blurb.stop(); blurb_end = true;

      },      
    });
  }


  /**
   * Page corner flip effect
   */
  const flipcorner = () => {
    let pagecorner = select('.page-corner-up');
    if (!pagecorner) return; // hidden in dark mode — skip safely
    if (pagecorner.classList.contains("page-corner-down")) {
      pagecorner.classList.remove("page-corner-down");
    } else {
      pagecorner.classList.add("page-corner-down");
    }
  }
  window.addEventListener('load', flipcorner);


  /**
   * Customize color of page
   */

  function rgbtohex(rgb_input) {
    //ex. input: rgb(100, 100, 100) -> output: [100,100,100]
    let rgb_vals = rgb_input.slice(4, -1);
    let rgb_nospace = rgb_vals.replace(/ /g, "");
    let separated = rgb_nospace.split(",");

    var r, g, b;
    r = parseInt(separated[0]);
    g = parseInt(separated[1]);
    b = parseInt(separated[2]);

    //for converting each component value
    function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

    //joins components together
    function makeHex(r, g, b) {
      return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    return makeHex(r, g, b);
    
  }

  //uses hex values, returns new color
  function LightenDarkenColor(col, amt) {
  
    var usePound = false;
  
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  
}
  

  // Color picker — instant native CSS variable update, no jQuery, no timer
  document.querySelectorAll('.color-picker button').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var id = this.id;
      var main, lighter, accent;
      var isSunset = (id === 'color-3');

      if (isSunset) {
        main    = '#f97316';
        lighter = '#fb923c';
        accent  = '#ec4899';
      } else {
        // Read actual button background via getComputedStyle (reliable, no jQuery)
        var bg = window.getComputedStyle(this).backgroundColor;
        var m  = bg.match(/\d+/g);
        if (!m || m.length < 3) return;
        var r = parseInt(m[0]), g = parseInt(m[1]), b = parseInt(m[2]);
        var toHex = function(n) { return ('0' + n.toString(16)).slice(-2); };
        main    = '#' + toHex(r) + toHex(g) + toHex(b);
        // Lighten: clamp channels at 255
        var lr = Math.min(255, r + 60), lg = Math.min(255, g + 60), lb = Math.min(255, b + 60);
        lighter = '#' + toHex(lr) + toHex(lg) + toHex(lb);
        // Darken: clamp channels at 0
        var dr = Math.max(0, r - 50), dg = Math.max(0, g - 50), db = Math.max(0, b - 50);
        accent  = '#' + toHex(dr) + toHex(dg) + toHex(db);
      }

      // Apply instantly — no delay, no jQuery
      document.documentElement.style.setProperty('--main-color',    main);
      document.documentElement.style.setProperty('--lighter-color', lighter);
      document.documentElement.style.setProperty('--accent-color',  accent);

      if (isSunset) {
        document.body.classList.add('theme-sunset');
      } else {
        document.body.classList.remove('theme-sunset');
      }

      // Visual feedback — highlight selected dot
      document.querySelectorAll('.color-picker button').forEach(function(b) {
        b.style.opacity  = '0.3';
        b.style.transform = 'scale(1)';
      });
      this.style.opacity   = '1';
      this.style.transform = 'scale(1.8)';
    });
  });

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let element = select(el)
    if (!element) return
    let elementPos = element.getBoundingClientRect().top + window.pageYOffset - 20
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Expanding images
   */
  let expandables = select('.expandable', true);
  if (expandables) {

    expandables.forEach(expandable => {
      if (!(expandable.offsetWidth > window.innerWidth*.8)) {
        expandable.classList.add("zoomable");
        expandable.addEventListener("click", () => 
        {
          expandable.classList.toggle("enlarge");
        }
        );
      }
    })
  }
  
  /**
   * For expanding images that are in a bootstrap grid
   */
  let gridexpandables = select('.grid-expandable', true);
  if (gridexpandables) {
    
    gridexpandables.forEach(expandable => {
      if (!(expandable.offsetWidth > window.innerWidth*.7)) {
        expandable.classList.add("zoomable");
        var toggler = ""
        if (expandable.classList[0].startsWith('col-12')) {
          expandable.classList.forEach(item => {
            if (item.startsWith('col-xl-')) {
              toggler = item   
            }
            else if (item.startsWith('col-lg-')) {
              toggler = item   
            }
          }
          )
        }
        else {toggler='col-12'}
        console.log('toggler: ', toggler)

        expandable.addEventListener("click", () => {
          expandable.classList.toggle(toggler)
          console.log(expandable.classList)

        }
        

      
      
      );
    }
    })
  }



  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    let projectGrid = select('.project-grid');

    if (portfolioContainer) {

      // if (projectGrid) {
      //   let testIsotope = new Isotope(projectGrid, {
      //     itemSelector: '.grid-item',
      //     percentPosition: true,
      //     masonry: {
      //       // use outer width of grid-sizer for columnWidth
      //       columnWidth: '.grid-sizer',
      //       gutter: '.gutter-sizer'
      //     }
      //   })
      // }

      let projects = select('.portfolio-wrap', true);
      projects.forEach(function(e) {

      })

      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      // Apply the initial active filter (gen-ai) to match the HTML visual state
      let activeFilters = ['.filter-genai'];
      portfolioIsotope.arrange({ filter: '.filter-genai' });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        var filterValue = this.getAttribute('data-filter');
        // portfolioFilters.forEach(function(el) {
        //   el.classList.remove('filter-active');
        // });
        if(this.classList.contains('filter-active')){
          this.classList.remove('filter-active')
          activeFilters = activeFilters.filter(function(e) { return e !== filterValue })
        }
        else {
          this.classList.add('filter-active')
          activeFilters.push(filterValue)
        }

        portfolioIsotope.arrange({
          filter: activeFilters.join()
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  new Swiper('.about-pictures', {
    speed: 400,
    loop: true,
    effect: "cards",
    grabCursor: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

})()

/**
 * Particle animation — antigravity interactive background
 */
;(function() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const PARTICLE_COUNT = window.innerWidth < 768 ? 45 : 80;
  const CONNECT_DIST = 110;
  const REPEL_RADIUS = 130;
  let particles = [];
  let mouse = { x: null, y: null };
  let animId;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function getAccentRgb() {
    const hex = (getComputedStyle(document.documentElement)
      .getPropertyValue('--main-color').trim() || '#ff7b3a').replace('#', '');
    const full = hex.length === 3 ? hex.split('').map(c => c + c).join('') : hex;
    const n = parseInt(full, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  class Particle {
    constructor(initialY) {
      this.init(initialY);
    }
    init(startY) {
      this.x = Math.random() * canvas.width;
      this.y = startY !== undefined ? startY : canvas.height + Math.random() * 60;
      this.baseSpeedY = -(Math.random() * 0.5 + 0.15);
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.size = Math.random() * 2 + 0.6;
      this.alpha = 0;
      this.targetAlpha = Math.random() * 0.55 + 0.2;
      this.traveled = 0;
      this.totalDist = canvas.height + Math.random() * 80;
    }
    update() {
      this.y += this.baseSpeedY;
      this.x += this.speedX;
      this.traveled += Math.abs(this.baseSpeedY);

      // Mouse repulsion (antigravity push)
      if (mouse.x !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * 1.8;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }
      }

      // Fade in/out
      const progress = this.traveled / this.totalDist;
      if (progress < 0.12) {
        this.alpha = (progress / 0.12) * this.targetAlpha;
      } else if (progress > 0.78) {
        this.alpha = ((1 - progress) / 0.22) * this.targetAlpha;
      } else {
        this.alpha = this.targetAlpha;
      }

      if (this.y < -10 || this.x < -60 || this.x > canvas.width + 60) {
        this.init();
      }
    }
    draw(r, g, b) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${this.alpha.toFixed(3)})`;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = new Particle(Math.random() * canvas.height);
      p.traveled = Math.random() * p.totalDist * 0.75;
      p.alpha = p.targetAlpha * 0.8;
      particles.push(p);
    }
  }

  function drawConnections(r, g, b) {
    for (let i = 0; i < particles.length - 1; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const lineAlpha = ((1 - dist / CONNECT_DIST) * 0.12).toFixed(3);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${r},${g},${b},${lineAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const [r, g, b] = getAccentRgb();
    drawConnections(r, g, b);
    particles.forEach(p => { p.update(); p.draw(r, g, b); });
    animId = requestAnimationFrame(animate);
  }

  // Track mouse relative to hero section
  const hero = document.getElementById('hero');
  if (hero) {
    hero.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    hero.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });
    // Touch support
    hero.addEventListener('touchmove', e => {
      const rect = hero.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
    }, { passive: true });
    hero.addEventListener('touchend', () => { mouse.x = null; mouse.y = null; });
  }

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    resize();
    initParticles();
    animate();
  });

  resize();
  initParticles();
  animate();
})()