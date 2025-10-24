export class SecureCookieStorageAdapter {
  static setItem(key: string, value: string, expiresInDays: number = 7): void {
    try {
      const date = new Date();
      date.setTime(date.getTime() + expiresInDays * 24 * 60 * 60 * 1000);
      const expires = `expires=${date.toUTCString()}`;

      document.cookie = `${key}=${encodeURIComponent(
        value
      )}; ${expires}; path=/; Secure; SameSite=Strict;`;
    } catch (error) {}
  }

  static getItem(key: string): string | null {
    try {
      const name = `${key}=`;
      const decodedCookies = decodeURIComponent(document.cookie);
      const cookies = decodedCookies.split(";");

      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(name)) {
          return cookie.substring(name.length);
        }
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  static deleteItem(key: string): void {
    try {
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict;`;
    } catch (error) {
      throw error;
    }
  }
}
