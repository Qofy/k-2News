export function navigateTo(path) {
  window.location.hash = path
}

export function getCurrentPath() {
  return window.location.hash.slice(1) || '/'
}
