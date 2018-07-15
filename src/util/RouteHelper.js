
export function makeRouteHandler(route) {
  return () => {
    console.log(`go to ${route}`)
    window.location.hash = `#${route}`
  }
}