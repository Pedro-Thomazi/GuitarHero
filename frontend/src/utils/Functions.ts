export function formatePrice(price: number): string {
  let formatPrice
  formatPrice = price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  return formatPrice
}

export function formatParcela(price: number): string {
  let priceParceladoFormat
  let parcela = price / 12
  priceParceladoFormat = parcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return priceParceladoFormat
}