const tooltip = document.getElementById("tooltip")
const grid = document.getElementById("grid")
const gridItems = document.querySelectorAll(".grid > .card")
const gridItemsContent = document.querySelectorAll(".card > .content")
const scrollElements = document.querySelectorAll("[scrolly]")
console.log(scrollElements)
let currentlyActive
let timeOut

window.addEventListener("load", () => {
  gridItems.forEach((element, key) => {
    setTimeout(() => {
      element.classList.add('active-state')
    }, 75 * key)
  })
})

gridItems.forEach(e => {
  e.addEventListener("click", ()=> {
    currentlyActive ? currentlyActive.classList.remove('focused-state') : null
    currentlyActive = e
    currentlyActive.classList.add('focused-state')
  })
})

gridItemsContent.forEach(e => {
  e.addEventListener("mouseenter", () => {
    e.classList.add('active-state')

    e.childNodes[0].childNodes.forEach((c, index) => {
      setTimeout(() => {
        c.classList.add('active-state')
      }, 25 + 100 * index)
    })
  })
  e.addEventListener("mouseleave", () => {
    setTimeout(() => {
      e.classList.remove('active-state')

      e.childNodes[0].childNodes.forEach((c, index) => {
        c.classList.remove('active-state')
      })
    }, 250)
  })
})

function enterView(element) {
  element.classList.add('is-in-view')
}

function exitView(element) {
  element.classList.remove('is-in-view')
}

var observer = new IntersectionObserver(function(entry) {
  let element = entry[0]
	if(element.isIntersecting === true) {
    enterView(element.target)
  } else {
    exitView(element.target)
  }

}, { threshold: [.5] });

scrollElements.forEach(element => {
  console.log(element);
  observer.observe(element);
})