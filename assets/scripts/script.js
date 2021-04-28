window.addEventListener('scroll', function(e) {
    const winHeight = window.innerHeight;
    var scrolled = window.pageYOffset;
    var percent = scrolled * 2 / winHeight;

    const foreground = document.getElementById('foreground');
    var scrollRate = -scrolled *1.5;
    foreground.style.transform = "translate3d(0px, "+scrollRate+"px, 0px)";

    const content = document.querySelector(".grid-container");
    content.style.opacity = percent;
    console.log( scrolled/winHeight)
    
    const background = document.querySelector("#background");
    background.style.opacity = 1 - (percent)/2;

});

