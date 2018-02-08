// @flow
export const conditionalRender = (
  statement: boolean,
  f: Class<React$Component<*, *, *>>,
  s?: Class<React$Component<*, *, *>>,
) => (statement ? f : s)

export function getCookie(name: string) {
  const matches = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1')}=([^;]*)`))
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * ((max - min) + 1)) + min
