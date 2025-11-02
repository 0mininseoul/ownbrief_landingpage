declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void
  }
}

export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams)
  }
}

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
      page_path: url,
    })
  }
}

export const trackMVPButtonClick = (location: 'hero' | 'cta') => {
  trackEvent('click_mvp_button', {
    button_location: location,
  })
}

export const trackEmailSubscription = () => {
  trackEvent('email_subscription', {
    method: 'landing_page',
  })
}
