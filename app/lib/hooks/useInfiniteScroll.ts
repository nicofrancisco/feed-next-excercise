import { useEffect, useState } from 'react'

export const useInfiniteScroll = (anchorElement: HTMLElement | null, enabled: boolean = true) => {
  const [fetchMore, setFetchMore] = useState(false)

  useEffect(() => {
    if (!enabled) {
      return
    }

    const observer = new IntersectionObserver((entries) => {
      setFetchMore(entries[0].isIntersecting)
    })

    if (anchorElement) {
      observer.observe(anchorElement)
    }

    return () => {
      if (anchorElement) {
        observer.unobserve(anchorElement)
      }
    }
  }, [fetchMore, enabled])

  return { fetchMore }
}
