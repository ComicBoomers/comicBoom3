'use strict'

const db = require('../server/db')
const {User, Sticker} = require('../server/db/models')
const {green, red} = require('chalk')

const users = [
  {
    email: 'cody@email.com',
    password: '123'
  },
  {
    email: 'pug@email.com',
    password: '123'
  }
]

const stickers = [
  {
    location:
      'https://firebasestorage.googleapis.com/v0/b/comic-server.appspot.com/o/sticker%2F1.png?alt=media&token=6e1054ac-190a-439c-986f-e5499d9fb540'
  },
  {
    location:
      'https://firebasestorage.googleapis.com/v0/b/comic-server.appspot.com/o/sticker%2F2.png?alt=media&token=faf3ce00-237d-43fc-a528-a57a226699f4'
  },
  {
    location:
      'https://firebasestorage.googleapis.com/v0/b/comic-server.appspot.com/o/sticker%2F3.png?alt=media&token=1f5c6349-8890-41ca-b49f-dfa2dcc7e815'
  },
  {
    location:
      'https://firebasestorage.googleapis.com/v0/b/comic-server.appspot.com/o/sticker%2F4.png?alt=media&token=81e0c836-1fa0-4a8d-8d69-726f367649b8'
  }
]

// const seed = () =>
//   Promise.all(users.map(elem => User.create(elem))).then(() =>
//     Promise.all(stickers.map(elem => Sticker.create(elem)))
//   )

// const main = () => {
//   console.log('Syncing the db...')
//   db
//     .sync({force: true})
//     .then(() => {
//       console.log(green('Seeding the database...'))
//       return seed()
//     })
//     .catch(err => {
//       console.error(red('Oh noes! Something went wrong!'))
//       console.error(err)
//     })
//     .then(() => {
//       db.close()
//       console.log(green('Seeded Successfully!!'))
//       return null
//     })

//   console.log(`seeded ${users.length} users`)
//   console.log(`seeded ${stickers.length} stickers`)
// }

async function seed() {
  await db.sync({force: true})
  await Promise.all(users.map(elem => User.create(elem)))
  await Promise.all(stickers.map(elem => Sticker.create(elem)))
  console.log('seeded successfully')
}

async function main() {
  console.log('seeding')
  try {
    await seed()
  } catch (err) {
    console.log('Err:', err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  main()
}

module.exports = seed
