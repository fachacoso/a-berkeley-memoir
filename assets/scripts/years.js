/*------------------------------------*\
  #Variables
\*------------------------------------*/

/* Constants */
const background = document.querySelector("#cover")
const buttons = document.querySelector("#button-container")
const memButton = document.querySelector("#button-memories")
const songButton = document.querySelector("#button-songs")

/* Memories View */
const memories = document.querySelector("#memories-container")
const [memBar, memMarker, memProgressList, memExit] = document.querySelector("#memories-overlay").children
const memItemsList = document.querySelector("#memory-items").children

/* Songs View */
const songs = document.querySelector("#songs-container")
const [songBar, songMarker, songProgressList, songExit] = document.querySelector("#songs-overlay").children
const songItemsList = document.querySelector("#song-items").children

/* Scroll variables */ 
const viewingHeight = window.innerHeight // Height of 100vh

/* Current page variable */
var currView = "buttons" // buttons, memories, songs
var scrollProgress = window.pageYOffset / viewingHeight


/*------------------------------------*\
  #Event Listeners
\*------------------------------------*/
window.addEventListener('scroll', function(e) {

    // Changes opacity of cover + buttons
    updateScrollProgress()
    setOpacity(buttons, scrollProgress)
    setOpacity(background, 1 - scrollProgress * 1)

    // If page on memories or songs view
    if (currView !== "buttons") {
        updateContent() // Updates progress bar AND items in memories/songs
    }
});


/* onClick Functions */
memButton.onclick = function(){
    /*
    * BUTTONS VIEW ---> MEMORIES VIEW
    */
    switchView(buttons, memories)
    setOpacity(memItemsList, [100, 0, 0, 0, 0])
    currView = "memories"
    updateContent()
}

songButton.onclick = function(){
    /*
    BUTTONS VIEW ---> SONGS VIEW
    */
    switchView(buttons, songs)
    setOpacity(songItemsList, [100, 0, 0, 0, 0])
    currView = "songs"
    updateContent()
}

memExit.onclick = function(){ 
    /*
    * MEMORIES VIEW ---> BUTTONS VIEW
    */
    switchView(memories, buttons)
    setOpacity(memItemsList, [0, 0, 0, 0, 0])
    currView = "buttons"
}


songExit.onclick = function(){ 
    /*
    SONGS VIEW ---> BUTTONS VIEW
    */
    switchView(songs, buttons)
    setOpacity(songItemsList, [0, 0, 0, 0, 0])
    currView = "buttons"
}

/*------------------------------------*\
  #Helper Functions
\*------------------------------------*/
function unhide(elem) {
    elem.classList.remove('hidden')
}

function hide(elem) {
    elem.classList.add('hidden')
}

function switchView(oldView, newView) {
    hide(oldView)
    unhide(newView)
}

function setOpacity(elem, opacity) {
    // If setting multiple element opacities
    if (typeof opacity === "object") {
        for (var i = 0; i < elem.length; i++) {
            if (opacity[i] === 'none') {
                continue
            }
            elem[i].style.opacity = opacity[i]
        }
        return
    } 
    elem.style.opacity = opacity
}

function updateContent(progress = scrollProgress) {
    /*
    * Adjusts PROGRESS-MARKER and ACTIVE-ITEM on memories/songs progress bar.
    */
    updateProgress(progress)
    updateItems(progress)
    function updateItems(progress = scrollProgress) {
        /*
        * Fades in and out items in Memories/Songs container.
        */
    
        // Fade In/Out variables 
        const fadeThreshold = .5 // Set when fade in/out starts/ends
        const fadeGap = .30 // Set how long fade lasts

        // Helper functions
        function scrollFadeOut(item) {
            /*
            * Helper to fade-OUT items.
            */
            var fracPageScrolled = (window.pageYOffset % viewingHeight) / viewingHeight
            if (fracPageScrolled > fadeGap){
                var percent =  (fracPageScrolled - fadeGap) / (fadeThreshold)
                setOpacity(item, 1 - percent)
            }
        }
        function scrollFadeIn(item) {
            /*
            * Helper to fade-IN items.
            */
            var fracPageScrolled = (window.pageYOffset % viewingHeight) / viewingHeight
            if (fracPageScrolled > fadeThreshold){
                var percent =  (fracPageScrolled - fadeThreshold) / (1 - fadeThreshold) 
                setOpacity(item, percent**3)
            }
        }
    
        var activePage = Math.floor(progress)
        switch (currView) {
            case "memories":
                var itemsList = memItemsList
                break
            case "songs":
                var itemsList = songItemsList
                break
            default:
                return
        }
        
        // Fade out/in items when scrolling
        for (var i = 0; i < itemsList.length; i++) {
            if (i + 1 === activePage) {
                scrollFadeOut(itemsList[i])
            }
            else if (i === activePage) {
                scrollFadeIn(itemsList[i])
            } 
        }
    }
}
function updateProgress(progress) {
    /*
    * Adjusts PROGRESS-MARKER and ACTIVE-ITEM on memories/songs progress bar.
    */

    // Helper functions

    var threshold = .4 // How early before next item 
    if (progress < threshold) {
        setActiveProgressItem(0)
        setProgressMarker(5)
    } 
    else if (progress < 1 + threshold) {
        setActiveProgressItem(1)
        setProgressMarker(20)
    }
    else if (progress < 2 + threshold) {
        setActiveProgressItem(2)
        setProgressMarker(40)
    }
    else if (progress < 3 + threshold) {
        setActiveProgressItem(3)
        setProgressMarker(60)
    }
    else if (progress < 4 + threshold) {
        setActiveProgressItem(4)
        setProgressMarker(80)
    }
    else {
        setActiveProgressItem(5)
        setProgressMarker(100)
    }
}

function setProgressMarker(end) {
    /*
    * PROGRESS-MARKER helper function.
    */
   // Checks currView if "memories" or "marker"
    switch (currView) {
        case "memories":
            var itemMarker = memMarker
            break
        case "songs":
            var itemMarker = songMarker
            break
        default:
            return
    }
    // Animate progress bar updates
    itemMarker.animate(
    [{ height: end + "vh" }], 
    {
        duration: 750,
        iterations: 1,
        easing: "ease-out",
        fill: 'forwards'
      }
    )
}

function setActiveProgressItem(activePage) {
    /*
    * ACTIVE-ITEM helper function.
    * @param activePage ("string") = label of current page state
    */
    // Checks currView if "memories" or "marker"
    switch (currView) {
        case "memories":
            var itemList = memProgressList.children
            break
        case "songs":
            var itemList = songProgressList.children
            break
        default:
            return
    }
    // Makes only item on screen active
    for (var i = 0; i < itemList.length; i++) {
        if (i === activePage - 1){
            itemList[i].classList.add('active')
            continue
        } 
        itemList[i].classList.remove('active')
    }
}

function updateScrollProgress() {
    scrollProgress = window.pageYOffset / viewingHeight
}