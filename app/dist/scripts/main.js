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

let last_known_scroll_position = 0;

function getScrollDirection(scrollEvent) {
  changeInHeight = scrollEvent.deltaY

  return changeInHeight > 0 ? 'down': 'up'
}

let pos = 0

window.addEventListener('wheel', event => {
  window.requestAnimationFrame(() => {
    scrollDirection = getScrollDirection(event)

    if (scrollDirection == 'up') {
      last_known_scroll_position -= 20
      function frame() {
        if (pos <= last_known_scroll_position) {
          clearInterval(id);
        } else {
          pos -= .25;
          document.getElementById('bar').style.width = pos + '%';
        }
      }
    } else {
      last_known_scroll_position += 20
      function frame() {
        if (pos >= last_known_scroll_position) {
          clearInterval(id);
        } else {
          pos += .25;
          document.getElementById('bar').style.width = pos + '%';
        }
      }
    }

    if (last_known_scroll_position < 0) {
      last_known_scroll_position = 0
    }

    if (last_known_scroll_position >= 100) {
      last_known_scroll_position = 100
    }

    var id = setInterval(frame, 2)
  });

  console.log(last_known_scroll_position)
});

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
