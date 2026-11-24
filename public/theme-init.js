// Runs before first paint to avoid a light/dark flash. Kept external so the CSP needs no 'unsafe-inline'.
try {
  var t = localStorage.getItem('theme')
  if (t === 'light' || (!t && window.matchMedia('(prefers-color-scheme: light)').matches)) {
    document.documentElement.classList.remove('dark')
  }
} catch (e) {}
