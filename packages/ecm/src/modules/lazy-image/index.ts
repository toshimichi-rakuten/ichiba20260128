export const ECM_MODULE_SELECTOR = 'img[data-lazy-loading]'

export class LazyImageObserver {
  observer: IntersectionObserver
  attribute = 'data-lazy-loading'
  options = {
    rootMargin: '400px',
  }

  constructor() {
    this.observer = new IntersectionObserver((entries) => {
      for (let entry of entries) {
        if (entry.intersectionRatio > 0) {
          this.load(entry.target as HTMLImageElement)
        }
      }
    }, this.options)
  }

  add(image: HTMLImageElement) {
    this.observer.observe(image)
  }

  load(target: HTMLImageElement) {
    const lazySrc = target.getAttribute(this.attribute)
    if (!lazySrc) {
      return
    }

    target.setAttribute('src', lazySrc)
    target.removeAttribute(this.attribute)
    this.observer.unobserve(target)
  }
}
