function Price(id, nickname, currency, unit_amount, lookup_key) {
    this.id = id;
    this.nickname = nickname;
    this.currency = currency;
    this.unit_amount = unit_amount;
    this.lookup_key = lookup_key;
  }
  
  module.exports = Price;