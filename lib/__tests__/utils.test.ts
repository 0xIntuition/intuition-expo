/**
 * Tests for utility functions (lib/utils.ts)
 * Testing formatTrust, formatNumber, and shortenAddress
 */

import { formatTrust, formatNumber, shortenAddress } from '../utils';

describe('formatTrust', () => {
  describe('wei to ether conversion', () => {
    it('should convert wei to ether correctly', () => {
      // 1 ether = 1000000000000000000 wei
      expect(formatTrust('1000000000000000000')).toBe('1.00');
    });

    it('should handle large wei values', () => {
      // 2328.33 ether
      expect(formatTrust('2328330000000000000000')).toBe('2,328.33');
    });

    it('should handle small wei values', () => {
      // 0.5 ether
      expect(formatTrust('500000000000000000')).toBe('0.50');
    });

    it('should handle fractional ether amounts', () => {
      // 8.33 ether
      expect(formatTrust('8330000000000000000')).toBe('8.33');
    });

    it('should handle very large numbers with precision', () => {
      // 7823.29 ether
      expect(formatTrust('7823290000000000000000')).toBe('7,823.29');
    });
  });

  describe('decimal value handling', () => {
    it('should handle decimal strings (already formatted)', () => {
      expect(formatTrust('123.45')).toBe('123.45');
    });

    it('should handle large decimal strings', () => {
      expect(formatTrust('1234567.89')).toBe('1,234,567.89');
    });

    it('should always show 2 decimal places for integers', () => {
      expect(formatTrust('100.1')).toBe('100.10');
    });
  });

  describe('edge cases', () => {
    it('should return 0.00 for null', () => {
      expect(formatTrust(null)).toBe('0.00');
    });

    it('should return 0.00 for undefined', () => {
      expect(formatTrust(undefined)).toBe('0.00');
    });

    it('should return 0.00 for empty string', () => {
      expect(formatTrust('')).toBe('0.00');
    });

    it('should return 0.00 for whitespace string', () => {
      expect(formatTrust('   ')).toBe('0.00');
    });

    it('should handle zero wei', () => {
      expect(formatTrust('0')).toBe('0.00');
    });

    it('should handle number type input', () => {
      // Note: Large numbers as number type may lose precision
      // This test uses a smaller number that fits in JS number type
      expect(formatTrust(1000000000000000000)).toBe('1.00');
    });
  });

  describe('invalid input handling', () => {
    it('should return 0.00 for invalid numeric strings', () => {
      expect(formatTrust('abc')).toBe('0.00');
    });

    it('should return 0.00 for mixed alphanumeric', () => {
      expect(formatTrust('123abc')).toBe('0.00');
    });

    it('should return 0.00 for NaN result', () => {
      expect(formatTrust('not-a-number')).toBe('0.00');
    });

    it('should handle negative values', () => {
      expect(formatTrust('-1000000000000000000')).toBe('-1.00');
    });
  });
});

describe('formatNumber', () => {
  describe('basic number formatting', () => {
    it('should format integers with commas', () => {
      expect(formatNumber(1234)).toBe('1,234');
    });

    it('should format large numbers', () => {
      expect(formatNumber(34126)).toBe('34,126');
      expect(formatNumber(8752)).toBe('8,752');
    });

    it('should format millions', () => {
      expect(formatNumber(1234567)).toBe('1,234,567');
    });

    it('should handle small numbers without commas', () => {
      expect(formatNumber(123)).toBe('123');
      expect(formatNumber(99)).toBe('99');
    });

    it('should handle zero', () => {
      expect(formatNumber(0)).toBe('0');
    });
  });

  describe('string input handling', () => {
    it('should format numeric strings', () => {
      expect(formatNumber('1234')).toBe('1,234');
    });

    it('should handle decimal strings by flooring', () => {
      expect(formatNumber('123.99')).toBe('123');
      expect(formatNumber('99.1')).toBe('99');
    });

    it('should floor large decimal numbers', () => {
      expect(formatNumber('1234.567')).toBe('1,234');
    });
  });

  describe('edge cases', () => {
    it('should return 0 for null', () => {
      expect(formatNumber(null)).toBe('0');
    });

    it('should return 0 for undefined', () => {
      expect(formatNumber(undefined)).toBe('0');
    });

    it('should return 0 for empty string', () => {
      expect(formatNumber('')).toBe('0');
    });

    it('should return 0 for NaN', () => {
      expect(formatNumber(NaN)).toBe('0');
    });

    it('should return 0 for invalid string', () => {
      expect(formatNumber('abc')).toBe('0');
    });

    it('should handle negative numbers', () => {
      expect(formatNumber(-1234)).toBe('-1,234');
    });
  });

  describe('decimal handling', () => {
    it('should floor decimal numbers', () => {
      expect(formatNumber(123.9)).toBe('123');
      expect(formatNumber(99.1)).toBe('99');
    });

    it('should not round up', () => {
      expect(formatNumber(99.9999)).toBe('99');
    });
  });
});

describe('shortenAddress', () => {
  describe('ethereum address formatting', () => {
    it('should shorten standard ethereum addresses', () => {
      const address = '0x7fd8Ab8D3Ca8C0E0b6efC0E1230Eb2F5eb54e4d0';
      expect(shortenAddress(address)).toBe('0x7fd8...e4d0');
    });

    it('should keep first 6 and last 4 characters', () => {
      const address = '0x1234567890123456789012345678901234567890';
      expect(shortenAddress(address)).toBe('0x1234...7890');
    });

    it('should handle lowercase addresses', () => {
      const address = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd';
      expect(shortenAddress(address)).toBe('0xabcd...abcd');
    });
  });

  describe('edge cases', () => {
    it('should return empty string for null', () => {
      expect(shortenAddress(null)).toBe('');
    });

    it('should return empty string for undefined', () => {
      expect(shortenAddress(undefined)).toBe('');
    });

    it('should return original string if too short', () => {
      expect(shortenAddress('0x123')).toBe('0x123');
      expect(shortenAddress('short')).toBe('short');
    });

    it('should shorten 10 character strings', () => {
      // Strings with length >= 10 get shortened (first 6 + last 4)
      expect(shortenAddress('0x12345678')).toBe('0x1234...5678');
    });

    it('should shorten 11+ character strings', () => {
      // First 6 chars + last 4 chars
      expect(shortenAddress('0x123456789a')).toBe('0x1234...789a');
    });
  });

  describe('non-address strings', () => {
    it('should handle any string format', () => {
      const longString = 'this-is-a-very-long-identifier-string';
      expect(shortenAddress(longString)).toBe('this-i...ring');
    });

    it('should return empty string for empty string', () => {
      expect(shortenAddress('')).toBe('');
    });
  });
});
