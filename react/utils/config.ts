export const config = {
  getUrl: (path?: string) => `https://${window.location.host}/${path ?? ''}`,
}
