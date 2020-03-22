const scrollElements = document.querySelectorAll("[scrolly]")

function enterView(element) {
  element.classList.add('is-in-view')
}

function exitView(element) {
  element.classList.remove('is-in-view')
}

scrollElements.forEach(element => {
  let observerTimeOut

  let observer = new IntersectionObserver(function(entry) {
    let element = entry[0]

    if(element.isIntersecting) {
      clearTimeout(observerTimeOut)
      enterView(element.target)
    } else {
      observerTimeOut = setTimeout(() => {
        exitView(element.target)
      }, 3000)
    }
  }, { threshold: [.2, 1] });

  observer.observe(element);
})