export function buildPublicFileUrl(appUrl: string, fileName: string) {
  return `${appUrl.replace(/\/$/, '')}/files/${fileName}`;
}