export const cartMapper = (cards) => {
  return games
    ? games.map((game) => ({
        id: game.id,
        img: `${getImageUrl(game.cover?.url)}`,
        title: game.name,
        price: formatPrice(game.price)
      }))
    : []
}
