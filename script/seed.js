'use strict'

const db = require('../server/db')
const { User, Page, Sticker } = require('../server/db/models')
const { green, red } = require('chalk')



//UserType?? Do we need this?
const users = [{
  firstName: 'Cody',
  lastName: 'Puppy',
  email: 'cody@email.com',
  password: '123',
}, {
  firstName: 'Murphy',
  lastName: 'Dear',
  email: 'murphy@email.com',
  password: '123',
}, {
  firstName: 'Lexi',
  lastName: 'Admin',
  email: 'lexi@email.com',
  password: '123',
}, {
  firstName: 'Lee',
  lastName: 'Kirincich',
  email: 'le@email.com',
  password: '123',
}, {
  firstName: 'Erica',
  lastName: 'Luong',
  email: 'erica@email.com',
  password: '123',
}, {
  firstName: 'Mags',
  lastName: 'Walker',
  email: 'mags@email.com',
  password: '123',
  UserType: 'standard'
}, {
  firstName: 'Adrienne',
  lastName: 'Johnson',
  email: 'adrienne@email.com',
  password: '123',
}
]

const pages = [{
  location: 'https://firebasestorage.googleapis.com/v0/b/comicboom-71166.appspot.com/o/Dummy%20Images%2F14203273_10102140056247297_3117888548750496357_n.jpg?alt=media&token=d6fcabce-0f6b-4ce4-8ec2-8b28e40e03e2',
  userId: 1,
}, {
  location: 'https://firebasestorage.googleapis.com/v0/b/comicboom-71166.appspot.com/o/Dummy%20Images%2Fangel-art-artistic-187069.jpg?alt=media&token=47a0ce08-f113-4724-bf68-8665fd74a390',
  userId: 2,
}, {
  location: 'https://firebasestorage.googleapis.com/v0/b/comicboom-71166.appspot.com/o/Dummy%20Images%2Fanimal-animal-photography-cat-96938.jpg?alt=media&token=81a2dd17-6b33-4ea2-976c-24ecb435cd21',
  userId: 1,
}, {
  location: 'https://firebasestorage.googleapis.com/v0/b/comicboom-71166.appspot.com/o/Dummy%20Images%2Fart-beautiful-cartoonize-278663.jpg?alt=media&token=1984c155-f956-4d31-b7af-68907244efe6',
  userId: 3,
}]

const stickers = [{
  location: 'https://firebasestorage.googleapis.com/v0/b/comicboom-71166.appspot.com/o/Stickers%2Fbaaam.jpg?alt=media&token=917d02f2-881f-4212-9b59-1d998e1e03a4'
}, {
  location: 'https://firebasestorage.googleapis.com/v0/b/comicboom-71166.appspot.com/o/Stickers%2Fbamm.jpg?alt=media&token=51d12418-7e36-495d-81f1-c7651a4b1080'
}, {
  location: 'https://firebasestorage.googleapis.com/v0/b/comicboom-71166.appspot.com/o/Stickers%2Fboom.jpg?alt=media&token=76fd924b-5a18-44b7-895f-7e5ce20ca4ac'
}, {
  location: 'https://firebasestorage.googleapis.com/v0/b/comicboom-71166.appspot.com/o/Stickers%2Fcool.jpg?alt=media&token=6612a1ca-c0d6-4557-9096-87577803dd00'
}]

const seed = () =>
  Promise.all(users.map(elem => User.create(elem))
  )
    .then(() =>
      Promise.all(pages.map(elem => Page.create(elem))
      )
    )
        .then(() =>
        Promise.all(stickers.map(elem => Sticker.create(elem))
        )
  )

const main = () => {
  console.log('Syncing the db...');
  db.sync({ force: true })
    .then(() => {
      console.log(green('Seeding the database...'));
      return seed();
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err);
    })
    .then(() => {
      db.close();
      console.log(green('Seeded Successfully!!'));
      return null;
    })

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${pages.length} pages`)
  console.log(`seeded ${stickers.length} stickers`)
}
main();
// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
