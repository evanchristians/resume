const scrollElements = document.querySelectorAll("[scrolly]")
const gridImages = document.querySelectorAll(".griddy > .item > img")

function enterView(element) {
  element.classList.add('is-in-view')
}

function exitView(element) {
  element.classList.remove('is-in-view')
}

function selectImages(element) {
  return element.querySelectorAll('img')
}

function waitForImagesToLoad(images, callback) {
  images = selectImages(images)

  let count =  images.length ?? 0
  
  if (count > 1) {
    images.forEach(image => {
      image.addEventListener('load', () => {
        count--
        if (count < 1) {
          return callback()
        }
      })
      image.src = image.getAttribute('image-source')
    })
  } else {
    return callback()
  }
}

scrollElements.forEach(element => {
  let observerTimeOut

  let observer = new IntersectionObserver(function(entry) {
    let element = entry[0]

    waitForImagesToLoad(element.target, () => {
      if(element.isIntersecting) {
          clearTimeout(observerTimeOut)
          enterView(element.target)
        } else {
          observerTimeOut = setTimeout(() => {
            exitView(element.target)
          }, 3000)
        }
      }, { threshold: [.2, 1] });
  })
  observer.observe(element);
})
