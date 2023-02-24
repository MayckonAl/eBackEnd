const APP_KEY = 'FRONTEND'

export function getStorageItem() {
  if (typeof window === 'undefined') return

  const data = window.localStorage.getItem(`${APP_KEY}`)
  return JSON.parse(data)
}

export function setStorageItem(value) {
  if (typeof window === 'undefined') return

  const data = JSON.stringify(value)
  return window.localStorage.setItem(`${APP_KEY}`, data)
}
