/**
 * Function that mocks a property on the 'window' object with a specified value.
 * Sets up the mock before each test suite and restores
 * the original property after each test suite.
 * @example
 * mockWindowProperty('innerWidth', 500);
 * @param {string} property The name of the property to mock on 'window' object.
 * @param {*} value The value to set on mocked property.
 */
export const mockWindowProperty = (property, value) => {
  const originalProperty = window[property];
  delete window[property];
  beforeAll(() => {
    if (originalProperty !== undefined) {
      Object.defineProperty(window, property, {
        configurable: true,
        writable: true,
        value,
      });
    } else {
      window[property] = value;
    }
  });
  afterAll(() => {
    if (originalProperty !== undefined) {
      window[property] = originalProperty;
    } else {
      delete window[property];
    }
  });
};