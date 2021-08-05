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

  const userArray = [
    {username: 'jay',
     password: 'jay101',
     email: 'jayfresh@nice.com',
     wallet: 1000.00
    },
    {
      username: 'Mai',
     password: 'mai123',
     email: 'mailovely@unicornsandrainbows.com',
     wallet: 1700.00
    },
    {
      username: 'arnold',
     password: '12345',
     email: 'arnold@theterminator.com',
     admin: false
    },
    {
      username: 'jessica',
     password: 'jbunnies123',
     email: 'jbunniesh@ilovebunnies.com',
     admin: true,
    },
    {
      username: 'joe',
     password: 'joeomnipotent',
     email: 'joe@airhockey.com',
     admin: true
    },
    {
      username: 'sarah',
     password: 'coolbreeze',
     email: 'sarah@bananas.com',
     admin: true,
    },
    {
      username: 'sarahjean',
     password: 'SJ2nice',
     email: 'sj@thefreshest.com',
     admin: true,
     },
    {
      username: 'isaac',
     password: 'abc123',
     email: 'isaac123@k12primary.com',
     wallet: 1000.00
    },
    {
      username: 'zeke',
     password: 'hardOne23',
     email: 'zekeWrestles@wrestlingOne.com',
     wallet: 1200.00
    },
    {
      username: 'melissa',
     password: 'ilikecats',
     email: 'catluvah@feloniusfelines.com',
     wallet: 2000.00
    },
    {
      username: 'mandy',
     password: 'xyz890',
     email: 'mandy@ceoCalls.com',
     wallet: 3000.00
    },
    {
      username: 'angie',
     password: 'angie10M',
     email: 'angie@millionairegames.com',
     admin: true,
     },
    {
      username: 'adrian',
     password: 'adriancodes',
     email: 'adrian@advancedcoder.com',
     admin: true,
    },
    {
      username: 'chuck',
     password: 'chuckMusic3000',
     email: 'chuck@chuck3000.com',
     admin: true,
    },
    {
      username: 'jimmy',
     password: 'jimmy345',
     email: 'james@workstoomuch.com',
     wallet: 750.00
    },
    {
      username: 'offset',
     password: 'offsetMigos',
     email: 'offset@migos.com',
     wallet: 10000.00
    },
    {
     username: 'scottie',
     password: 'pippen33',
     email: 'spippen@startingover.com',
     wallet: 5000.00
    },
    {
     username: 'mj',
     password: 'notmj23',
     email: 'mj@dontcallmeair.com',
     wallet: 1000.00
    },
    {
     username: 'lebron',
     password: 'callmeKing23',
     email: 'lbj@kingjames.com',
     wallet: 5000.00
    },
    {
     username: 'cindy',
     password: 'cindy123',
     email: 'cindy@example.co',
     wallet: 900.00
    },
    {
      username: 'amy',
     password: 'amy123',
     email: 'amy@example.com',
     wallet: 800.00
    },
    {
      username: 'randy',
     password: 'randy123',
     email: 'randy@example.com',
     },
    {
     username: 'andrea',
     password: 'andrea123',
     email: 'andrea@example.com',

    },
    {
     username: 'simone',
     password: 'simonelovehugs',
     email: 'simone@ineedhugs.com',
    },
    {
     username: 'aja',
     password: 'ajathegoat',
     email: 'awilson@goatstatus.com',
     },
    {
      username: 'kdurant',
     password: 'kdtrey3',
     email: 'kdurant@ballers.com',
    },
    {
     username: 'oliver',
     password: 'iamthregreenarrow',
     email: 'oqueen@queenindustries.com',
     wallet: 100000.00
    },
    {
     username: 'chris',
     password: 'hitemwiththeflex',
     email: 'cp3@ballers.com',
    },
    {
     username: 'diana',
     password: 'dprince1984 ',
     email: 'dprince@jlamerica.com',
     wallet: 10000.00
    },
    {
     username: 'isiah',
     password: 'imetthecriteria',
     email: 'ithomas@nodreamteam.com',
     wallet: 1500.00
    },
    {
      username: 'bud',
     password: 'airbud123',
     email: 'airbud@noplushes.com',
     },
    {
      username: 'cody',
      password: '123',
      email: 'cody@example.com'
    },
    {
      username: 'murphy',
      password: '123',
      email: 'murphy@example.com',
    }
  ]

  // Creating Users

  const users = await Promise.all(userArray.map(user => User.create(user)));
  /* const users = await Promise.all([
    User.create({
      username: 'cody',
      password: '123',
      email: 'cody@example.com',
    }),=
    User.create({
      username: 'murphy',
      password: '123',
      email: 'murphy@example.com',
    }),
  ]); */

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
