import React, { useState, useEffect } from 'react'
import throttle from 'lodash/throttle'

interface IOnlyProps {
  breakpoint?: number
  children: React.ReactNode
}

const breakpoints = {
  PHONE_SM: 320,
  PHONE: 376,
  PHABLET: 540,
  TABLET: 768,
  IPAD_PRO: 1024,
  DESKTOP: 1070,
  DESKTOP_MD: 1280,
  DESKTOP_LG: 1440
}

type MediaType =
  | 'PHONE_SM'
  | 'PHONE'
  | 'PHABLET'
  | 'TABLET'
  | 'IPAD_PRO'
  | 'DESKTOP'
  | 'DESKTOP_MD'
  | 'DESKTOP_LG'

export const media = (type: MediaType | number) => {
  if (typeof type === 'number') {
    return `@media (max-width: ${type}px)`
  }

  return `@media (max-width: ${breakpoints[type]}px)`
}

export const DesktopOnly = ({ breakpoint = 1070, children }: IOnlyProps) => {
  const width = useWindowWidth()
  if (width >= breakpoint) {
    return children as React.ReactElement
  } else {
    return null
  }
}

export const MobileOnly = ({ breakpoint = 1070, children }: IOnlyProps) => {
  const width = useWindowWidth()
  if (width >= breakpoint) {
    return null
  } else {
    return children as React.ReactElement
  }
}

function useWindowWidth() {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth

    const listener = throttle(() => setWidth(width), 20)
    window.addEventListener('resize', listener)
    listener()
    return () => window.removeEventListener('resize', listener)
  }, [])

  return width
}
