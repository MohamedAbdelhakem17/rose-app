type UseCookieOptions = {
  name: string;
  expireInMinutes?: number;
  allowOverwrite?: boolean;
};

type UseCookieReturn = {
  getCookieValue: () => string | null;
  setCookieValue: (value: string) => void;
  clearValue: () => void;
  isCookieExist: () => boolean;
};

/**
 * Hook to manage browser cookies safely.
 *
 * @param {object} options
 * @param {string} options.name - Cookie name (required)
 * @param {number} [options.expireInMinutes=60] - Cookie expiry in minutes (optional)
 * @param {boolean} [options.allowOverwrite=true] - Allow overwriting existing cookie (optional)
 * @returns {object} { getCookieValue, setCookieValue, clearValue, isCookieExist }
 */

export default function useCookie({
  name,
  expireInMinutes = 60,
  allowOverwrite = true,
}: UseCookieOptions): UseCookieReturn {
  // check if cooke name is valid
  if (!name || typeof name !== 'string') {
    throw new Error('Cookie name is required and must be a string');
  }

  // Variables
  const COOKIE_NAME = name.trim();

  //  Check if cookie already exists
  const isCookieExist = () => {
    return document.cookie
      .split('; ')
      .some(c => c.startsWith(`${COOKIE_NAME}=`));
  };

  //  Get cookie value
  const getCookieValue = () => {
    const cookie = document.cookie
      .split('; ')
      .find(c => c.startsWith(`${COOKIE_NAME}=`));

    return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
  };

  //  Set cookie value (with overwrite check)
  const setCookieValue = (value: string) => {
    if (typeof value !== 'string') {
      throw new Error('Cookie value must be a string');
    }

    if (isCookieExist() && !allowOverwrite) {
      console.warn(
        `Cookie "${COOKIE_NAME}" already exists and overwriting is disabled.`
      );

      return;
    }

    const expires = new Date(Date.now() + expireInMinutes * 60 * 1000);

    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/;`;
  };

  //  Clear cookie
  const clearValue = () => {
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  return { getCookieValue, setCookieValue, clearValue, isCookieExist };
}
