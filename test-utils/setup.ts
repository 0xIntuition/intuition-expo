/**
 * Test setup file
 * Runs before each test suite
 */

// Suppress console warnings during tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock global functions if needed
global.fetch = jest.fn();

// Setup any global test utilities or mocks here
