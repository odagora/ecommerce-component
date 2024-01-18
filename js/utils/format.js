/**
 * Function that converts a number to it`s USD currency format
 * @param {number} number input number
 * @returns string in USD currency format with two decimal places
 */

export function numberToPrice(number) {
  const priceInDollars = (parseFloat(number) / 100).toFixed(2);

  return new Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(priceInDollars);
}

/**
 * Function that converts a USD currency price element with two decimal places to it`s number format
 * @param {string} price input price
 * @returns number
 */
export function priceToNumber(price) {
  return parseInt(price.innerHTML.split('$')[1] * 100)
}