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
