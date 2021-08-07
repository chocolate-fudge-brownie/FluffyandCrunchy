'use strict';

const {
  db,
  models: { User, Product },
} = require('../server/db');
const Order = require('../server/db/models/Order');
const faker = require('faker');
const axios = require('axios');
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  const userArray = [
    { username: 'jay', password: 'jay101', email: 'jayfresh@nice.com' },
    {
      username: 'Mai',
      password: 'mai123',
      email: 'mailovely@unicornsandrainbows.com',
    },
    {
      username: 'arnold',
      password: '12345',
      email: 'arnold@theterminator.com',
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
      admin: true,
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
    },
    {
      username: 'zeke',
      password: 'hardOne23',
      email: 'zekeWrestles@wrestlingOne.com',
    },
    {
      username: 'melissa',
      password: 'ilikecats',
      email: 'catluvah@feloniusfelines.com',
    },
    {
      username: 'mandy',
      password: 'xyz890',
      email: 'mandy@ceoCalls.com',
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
    },
    {
      username: 'offset',
      password: 'offsetMigos',
      email: 'offset@migos.com',
    },
    {
      username: 'scottie',
      password: 'pippen33',
      email: 'spippen@startingover.com',
    },
    {
      username: 'mj',
      password: 'notmj23',
      email: 'mj@dontcallmeair.com',
    },
    {
      username: 'lebron',
      password: 'callmeKing23',
      email: 'lbj@kingjames.com',
    },
    {
      username: 'cindy',
      password: 'cindy123',
      email: 'cindy@example.co',
    },
    {
      username: 'amy',
      password: 'amy123',
      email: 'amy@example.com',
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
    },
    {
      username: 'isiah',
      password: 'imetthecriteria',
      email: 'ithomas@nodreamteam.com',
    },
    {
      username: 'bud',
      password: 'airbud123',
      email: 'airbud@noplushes.com',
    },
    {
      username: 'cody',
      password: '123',
      email: 'cody@example.com',
    },
    {
      username: 'murphy',
      password: '123',
      email: 'murphy@example.com',
    },
  ];

  
  // Creating Users

  const users = await Promise.all(userArray.map((user) => User.create(user)));
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
    Product.create({
      name: 'crocodile',
      price: 70,
      imageUrl:
        'https://cdn3.volusion.com/9nxdj.fchy5/v/vspfiles/photos/AR-16839-2.jpg?v-cache=1625220540',
      description: 'a small crocodile',
    }),
    Product.create({
      name: 'elephant',
      price: 10,
      imageUrl:
        'https://prodimage.images-bn.com/pimages/0810407030117_p0_v1_s550x406.jpg',
      description: 'a cute elephant',
    }),
    Product.create({
      name: 'shark',
      price: 65,
      imageUrl:
        'https://m.media-amazon.com/images/I/71BfXCUrhgL._AC_SS450_.jpg',
      description: 'a shark with sharp teeth',
    }),
    Product.create({
      name: 'koala',
      price: 80,
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0251/3719/products/60ba366a346b75f363ddec2bdb81d338_grande.jpg?v=1611788303',
      description: 'an adorabale koala',
    })
  ]);

  // helper functions

  // SETS QUERY LIMIT
  const QUERY_LIMIT = 50;

  // returns 50 pokemon objects with name and url
  const getNames = async () => {
    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${QUERY_LIMIT}`);
      return data.results;      
    } catch (err) {
      console.log(err)
    }
  }

  // returns an description given an id
  const getDescription = async (id) => {
    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
      const englishEntry = data.flavor_text_entries.filter((description) => description.language.name === 'en')[0].flavor_text;
      return englishEntry;      
    } catch (err) {
      console.log(err);
    }
  }

  // returns imageUrl
  const getImageUrl = (id) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  // returns a random price
  const randomPrice = () => {
    return Math.floor(faker.commerce.price());
  }

  // factory function to generate pokemon objects
  const factoryPokemon = (name, price, imageUrl, description) => {
    return {
      name,
      price,
      imageUrl,
      description
    }
  }
  
  // main pokemon object generator function
  async function generatePokemonObjects() {
    const pokemonNames = await getNames();
    for(let i = 1; i <= QUERY_LIMIT; i++) {
      const name = pokemonNames[i - 1].name;
      const imageUrl = getImageUrl(i); 
      const description = await getDescription(i);
      const pokemonProduct = factoryPokemon(name, randomPrice(), imageUrl, description);
      products.push(await Promise.resolve(Product.create(pokemonProduct)));
    }   
  }
  
  // actually seeds and appends pokemon objects to the database
  await generatePokemonObjects();

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
  /* Try to add order for users */
  const localCart = { 1: 1, 2: 2, 3: 3 };
  const orders = await Order.findAll({
    where: {
      customerId: 2,
      isPaid: false,
    },
  });

  const dbCart = orders[0];
  await Promise.all(
    Object.keys(localCart).map(async (productId) => {
      const product = await Product.findByPk(productId);
      await dbCart.addProduct(product, {
        through: {
          quantity: localCart[productId],
          price: product.price,
        },
      });
    })
  );

  const cartProducts = await dbCart.getProducts();
  console.log(cartProducts);

  console.log(`seeded associations`);

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
