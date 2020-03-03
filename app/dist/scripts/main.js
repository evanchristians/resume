const navItems = document.querySelectorAll("[nav-item]")
const navBarList = document.getElementById("nav-bar-list")
const tooltip = document.getElementById("tooltip")
const grid = document.getElementById("grid")
const gridItems = document.querySelectorAll(".grid > .card")
const gridItemsContent = document.querySelectorAll(".card > .content")
let currentlyActive
let timeOut

navItems ? navItems.forEach(element => {
  element.addEventListener("mouseover", (event) => {
    let width = event.target.offsetWidth
    let offsetLeft = event.target.offsetLeft

    tooltip.setAttribute("tooltip", event.target.innerText)
    tooltip.style.opacity = "1";
    tooltip.style.left = (offsetLeft + (width / 2) - (tooltip.offsetWidth / 2)) + "px"
  })
}) : null

navBarList ? navBarList.addEventListener("mouseout", () => {
  timeOut = setTimeout(() => {
    tooltip.style.opacity = "0";
  }, 1200)
}) : null

navBarList ? navBarList.addEventListener("mouseover", () => {
  clearTimeout(timeOut)
}) : null

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
