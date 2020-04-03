const scrollElements = document.querySelectorAll("[scrolly]")
const gridImages = document.querySelectorAll(".griddy > .item > img")
const images = document.querySelectorAll('img')

images.forEach(image => {
  image.src = image.getAttribute('image-source')
})

function enterView(element) {
  element.classList.add('is-in-view')
}

function exitView(element) {
  element.classList.remove('is-in-view')
}

function isImage(element) {
  return element.tagName === 'IMG'
}



function awaitImageLoad(element, callback) {
  image = isImage(element) ? element : false

  if(!image || image.complete) return callback();

  image.addEventListener('load', () => {
    return callback()
  })
}

scrollElements.forEach(element => {
  let observerTimeOut

  let observer = new IntersectionObserver(function(entry) {
    let element = entry[0]

    if(element.isIntersecting) {
      clearTimeout(observerTimeOut)

      awaitImageLoad(element.target, () => {
        enterView(element.target)
      })
    } else {
      observerTimeOut = setTimeout(() => {
        exitView(element.target)
      }, 1000)
    }
  }, { threshold: [.2, 1] });

  observer.observe(element);
})