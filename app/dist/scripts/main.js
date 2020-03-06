const tooltip = document.getElementById("tooltip")
const grid = document.getElementById("grid")
const gridItems = document.querySelectorAll(".grid > .card")
const gridItemsContent = document.querySelectorAll(".card > .content")
let currentlyActive
let timeOut

window.addEventListener("load", () => {
  console.log(gridItems)
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
