// Firebase Integration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

const firebaseConfig = { 
  apiKey: "AIzaSyCM8ZVcf1k9z8WlG6nadvG5GgVv8vAAlVc", 
  authDomain: "cbc-project-and-painting.firebaseapp.com", 
  projectId: "cbc-project-and-painting", 
  storageBucket: "cbc-project-and-painting.firebasestorage.app", 
  messagingSenderId: "717468305860", 
  appId: "1:717468305860:web:209406ebe3850106ebbc91", 
  measurementId: "G-Q8LBETBCF8" 
}; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Hero Image Slider
const sliderImg1 = document.getElementById('sliderImg1');
const sliderImg2 = document.getElementById('sliderImg2');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (sliderImg1 && sliderImg2) {
    const images = [
        'pictures/P1.png', 'pictures/P2.png', 'pictures/P3.png', 'pictures/P4.png', 'pictures/P5.png',
        'pictures/P6.png', 'pictures/P7.png', 'pictures/P8.png', 'pictures/P9.png', 'pictures/P10.png',
        'pictures/P11.png', 'pictures/P12.png', 'pictures/P13.png', 'pictures/P14.png', 'pictures/P15.png',
        'pictures/P16.png', 'pictures/P17.png', 'pictures/P18.png', 'pictures/P19.png', 'pictures/P20.png',
        'pictures/P21.png', 'pictures/P22.png', 'pictures/P23.png', 'pictures/P24.png', 'pictures/P25.png',
        'pictures/P26.png', 'pictures/P27.png', 'pictures/P28.png', 'pictures/P29.png', 'pictures/P3O.png',
        'pictures/P31.png', 'pictures/P32.png', 'pictures/P35.png', 'pictures/P36.png', 'pictures/P37.png',
        'pictures/P38.png', 'pictures/P39.png', 'pictures/P40.png', 'pictures/P41.png', 'pictures/P42.png',
        'pictures/P43.png', 'pictures/P44.png', 'pictures/P45.png', 'pictures/P46.png', 'pictures/P47.png',
        'pictures/P48.png', 'pictures/P49.png', 'pictures/P50.png', 'pictures/P51.png', 'pictures/P52.png',
        'pictures/P53.png', 'pictures/P54.png'
    ];

    let currentIndex = 0;
    let autoSlideTimeout;
    let isTransitioning = false;
    let activeSlider = 1;

    function updateImage(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        const nextImageSrc = images[index];
        const nextSlider = activeSlider === 1 ? sliderImg2 : sliderImg1;
        const currentSlider = activeSlider === 1 ? sliderImg1 : sliderImg2;

        // 1. Preload the next image on the hidden slider
        const tempImg = new Image();
        tempImg.src = nextImageSrc;
        
        tempImg.onload = () => {
            // 2. Set the hidden slider's source
            nextSlider.src = nextImageSrc;
            
            // 3. Start the cross-fade
            nextSlider.classList.add('active');
            currentSlider.classList.remove('active');

            // 4. Update state after transition
            setTimeout(() => {
                currentIndex = index;
                activeSlider = activeSlider === 1 ? 2 : 1;
                isTransitioning = false;
                resetAutoSlide();
            }, 800); // Match CSS transition
        };

        tempImg.onerror = () => {
            isTransitioning = false;
            const nextIdx = (index + 1) % images.length;
            updateImage(nextIdx);
        };
    }

    function showNext() {
        clearTimeout(autoSlideTimeout);
        if (isTransitioning) return;
        const nextIndex = (currentIndex + 1) % images.length;
        updateImage(nextIndex);
    }

    function showPrev() {
        clearTimeout(autoSlideTimeout);
        if (isTransitioning) return;
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage(prevIndex);
    }

    function resetAutoSlide() {
        clearTimeout(autoSlideTimeout);
        autoSlideTimeout = setTimeout(showNext, 3000); // Back to 3s for smooth viewing
    }

    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.preventDefault(); showNext(); });
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.preventDefault(); showPrev(); });

    resetAutoSlide();
}

// Sticky Header (for padding change on scroll)
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.4)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    }
});

// Smooth Scrolling for anchor links
const navItems = document.querySelectorAll('.nav-item');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Handle active state for bottom nav
            if (this.classList.contains('nav-item')) {
                navItems.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
            }
        }
    });
});

// Update active state on scroll
window.addEventListener('scroll', () => {
    let current = "";
    const sections = document.querySelectorAll('section');
    const scrollPos = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Disable Right Click, Inspect, and View Source
document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(e) {
    // Disable F12 (Inspect Element)
    if(e.keyCode == 123) {
        return false;
    }
    // Disable Ctrl+Shift+I (Inspect Element)
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    // Disable Ctrl+Shift+C (Inspect Element)
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    // Disable Ctrl+Shift+J (Console)
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    // Disable Ctrl+U (View Source)
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
};
