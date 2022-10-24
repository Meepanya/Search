function setCookie(cookieName, value, days): void {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${cookieName}=${value || ''}${expires}; path=/`;
}

function getCookie(cookieName): string {
  const cookieNameEQ = `${cookieName}=`;
  const ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(cookieNameEQ) === 0)
      return c.substring(cookieNameEQ.length, c.length);
  }

  return null;
}

export { getCookie, setCookie };
