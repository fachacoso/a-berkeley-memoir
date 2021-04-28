/*------------------------------------*\
  #Event Listeners
\*------------------------------------*/
var carouselContainers = document.querySelectorAll(".carousel-container")
for (var i = 0; i < carouselContainers.length; i++ ) {
    var currContainer = carouselContainers[i]

    makeIndicators(currContainer)
    setNavButtons(currContainer)
    
    var indicatorContainer = getIndicatorContainer(currContainer)
    indicatorContainer.addEventListener('click', function(e) {
        setIndicatorButtons(e)
    })
}


/*------------------------------------*\
  #Functions
\*------------------------------------*/
function setNavButtons(container) {
    var prevButton = getPrev(container)
    prevButton.onclick = function() {
        prevImg(container)
    }
    var nextButton = getNext(container)
    nextButton.onclick = function() {
        nextImg(container)
    }
}

function setIndicatorButtons(e) {
    var clickedButton = e.target.closest('.carousel-indicator-container button')
    if (clickedButton === null) {
        return
    }
    var indicatorContainer = clickedButton.parentNode
    var carouselContainer = indicatorContainer.parentNode
    var clickedIndex = Array.from(clickedButton.parentNode.children).indexOf(clickedButton)
    updateActiveImg(carouselContainer, clickedIndex)
}

function prevImg(container) {
    var oldPos = getActiveIndex(container)
    updateActiveImg(container, oldPos - 1)
}

function nextImg(container) {
    var oldPos = getActiveIndex(container)
    updateActiveImg(container, oldPos + 1)
}

function updateActiveImg(container, index) {
    // Do nothing if clicked active index
    var oldPos = getActiveIndex(container)
    if (oldPos === index) {
        return
    }
    switchActive(container, oldPos, index)
    updateNav(container)
}

function switchActive(container, oldPos, newPos) {
    var carousel = getImgCarousel(container)
    var indicatorContainer = getIndicatorContainer(container)

    carousel.children[oldPos].classList.remove('active')
    indicatorContainer.children[oldPos].classList.remove('active')

    carousel.children[newPos].classList.add('active')
    indicatorContainer.children[newPos].classList.add('active')

    setActiveIndex(container, newPos)
}

function updateNav(container) {
    var activeIndex = getActiveIndex(container)
    var carouselLen = len(container)
    var prevButton = getPrev(container)
    var nextButton = getNext(container)
    
    // Check prevButton
	if (activeIndex === 0) {
		prevButton.classList.add('hidden')
	}
	else if (prevButton.classList.contains("hidden")) {
		prevButton.classList.remove('hidden')
	}

    // Check nextButton
	if (activeIndex === carouselLen - 1) {
		nextButton.classList.add('hidden')
	}
	else if (nextButton.classList.contains("hidden")) {
		nextButton.classList.remove('hidden')
	}
}

function makeIndicators(container) {
    var indicatorContainer = getIndicatorContainer(container)
    for (var i = 0; i < len(container); i++) {
        var indicator = document.createElement('button')
        if (i === 0) {
            indicator.className = 'carousel-indicator active'
            indicatorContainer.appendChild(indicator)
            continue
        }
        indicator.className = 'carousel-indicator'
        indicatorContainer.appendChild(indicator)
    }
}

function setIndicatorOnclick(container) {
    var indicatorContainer = getIndicatorContainer(container)
    indicatorContainer.children[i].onclick = function() {
        updateActiveImg(container,  i)
    }
}

    /*------------------------------------*\
    #Helper Functions
    \*------------------------------------*/
    function getPrev(container) {
        var nav = container.children[0].children[0]
        return nav.children[0]
    }

    function getNext(container) {
        var nav = container.children[0].children[0]
        return nav.children[1]
    }

    function getImgCarousel(container) {
        return container.children[1]
    }

    function getIndicatorContainer(container) {
        return container.children[2]
    }

    function len(container) {
        var carousel = getImgCarousel(container)
        return carousel.children.length
    }

    function getActiveIndex(container) {
        var carousel = getImgCarousel(container)
        return parseInt(carousel.getAttribute("data-pos"))
    }

    function setActiveIndex(container, index) {
        var carousel = getImgCarousel(container)
        carousel.setAttribute("data-pos", index)
    }
