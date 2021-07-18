const bcrypt = require('bcryptjs')

const users = [
  {
    name: 'Sharity Baldoni',
    email: 'sbaldoni0@de.vu',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Malina Clewes',
    email: 'mclewes1@buzzfeed.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Grazia Goreway',
    email: 'ggoreway2@ocn.ne.jp',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Lonny Drugan',
    email: 'ldrugan3@reuters.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Lelia Fanthom',
    email: 'lfanthom4@independent.co.uk',
    password: bcrypt.hashSync('123456', 10),
  },
]

module.exports = users
