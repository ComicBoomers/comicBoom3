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
      'https://firebasestorage.googleapis.com/v0/b/comicboom-71166.appspot.com/o/Stickers%2F1.png?alt=media&token=42c7a26c-0a63-4073-a462-b3adb438df30'
  },
  {
    location:
      'https://firebasestorage.googleapis.com/v0/b/comicboom-71166.appspot.com/o/Stickers%2F2.png?alt=media&token=174afcb2-5f3f-4f5a-a299-e893111d637f'
  },
  {
    location:
      'https://firebasestorage.googleapis.com/v0/b/comic-server.appspot.com/o/sticker%2F3.png?alt=media&token=1f5c6349-8890-41ca-b49f-dfa2dcc7e815'
  },
  {
    location:
      'https://firebasestorage.googleapis.com/v0/b/comicboom-71166.appspot.com/o/Stickers%2F4.png?alt=media&token=8fc2017a-42df-49d1-b8af-832fa3c4e762'
  },
  {
    location:
      'https://firebasestorage.googleapis.com/v0/b/comicboom-71166.appspot.com/o/Stickers%2F5.png?alt=media&token=5d874381-d9d4-4c28-b07b-01bcc4d625e2'
  },
  {
    location:
      'https://firebasestorage.googleapis.com/v0/b/comicboom-71166.appspot.com/o/Stickers%2F6.png?alt=media&token=8dbfdf53-1c53-40d2-b770-61a10714743e'
  },
  {
    location:
      'https://firebasestorage.googleapis.com/v0/b/comicboom-71166.appspot.com/o/Stickers%2F7.png?alt=media&token=61b35172-1db3-4574-87d4-e18b3c1fa191'
  },
  {
    location:
      'https://firebasestorage.googleapis.com/v0/b/comicboom-71166.appspot.com/o/Stickers%2F8.png?alt=media&token=8bb64c8a-5c10-43e4-9199-85684b3ff06c'
  },
  {
    location:
      'https://firebasestorage.googleapis.com/v0/b/comicboom-71166.appspot.com/o/Stickers%2F9.png?alt=media&token=1b47890d-e970-423e-86ff-e6606b9c2adc'
  },
  {
    location:
      'https://firebasestorage.googleapis.com/v0/b/comicboom-71166.appspot.com/o/Stickers%2F10.png?alt=media&token=11d8b146-c355-49f9-91f0-7fea5e97948c'
  },
  {
    location:
      'https://firebasestorage.googleapis.com/v0/b/comicboom-71166.appspot.com/o/Stickers%2F11.png?alt=media&token=64874969-6780-40a6-9d69-18e2a7975c15'
  },
  {
    location:
      'https://firebasestorage.googleapis.com/v0/b/comicboom-71166.appspot.com/o/Stickers%2F12.png?alt=media&token=7c2b3bcc-1deb-4e53-8b7e-8023c39d4d0a'
  },
  {
    location:
      'https://firebasestorage.googleapis.com/v0/b/comicboom-71166.appspot.com/o/Stickers%2F13.png?alt=media&token=e6335eff-af32-46d8-9a7a-9d72ee116ebc'
  }
]

const seed = () =>
  Promise.all(users.map(elem => User.create(elem))).then(() =>
    Promise.all(stickers.map(elem => Sticker.create(elem)))
  )

const main = () => {
  console.log('Syncing the db...')
  db
    .sync({force: true})
    .then(() => {
      console.log(green('Seeding the database...'))
      return seed()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
    })
    .then(() => {
      db.close()
      console.log(green('Seeded Successfully!!'))
      return null
    })

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${stickers.length} stickers`)
}
main()
module.exports = seed
