/**
 * Function that converts a number to it`s USD currency format
 * @param {number} number input number
 * @returns number in USD currency format with two decimal places
 */

export function formattedPrice(number) {
  const priceInDollars = (parseFloat(number) / 100).toFixed(2);

  return new Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(priceInDollars);
}