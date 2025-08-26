// Load content via .json + .js files
loadContent();

// Move Body below fixed navbar dinamically
function setNavHeight(){
    const header = document.querySelector('header');
    const root = document.querySelector(':root');
    root.style.setProperty('--navHeight', `${header.clientHeight}px`);
}

window.addEventListener('resize', setNavHeight);
window.addEventListener('DOMContentLoaded', setNavHeight);

// Smooth scrolling for navigation
// Grab all `a` links starting with `#`
document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle with header preservation
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.main-nav');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && e.target !== navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        };
    });

    // Prevent clicks inside nav from closing
    navMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// Form submission
// const contactForm = document.querySelector('.contact-form');
// if (contactForm) {
//     contactForm.addEventListener('submit', function(e) {
//         e.preventDefault();
//         // Here you would typically send the form data to a server
//         alert('Thank you for your message! I will get back to you soon.');
//         this.reset();
//     });
// }

// Videos
function initVideo() {
    document.querySelectorAll('.video-thumb').forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Check if already loaded
            if (this.classList.contains('video-loaded')) return;

            // Add loading state
            this.classList.add('video-loading');
            this.innerHTML = '<div class="loader"></div>';

            // Create iframe after slight delay for smoother UX
            setTimeout(() => {
                const videoId = this.dataset.youtubeId;
                const iframe = document.createElement('iframe');

                iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1`);
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
                iframe.setAttribute('allowfullscreen', '');
                iframe.style.width = '100%';
                iframe.style.height = '100%';

                this.innerHTML = '';
                this.appendChild(iframe);
                this.classList.remove('video-loading');
                this.classList.add('video-loaded');
            }, 300); // Short delay for visual feedback
        });
    });
}

// Audio
// Play/Pause tracks with single play click & when ended it moves to next track
// Note: it should work on iOS devices
function initAudio() {
    document.addEventListener('play', function (e) {
        var allTracks = document.getElementsByTagName('audio');
        var indexT = Array.prototype.indexOf.call(allTracks, e.target);
        for (var i = 0, len = allTracks.length; i < len; i++) {
            if (allTracks[i] != e.target) {
                allTracks[i].pause(); // stop All Sounds except play one
            }
        }
        // this moves onto next track when current one ends
        e.target.addEventListener('ended', function(){            
            if (indexT != null) {
                if (indexT == allTracks.length-1) {
                    indexT = -1;
                }
            allTracks[indexT+1].play();
            }
        });
    }, true);
}

// Controls panel
// function initModals() {
//   // Get the modals
//   var controlsModal = document.getElementById("controls-modal");
  
//   // About box popup
//   var footBar = document.querySelector(".foot-bar");
//   var controlsBox = document.querySelector(".foot-bar > span > a");

//   controlsBox.onclick=()=> {
//     controlsModal.style.display = "flex";
//     footBar.style.display = "none";
//   }
  
//   // Get the <span> elements that close the modals
//   var xClose = document.querySelectorAll("span.close");
  
//   // When the user clicks on <span> (x), close the modal
//   xClose.forEach(e => {
//     e.onclick = function() { 
//       controlsModal.style.animation = "slideOut 1s";
//       setTimeout(()=>{
//         controlsModal.style.display = "none";
//         controlsModal.style.animation = "slideIn 0.8s";
//         footBar.style.display = "initial";
//         // page.style.overflowY = "initial";
//       },500)
//     }
//   })

//   // get range (slider) value:
//   // Get the root element
//   var r = document.querySelector(':root');
//   var baseSize = getComputedStyle(r).getPropertyValue('--base-size');
//   // slider input element
//   var fontSize = document.getElementById("gapSwitch");
//   fontSize.addEventListener('input', () => {
//     r.style.setProperty('--base-size', `calc(${baseSize} + ${fontSize.value}px)`);
//     // console.log("Got Here#2 :", fontSize.value);
//   })
// };