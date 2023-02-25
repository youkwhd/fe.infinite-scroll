/**
 * @param {HTMLElement} element :: observe the passed element
 * @param {Function} callback :: function to extend the DOM to recursively change element target
 */
export const createInfiniteObserver = (element: HTMLElement, callback: Function) => {
    const observer = new IntersectionObserver((entries, observer) => {
        const entry = entries[0]

        if (entry.isIntersecting) {
            observer.unobserve(entry.target)
            callback()
        }
    })

    observer.observe(element)
}