'use strict';

const {
  db,
  models: { User, Product },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: 'cody',
      password: '123',
      email: 'cody@example.com',
    }),
    User.create({
      username: 'murphy',
      password: '123',
      email: 'murphy@example.com',
    }),
  ]);

  // Creating Products
  const products = await Promise.all([
    Product.create({
      name: 'teddy bear',
      price: 20,
      imageUrl:
        'https://cdn.shopify.com/s/files/1/2012/3849/files/wwtfobxfl9vlqhios0zm_2048x_206929a3-95cc-485b-9304-3d3bf6b80530_2048x.jpg?v=1613932160',
      description: 'a cute teddy bear : )',
    }),
    Product.create({
      name: 'bunny',
      price: 50,
      imageUrl:
        'https://b3h2.scene7.com/is/image/BedBathandBeyond/187882365212950p?$690$&wid=690&hei=690',
      description: 'a cute bunny : )',
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
