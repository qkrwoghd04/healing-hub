export function FormatPrice(price: string) {
  return '₩' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
