import { CartTotals } from "../../js/components/cartTotals";

describe("CartTotals", () => {
  let cartTotals, subTotal, tax, total;

  beforeEach(() => {
    // Arrange
    subTotal = 10;
    tax = 1;
    total = 11;

    // Act
    cartTotals = new CartTotals({ subTotal, tax, total });
    document.body.appendChild(cartTotals);
  });

  test("should create \'CartTotals\' element with correct properties", () => {
    // Assert
    expect(cartTotals.subTotal).toBe(subTotal);
    expect(cartTotals.tax).toBe(tax);
    expect(cartTotals.total).toBe(total);
  });

  test('should render the correct HTML', () => {
    // Assert
    // Use of snapshot testing to avoid specifying the expected UI structure. See 'https://jestjs.io/docs/snapshot-testing'
    expect(cartTotals.innerHTML).toMatchSnapshot();
  })

  test('should update the cart totals when the update function is called', () => {
    // Arrange
    const newSubTotal = 20;
    const newTax = 2;
    const newTotal = 22;

    // Act
    cartTotals.subTotal = newSubTotal;
    cartTotals.tax = newTax;
    cartTotals.total = newTotal;
    cartTotals.update();

    // Assert
    expect(cartTotals.subTotal).toBe(newSubTotal);
    expect(cartTotals.tax).toBe(newTax);
    expect(cartTotals.total).toBe(newTotal);
  })
});