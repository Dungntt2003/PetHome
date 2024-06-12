const getTablePrice = "SELECT * FROM priceExchange";

const insertNew =
  "INSERT INTO priceExchange (weight, factor) VALUES ($1, $2) RETURNING id";

const updatePrice =
  "UPDATE priceExchange SET weight = $1, factor =$2 WHERE id = $3";

module.exports = { getTablePrice, insertNew, updatePrice };
