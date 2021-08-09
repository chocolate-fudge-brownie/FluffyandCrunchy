"use strict";

const {
  db,
  models: { User, Product },
} = require("../server/db");
const Order = require("../server/db/models/Order");
const PokemonSeed = require("./pokeSeed");
const OrderSeed = require("./orderSeed");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  const userArray = [
    { username: "jay", password: "jay101", email: "jayfresh@nice.com" },
    {
      username: "Mai",
      password: "mai123",
      email: "mailovely@unicornsandrainbows.com",
    },
    {
      username: "arnold",
      password: "12345",
      email: "arnold@theterminator.com",
    },
    {
      username: "jessica",
      password: "jbunnies123",
      email: "jbunniesh@ilovebunnies.com",
      admin: true,
    },
    {
      username: "joe",
      password: "joeomnipotent",
      email: "joe@airhockey.com",
      admin: true,
    },
    {
      username: "sarah",
      password: "coolbreeze",
      email: "sarah@bananas.com",
      admin: true,
    },
    {
      username: "sarahjean",
      password: "SJ2nice",
      email: "sj@thefreshest.com",
      admin: true,
    },
    {
      username: "isaac",
      password: "abc123",
      email: "isaac123@k12primary.com",
    },
    {
      username: "zeke",
      password: "hardOne23",
      email: "zekeWrestles@wrestlingOne.com",
    },
    {
      username: "melissa",
      password: "ilikecats",
      email: "catluvah@feloniusfelines.com",
    },
    {
      username: "mandy",
      password: "xyz890",
      email: "mandy@ceoCalls.com",
    },
    {
      username: "angie",
      password: "angie10M",
      email: "angie@millionairegames.com",
      admin: true,
    },
    {
      username: "adrian",
      password: "adriancodes",
      email: "adrian@advancedcoder.com",
      admin: true,
    },
    {
      username: "chuck",
      password: "chuckMusic3000",
      email: "chuck@chuck3000.com",
      admin: true,
    },
    {
      username: "jimmy",
      password: "jimmy345",
      email: "james@workstoomuch.com",
    },
    {
      username: "offset",
      password: "offsetMigos",
      email: "offset@migos.com",
    },
    {
      username: "scottie",
      password: "pippen33",
      email: "spippen@startingover.com",
    },
    {
      username: "mj",
      password: "notmj23",
      email: "mj@dontcallmeair.com",
    },
    {
      username: "lebron",
      password: "callmeKing23",
      email: "lbj@kingjames.com",
    },
    {
      username: "cindy",
      password: "cindy123",
      email: "cindy@example.co",
    },
    {
      username: "amy",
      password: "amy123",
      email: "amy@example.com",
    },
    {
      username: "randy",
      password: "randy123",
      email: "randy@example.com",
    },
    {
      username: "andrea",
      password: "andrea123",
      email: "andrea@example.com",
    },
    {
      username: "simone",
      password: "simonelovehugs",
      email: "simone@ineedhugs.com",
    },
    {
      username: "aja",
      password: "ajathegoat",
      email: "awilson@goatstatus.com",
    },
    {
      username: "kdurant",
      password: "kdtrey3",
      email: "kdurant@ballers.com",
    },
    {
      username: "oliver",
      password: "iamthegreenarrow",
      email: "oqueen@queenindustries.com",
    },
    {
      username: "chris",
      password: "hitemwiththeflex",
      email: "cp3@ballers.com",
    },
    {
      username: "diana",
      password: "dprince1984 ",
      email: "dprince@jlamerica.com",
    },
    {
      username: "isiah",
      password: "imetthecriteria",
      email: "ithomas@nodreamteam.com",
    },
    {
      username: "bud",
      password: "airbud123",
      email: "airbud@noplushes.com",
    },
    {
      username: "cody",
      password: "123",
      email: "cody@example.com",
    },
    {
      username: "murphy",
      password: "123",
      email: "murphy@example.com",
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
  const prodArray = [
    {
      name: "Red Bird",
      price: 10,
      imageUrl:
        "https://static.wikia.nocookie.net/angrybirds/images/2/2e/Red_Bird.jpg",
      description: "The classic Red Angry Bird",
    },
    {
      name: "Blue Bird",
      price: 20,
      imageUrl:
        "https://static.wikia.nocookie.net/angrybirds/images/2/2e/Red_Bird.jpg",
      description:
        "Made of quality material, rich cotton blend, and a nice blue hue",
    },
    {
      name: "Hal Bird",
      price: 70,
      imageUrl:
        "https://static.wikia.nocookie.net/angrybirds/images/6/68/New_Hal.jpeg",
      description:
        "Enhanced with imported cotton and the finest material, this Hal Bird is a collector's item.",
    },
    {
      name: "Big Brother Bird",
      price: 30,
      imageUrl:
        "https://static.wikia.nocookie.net/angrybirds/images/6/65/Big_Brother_Bird.jpg",
      description: '9" inch plush Big Borther Angry Bird',
    },
    {
      name: "Yellow Bird",
      price: 30,
      imageUrl:
        "https://static.wikia.nocookie.net/angrybirds/images/8/83/Yellow_Bird.jpg",
      description:
        "Watch you loved ones eyes swell with joy when you present them with this illustrious yellow angry bird.",
    },
    {
      name: "Black Bird",
      price: 50,
      imageUrl:
        "https://static.wikia.nocookie.net/angrybirds/images/3/31/Black_Bird.jpg",
      description:
        "This cute, adorable angry bird is all the rage. Get yours while supplies last",
    },
    {
      name: "White Bird",
      price: 40,
      imageUrl:
        "https://static.wikia.nocookie.net/angrybirds/images/f/fe/White_Bird.jpg",
      description:
        "One of the rarest birds in our Angry birds collection. Bring this bird home and make him a part of our collection.",
    },
    {
      name: "Green Bird",
      price: 60,
      imageUrl:
        "https://static.wikia.nocookie.net/angrybirds/images/5/53/New_Green_Bird.png",
      description:
        "Special made, only for St. Patricks Day, Very few made world wide.",
    },
    {
      name: "Orange Bird",
      price: 30,
      imageUrl:
        "https://static.wikia.nocookie.net/angrybirds/images/7/70/113209.jpg",
      description: "a cute, adorable Angry Bird",
    },
    {
      name: "Angry Orange Bird",
      price: 10,
      imageUrl:
        "https://static.wikia.nocookie.net/angrybirds/images/6/6a/113211.jpg",
      description: "An expressive take on the orange Angry Bird.",
    },
    {
      name: "Mighty Eagle",
      price: 25,
      imageUrl:
        "https://static.wikia.nocookie.net/angrybirds/images/a/a7/Mighty_Eagle.jpg",
      description: "an Angry Bird version of the American Bald Eagle.",
    },
    {
      name: "King Pig",
      price: 33,
      imageUrl:
        "https://static.wikia.nocookie.net/angrybirds/images/d/db/King_Pig.jpg",
      description:
        "The kingdom of Pigs is being invaded and only one pig stands in the way of complete annihilation. The King Pig is here. Get yours today.",
    },
    {
      name: "Stelia",
      price: 22,
      imageUrl:
        "https://static.wikia.nocookie.net/angrybirds/images/1/10/%24T2eC16dHJGQE9noMbUZ-BQkcf%283F%2Cw~~60_3.JPG",
      description:
        "a soft illustrious comfortable plush toy from our Angry birds collection",
    },
    {
      name: "Foreman Pig",
      price: 44,
      imageUrl:
        "https://static.wikia.nocookie.net/angrybirds/images/3/36/Moustache_Pig.jpg",
      description:
        "One of our Construction Pigs from our Angry Birds Collection. Often called Moustache Pig.",
    },
    {
      name: "Female Pig",
      price: 30,
      imageUrl:
        "https://static.wikia.nocookie.net/angrybirds/images/2/25/IMG_3036.JPG",
      description:
        "A Valentine's Day special. Brighten the day of that special loved one with this wonderful gift.",
    },
    {
      name: "Helmet Pig",
      price: 55,
      imageUrl:
        "https://static.wikia.nocookie.net/angrybirds/images/b/b4/Helmet_Pig.jpg",
      description: "A construction worker pig from our Angry Birds Collection.",
    },
    {
      name: "Minion Pig",
      price: 40,
      imageUrl:
        "https://static.wikia.nocookie.net/angrybirds/images/b/bf/Plush_greenpig.jpg",
      description: "a wonderful rare pig from our Angry Birds Collection",
    },
    {
      name: "Postman Pig",
      price: 20,
      imageUrl:
        "https://static.wikia.nocookie.net/angrybirds/images/5/5c/Angry-birds-pigs-traveler-2_98248_zoom.jpg",
      description:
        "Watch the smile of your mail carrier with this Postman Pig from our Angry Birds Collection",
    },
    {
      name: "Chef Pig",
      price: 15,
      imageUrl:
        "https://static.wikia.nocookie.net/angrybirds/images/3/39/PIGCHEF.jpg",
      description: "We cook up the savings with this rare Chef Pig",
    },
    {
      name: "Construction Pig",
      price: 25,
      imageUrl:
        "https://static.wikia.nocookie.net/angrybirds/images/3/34/PIGWORK.jpg",
      description:
        "The most recognized of our Angry Birds Construction Collection. This pig will bring years of joy to any Angry Birds Collector",
    },
    {
      name: "Cowboy Hat Pig",
      price: 30,
      imageUrl:
        "https://static.wikia.nocookie.net/angrybirds/images/5/5e/PIGBOY.jpg",
      description:
        "Angry Birds Western Collection, a must have for burgeoning plush toy collectors",
    },
    {
      name: "Kirby",
      price: 40,
      imageUrl:
        "https://imgix.ranker.com/user_node_img/50091/1001807346/original/sanei-kirby-adventure-all-star-collection-kp01-5-5_-kirby-stuffed-plush-photo-u1?auto=format&fit=crop&fm=pjpg&w=650&q=60&dpr=2",
      description: "From the land of Nintendo comes this delightful plush toy",
    },
    {
      name: "Super Mario",
      price: 70,
      imageUrl:
        "https://imgix.ranker.com/user_node_img/50091/1001807366/original/super-mario-plush-8_-mario-soft-stuffed-plush-toy-_japanese-import_-photo-u1?auto=format&fit=crop&fm=pjpg&w=650&q=60&dpr=2",
      description:
        "Relive the glory years of Nintendo with Nintendo's flagship super hero, Super Mario",
    },
    {
      name: "Cheep Cheep",
      price: 100,
      imageUrl:
        "https://imgix.ranker.com/user_node_img/50091/1001807364/original/-little-buddy-toys-nintendo-official-super-mario-cheep-cheep-plush-6_-photo-u1?auto=format&fit=crop&fm=pjpg&w=650&q=60&dpr=2",
      description:
        "Vintage, exclusive Cheep Cheep. One of a kind, in mint condition.",
    },
    {
      name: "Mimikyu",
      price: 30,
      imageUrl:
        "https://imgix.ranker.com/user_node_img/50091/1001807352/original/pok_mon-mimikyu-plush-stuffed-animal-toy-8_-photo-u1?auto=format&fit=crop&fm=pjpg&w=650&q=60&dpr=2",
      description:
        "Rare, imported plush toy.  High quality material. Handcrafted.",
    },
    {
      name: "Minecraft Happy Explorer Golden Helmet Zombie",
      price: 20,
      imageUrl:
        "https://imgix.ranker.com/user_node_img/50091/1001807358/original/jinx-minecraft-happy-explorer-gold-helmet-zombie-plush-stuffed-toy-_multi-color-7_-tall_-photo-u1?auto=format&fit=crop&fm=pjpg&w=650&q=60&dpr=2",
      description: "Special plush toy for the Minecraft lover in your family",
    },
    {
      name: "Donkey Kong",
      price: 80,
      imageUrl:
        "https://imgix.ranker.com/user_node_img/50091/1001807372/original/donkey-kong-classic-11-5_-plush-toy-nintendo-photo-u1?auto=format&fit=crop&fm=pjpg&w=650&q=60&dpr=2",
      description:
        "A cute, adorable depiction of Nintendo other flagship video game series.",
    },
    {
      name: "Luigi",
      price: 90,
      imageUrl:
        "https://imgix.ranker.com/user_node_img/50091/1001807371/original/fairzoo-super-mario-plush-luiqi-mario-soft-stuffed-plush-toy-green-20_-photo-u1?auto=format&fit=crop&fm=pjpg&w=650&q=60&dpr=2",
      description:
        "What is Mario without Luigi. This plush toy is a fan favorite. Get yours today.",
    },
    {
      name: "Minecraft Steve",
      price: 75,
      imageUrl:
        "https://imgix.ranker.com/user_node_img/50091/1001807360/original/jinx-minecraft-steve-plush-stuffed-toy-_multi-color-12_-tall_-photo-u1?auto=format&fit=crop&fm=pjpg&w=650&q=60&dpr=2",
      description:
        "One of the few Minecraft plush toys  in our collection but also one of the most highly sough after",
    },
    {
      name: "MegaMan",
      price: 50,
      imageUrl:
        "https://imgix.ranker.com/user_node_img/50091/1001807345/original/great-eastern-mega-man-10-7_-mega-man-plush-photo-u1?auto=format&fit=crop&fm=pjpg&w=650&q=60&dpr=2",
      description: "highly sought after MegaMan plush toy.",
    },
    {
      name: "Square Enix 2B",
      price: 25,
      imageUrl:
        "https://imgix.ranker.com/user_node_img/50091/1001807351/original/square-enix-nier-automata-2b-_yorha-no-2-type-b_-mini-plush-figure-photo-u1?auto=format&fit=crop&fm=pjpg&w=650&q=60&dpr=2",
      description: "Soft plush toy from the video game Square Enix",
    },
    {
      name: "Chococat",
      price: 30,
      imageUrl:
        "https://i.shgcdn.com/809872f8-59fe-45e6-9f9b-826995bda869/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      description: "A cute adorable plush toy every child should have.",
    },
    {
      name: "Pochacco",
      price: 25,
      imageUrl:
        "https://i.shgcdn.com/7b0bcdc4-a836-44a8-8800-e2c83303ddbb/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      description: "a cute and adorable plush toy",
    },
    {
      name: "Team USA Hello Kitty Gold Medalist",
      price: 100,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0416/8083/0620/products/275964-Zoom.1_800x.jpg?v=1626908403",
      description:
        "Celebrate the US accomplishements in the  2021 Olympic Games in Tokyo with this rare Hello Kitty Olympic edition plush toy",
    },
    {
      name: "Hello Kitty Pastel",
      price: 50,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0416/8083/0620/products/02100-Zoom.a_800x.jpg?v=1606845634",
      description:
        "One of our most popular selections, this Hello Kitty plush will bring years of pleasure and delight to both the young and the young at heart.",
    },
    {
      name: "Hello Kitty Supercute Nerd",
      price: 70,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0416/8083/0620/products/02086-Zoom.a_800x.jpg?v=1606845627",
      description:
        "Absolutely cute and rare.  A member of our Hello Kitty collection.",
    },
    {
      name: "Dear Daniel",
      price: 30,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0416/8083/0620/products/71464-Zoom.1_800x.jpg?v=1624403138",
      description:
        "A wonderful plush toy that is handcrafted and made from the finest materials",
    },
    {
      name: "Badtz-maru Ulzzang K-pop",
      price: 25,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0416/8083/0620/products/85773-Zoom.a_800x.jpg?v=1606846529",
      description:
        "Another K-Pop plush toy.  We house some of the rarest plush toys around.",
    },
    {
      name: "Lala Ulzzang",
      price: 80,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0416/8083/0620/products/85762-Zoom.a_800x.jpg?v=1606846503",
      description: "One of the newest members of our K-Pop collection.",
    },
    {
      name: "Hello Kitty & Mimmy",
      price: 70,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0416/8083/0620/products/005142-Zoom.2_800x.jpg?v=1611810023",
      description: "A rarity and a must have for any Hello Kitty collectors.",
    },
    {
      name: "Kiki Ulzzang",
      price: 75,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0416/8083/0620/products/85761-Zoom.a_800x.jpg?v=1606846496",
      description: "One of our K-Pop selections. Very unique and very rare.",
    },
    {
      name: "Hello Kitty Sports",
      price: 35,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0416/8083/0620/products/610321-202003.Zoom.1_800x.jpg?v=1602655486",
      description:
        "Hello Kitty is going Varsity.  This Hello Kitty makes a great addition to any plush toy collection.",
    },
    {
      name: "Aggretsuko Calm Ball",
      price: 120,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0416/8083/0620/products/25355-Zoom.a_800x.jpg?v=1606845929",
      description:
        "One of the rarest plush toys in our collection. Use this plush as a stress reliever, It is extremely soft and has a pillowy texture.",
    },
    {
      name: "Lala Tasty Treats",
      price: 50,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0416/8083/0620/products/59833-Zoom.a_800x.jpg?v=1606846124",
      description:
        "Rare plush toy that is made with the highest quality material",
    },
    {
      name: "Big Bird",
      price: 15,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1291/5963/products/416382_2_1024x1024.jpg?v=1560798997",
      description:
        "Relive your Sesame Street days with Big Bird, the big yellow bird with the bright personality",
    },
    {
      name: "Elmo",
      price: 30,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1291/5963/products/B00GSUKXJE.01-A2PJJEAW2GV0DY.MAIN._SS1000_SCRMZZZZZZZ_1024x1024.jpeg?v=1466143375",
      description:
        "In the early 2000s Elmo took the world by storm. Get your piece of Elmomania ",
    },
    {
      name: "Minnie Mouse",
      price: 80,
      imageUrl:
        "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/1234041283327?fmt=webp&qlt=90&wid=1304&hei=1304",
      description:
        "Disney has done it again with this rare exclusive Minnie Mouse plush toy. She is the toy that you never knew you needed.",
    },
    {
      name: "Mickey Mouse",
      price: 90,
      imageUrl:
        "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/1234041283326?fmt=webp&qlt=90&wid=1304&hei=1304",
      description:
        "From the land of Disney comes this adorable plus depiction of Mickey Mouse",
    },
    {
      name: "Winnie the Pooh",
      price: 75,
      imageUrl:
        "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/1234041283325?fmt=webp&qlt=90&wid=1304&hei=1304",
      description:
        "Christopher  Robin's best friend. Now he can be yours as well.",
    },
    {
      name: "Pluto",
      price: 60,
      imageUrl:
        "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/1231000442139?fmt=webp&qlt=90&wid=1304&hei=1304",
      description:
        "Our plush variation of the Disney favorite will have your heart fluttering with joy and excitement",
    },
    {
      name: "Sisu Dragon",
      price: 70,
      imageUrl:
        "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/1231105803110?fmt=webp&qlt=90&wid=1304&hei=1304",
      description:
        "Our newest member from  the 2021 Disney movie Raya and the last dragon",
    },
  ];

  const products1 = await Promise.all([
    Product.create({
      name: "teddy bear",
      price: 20,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/2012/3849/files/wwtfobxfl9vlqhios0zm_2048x_206929a3-95cc-485b-9304-3d3bf6b80530_2048x.jpg?v=1613932160",
      description: "a cute teddy bear : )",
    }),
    Product.create({
      name: "bunny",
      price: 50,
      imageUrl:
        "https://b3h2.scene7.com/is/image/BedBathandBeyond/187882365212950p?$690$&wid=690&hei=690",
      description: "a cute bunny : )",
    }),
    Product.create({
      name: "crocodile",
      price: 70,
      imageUrl:
        "https://cdn3.volusion.com/9nxdj.fchy5/v/vspfiles/photos/AR-16839-2.jpg?v-cache=1625220540",
      description: "a small crocodile",
    }),
    Product.create({
      name: "elephant",
      price: 10,
      imageUrl:
        "https://prodimage.images-bn.com/pimages/0810407030117_p0_v1_s550x406.jpg",
      description: "a cute elephant",
    }),
    Product.create({
      name: "shark",
      price: 65,
      imageUrl:
        "https://m.media-amazon.com/images/I/71BfXCUrhgL._AC_SS450_.jpg",
      description: "a shark with sharp teeth",
    }),
    Product.create({
      name: "koala",
      price: 80,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0251/3719/products/60ba366a346b75f363ddec2bdb81d338_grande.jpg?v=1611788303",
      description: "an adorabale koala",
    }),
  ]);

  const products2 = await Promise.all(
    prodArray.map((product) => Product.create(product))
  );

  // Makes sure products.length is accurate
  const products = products1.concat(products2);

  // --------------------------------------- pokeSeed --------------------------------------- //
  const pokeSeed = new PokemonSeed(1);
  await pokeSeed.generatePokemonProducts(products);
  // --------------------------------------- pokeSeed --------------------------------------- //

  // --------------------------------------- orderSeed --------------------------------------- //
  const orderSeed = new OrderSeed(users, products);
  await orderSeed.seedOrdersToUsers();
  await orderSeed.seedProductsInCartForUsers();
  // --------------------------------------- orderSeed --------------------------------------- //

  // Creating Orders
  // const orderArray = [
  //   {
  //     total: 500
  //   },
  //   {
  //     total: 200
  //   },
  //   {
  //     total: 300,
  //     isPaid: true
  //   },
  //   {
  //     total: 1000
  //   },
  //   {
  //     total: 150,
  //     isPaid: true
  //   }

  // ]
  // const [product1, product2] = products
  // const orders = await Promise.all(orderArray.map(order => Order.create(order)));
  // const [order1, order2, order3, order4, order5] = orders;

  // await order1.addProduct(product1)
  // await order2.addProduct(product2)
  // await order3.setProducts([product1, product2]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
  // console.log(`seeded ${orders.length} orders`);
  // console.log(`seeded successfully`);
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
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
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
