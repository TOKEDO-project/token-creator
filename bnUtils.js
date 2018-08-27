const BigNumber = require('bignumber.js')

const minus = (a, b) => {
  const aBN = new BigNumber(a + '')
  const bBN = new BigNumber(b + '')
  return aBN.minus(bBN).toFixed()
}

const plus = (a, b) => {
  const aBN = new BigNumber(a + '')
  const bBN = new BigNumber(b + '')
  return aBN.plus(bBN).dp(18).toFixed()
}

const times = (a, b) => {
  const aBN = new BigNumber(a + '')
  const bBN = new BigNumber(b + '')
  return aBN.times(bBN).dp(18).toFixed()
}

const div = (a, b) => {
  const aBN = new BigNumber(a + '')
  const bBN = new BigNumber(b + '')
  return aBN.div(bBN).dp(18).toFixed()
}

const eq = (a, b) => {
  const aBN = new BigNumber(a + '')
  const bBN = new BigNumber(b + '')
  return aBN.eq(bBN)
}

const lt = (a, b) => {
  const aBN = new BigNumber(a + '')
  const bBN = new BigNumber(b + '')
  return aBN.lt(bBN)
}

const gt = (a, b) => {
  const aBN = new BigNumber(a + '')
  const bBN = new BigNumber(b + '')
  return aBN.gt(bBN)
}

const lte = (a, b) => {
  const aBN = new BigNumber(a + '')
  const bBN = new BigNumber(b + '')
  return aBN.lte(bBN)
}

const gte = (a, b) => {
  const aBN = new BigNumber(a + '')
  const bBN = new BigNumber(b + '')
  return aBN.gte(bBN)
}

const isNaN = (a) => {
  const aBN = new BigNumber(a + '')
  return aBN.isNaN()
}

const dp = (a, n) => {
  const aBN = new BigNumber(a + '')
  return aBN.dp(n).toFixed()
}

const negated = (a) => {
  const aBN = new BigNumber(a + '')
  return aBN.negated().toFixed()
}

module.exports = {
  minus,
  plus,
  times,
  div,
  eq,
  lt,
  gt,
  lte,
  gte,
  isNaN,
  dp,
  negated
}
