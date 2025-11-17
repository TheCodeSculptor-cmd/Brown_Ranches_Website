/*******************************
 * INITIALIZE SMOOTH SCROLL + GSAP
 *******************************/
function init() {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Locomotive Scroll for smooth scrolling effect
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });

    // Sync Locomotive Scroll with ScrollTrigger
    locoScroll.on("scroll", ScrollTrigger.update);

    // Configure ScrollTrigger to work with Locomotive Scroll
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length 
                ? locoScroll.scrollTo(value, 0, 0) 
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        // On mobile, Locomotive Scroll behaves differently
        pinType: document.querySelector("#main").style.transform 
                 ? "transform" 
                 : "fixed"
    });

    // Refresh ScrollTrigger whenever layout changes
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // Final refresh to apply all scroll-based effects
    ScrollTrigger.refresh();
}
init();

/*******************************
 * CUSTOM CURSOR INTERACTION
 *******************************/
var overlay = document.querySelector("#overlay");
var iscroll = document.querySelector("#scroll");

// Show custom cursor when hovering overlay
overlay.addEventListener("mouseenter", () => {
    iscroll.style.scale = 1;
});

// Hide cursor when leaving overlay
overlay.addEventListener("mouseleave", () => {
    iscroll.style.scale = 0;
});

// Move custom cursor with mouse
overlay.addEventListener("mousemove", (dets) => {
    iscroll.style.left = `${dets.x - 45}px`;
    iscroll.style.top = `${dets.y - 38}px`;
});

/*******************************
 * PAGE 3 IMAGE FOLLOW EFFECT
 *******************************/
document.querySelector("#page3").addEventListener("mousemove", (dets) => {
    const imgDiv = document.querySelector("#page3 #img-div");
    imgDiv.style.left = `${dets.x}px`;
    imgDiv.style.top = `${dets.y}px`;
});

/*******************************
 * PAGE 4 IMAGE & BUTTON FOLLOW
 *******************************/
document.querySelector("#page4").addEventListener("mousemove", (dets) => {
    const img = document.querySelector("#page4>img");
    const btn = document.querySelector("#page4>button");

    img.style.left = `${dets.x}px`;
    img.style.top = `${dets.y}px`;

    btn.style.left = `${dets.x + 50}px`;
    btn.style.top = `${dets.y + 200}px`;
});

/*******************************
 * PAGE 4 — CHANGE IMAGE ON HOVER
 *******************************/
var elem = document.querySelectorAll(".elem");

elem.forEach((e) => {
    var imgSource = e.getAttribute("data-img");

    e.addEventListener("mouseenter", () => {
        document.querySelector("#page4>img").setAttribute("src", imgSource);
    });
});

/*******************************
 * TEXT ANIMATION ON PAGE 1
 *******************************/
$('#page1 h1').textillate({
    in: {
        effect: 'fadeInUp',
        delayScale: 1,
    }
});

/*******************************
 * PAGE 2 — HEADING ANIMATION
 *******************************/
gsap.from("#page2 h1", {
    duration: 0.5,
    onStart: function () {
        $('#page2 h1').textillate({
            in: {
                effect: 'bounceIn',
                delayScale: 0.5,
            }
        });
    },
    scrollTrigger: {
        trigger: "#page2 h1",
        scroller: "#main",
        start: "top 90%"
    }
});

/*******************************
 * PAGE 2 — IMAGE ROTATE ON SCROLL
 *******************************/
gsap.to("#page2 img", {
    rotate: -5,
    scrollTrigger: {
        trigger: "#page2 img",
        scroller: "#main",
        start: "top 80%",
        scrub: 3
    }
});

/*******************************
 * DARK BACKGROUND ON SCROLL
 *******************************/
gsap.to("#main", {
    backgroundColor: "#111",
    scrollTrigger: {
        trigger: "#page2",
        scroller: "#main",
        start: "top -100%",
        end: "top -100%",
        scrub: 3
    }
});

/*******************************
 * TIMELINE — NAV & SVG COLOR CHANGES
 *******************************/
var tl = gsap.timeline({
    scrollTrigger: {
        trigger: "svg",
        scroller: "#main",
        start: "top 0%",
        end: "top -140%",
        scrub: true,
    }
});

// Change SVG + Nav to Black
tl.to("svg", {
    scale: 1,
    top: "5%",
    fill: "#111"
});
tl.to("#nav", {
    color: "#111",
    background: "linear-gradient(#ffffffeb, #ffffff6e, #ffffff00)"
});

// Change SVG + Nav to White (Later Section)
var tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: "svg",
        scroller: "#main",
        start: "top -340%",
        end: "top -340%",
        scrub: true,
    }
});

tl2.to("svg", {
    scale: 1,
    top: "5%",
    fill: "#fff"
});
tl2.to("#nav", {
    color: "#fff",
    background: "linear-gradient(#000000d5, #00000089, #00000000)"
});

/*******************************
 * PAGE 5 — PIN + ELEMENT ANIMATIONS
 *******************************/
gsap.to("#page5", {
    scrollTrigger: {
        trigger: "#page5",
        scroller: "#main",
        start: "top 0%",
        end: "top -100%",
        scrub: true,
        pin: true
    }
});

gsap.from("#page5-div1", {
    rotate: -5,
    scrollTrigger: {
        trigger: "#page5-div1",
        scroller: "#main",
        start: "top 85%",
        end: "top 30%",
        scrub: true
    }
});

gsap.from("#page5-div2", {
    y: 570,
    rotate: -15,
    scrollTrigger: {
        trigger: "#page5-div2",
        scroller: "#main",
        start: "top 80%",
        end: "top 50%",
        scrub: 2
    }
});

/*******************************
 * FULL SCREEN NAVIGATION MENU
 *******************************/
document.querySelector("#nav i").addEventListener("click", () => {
    document.querySelector("#full-scr").style.top = "0vh";
});

document.querySelector("#full-scr i").addEventListener("click", () => {
    document.querySelector("#full-scr").style.top = "-100vh";
});

/*******************************
 * OPTIONAL: REFRESH ON RESIZE
 * (Not recommended unless needed)
 *******************************/
// window.addEventListener("resize", function () {
//     location.reload();
// });
