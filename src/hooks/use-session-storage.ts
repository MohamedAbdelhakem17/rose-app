'use client';
import 'client-only';

type UseSessionStorageOptions = {
  name: string;
};

type UseSessionStorageReturn = {
  getValue: () => string | null;
  setValue: (_value: string) => void;
  clearValue: () => void;
};

/**
 * Hook to manage browser sessionStorage safely.
 *
 * @param {object} options
 * @param {string} options.name - Storage key name (required)
 * @returns {object} { getValue, setValue, clearValue }
 */

export default function useSessionStorage({
  name,
}: UseSessionStorageOptions): UseSessionStorageReturn {
  if (!name || typeof name !== 'string') {
    throw new Error('Storage key name is required and must be a string');
  }

  const STORAGE_KEY = name.trim();

  // Get value
  const getValue = (): string | null => {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem(STORAGE_KEY);
  };

  // Set value
  const setValue = (value: string) => {
    if (typeof window === 'undefined') return;
    if (typeof value !== 'string') {
      throw new Error('Stored value must be a string');
    }
    sessionStorage.setItem(STORAGE_KEY, value);
  };

  // Clear value
  const clearValue = () => {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return { getValue, setValue, clearValue };
}
