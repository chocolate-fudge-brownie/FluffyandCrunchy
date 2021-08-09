const faker = require('faker');
const axios = require('axios');
const { models: { Product } } = require('../server/db');
class PokemonSeed {
  constructor(queryLimit = 0) {
    this.QUERY_LIMIT = queryLimit < 0 ? 0 : queryLimit;
  }
  get queryLimit() {
    return this.QUERY_LIMIT;
  }
  // returns n pokemon objects with name and url
  async getNames() {
    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${this.queryLimit}`);
      return data.results;
    } catch (err) {
      console.log(err);
    }
  }
  // returns an description given an id
  async getDescription(id) {
    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
      const englishEntry = data.flavor_text_entries.filter((description) => description.language.name === "en")[0].flavor_text;
      return englishEntry;
    } catch (err) {
      console.log(err);
    }
  }
  // returns artwork for specific pokemon
  getImageUrl(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
  // returns a random price
  randomPrice() {
    return Math.floor(faker.commerce.price());
  }
  // factory function to generate pokemon objects
  factoryPokemon(name, price, imageUrl, description) {
    return {
      name,
      price,
      imageUrl,
      description,
    };
  }
  async generatePokemonProducts(products) {
    const pokemonNames = await this.getNames();
    for (let i = 1; i <= this.queryLimit; i++) {
      const name = pokemonNames[i - 1].name;
      const imageUrl = this.getImageUrl(i);
      const description = await this.getDescription(i);
      const pokemonProduct = this.factoryPokemon(
        name,
        this.randomPrice(),
        imageUrl,
        description
      );
      products.push(await Promise.resolve(Product.create(pokemonProduct)));
    }
  }
}
module.exports = PokemonSeed;


/* SHORT DOCUMENTATION
PARAMETERS: query limit, if none or neg num is provided, no querying will occur on generatePokemonProducts method..
RETURN: pokemon seed object with various methods and a getter method. 

The idea is that we can create an object with the new keyword, given a particular query limit, we can then can .generatePokemonProducts to do
all of our heavy lifting for us.

It should be as simple as..
Example:
  const pokeSeed = new PokemonSeed(50);
  await pokeSeed.generatePokemonProducts(products);
*/

// Using pokeSeed module to generate pokemon products in the database. 
// NOTE: .generatePokemonProducts method takes in the products array and MUTATES it. impure JS method.
// NOTE: The more pokemon objects we create, the longer the seed will take. 50 -> ~5-7 seconds, 100 -> ~20-30 seconds
// generatePokemonProducts method WILL mutate the products object, it is not a pure JS method.
