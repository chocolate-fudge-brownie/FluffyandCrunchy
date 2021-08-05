const { expect } = require('chai');
const { db, models: { User, Product, Order } } = require('../index');

describe('Testing Model Associations', () => {
    before(() => db.sync({force: true}));
    afterEach(() => db.sync({force:true}));

    describe('Sequelize Model Manipulation | Magic Methods', () => {
        it('A user can have many orders', async () => {
            const theAnt = await User.create({ username: 'antonio', email: 'antoniod@gmail.com' });
            const tallOrder = await Order.create({ total: 400.00 });
            const shortOrder = await Order.create({ total: 32.00 });
            await theAnt.addOrder(tallOrder);
            await theAnt.addOrder(shortOrder);
            const orders = await theAnt.getOrders();
            expect(orders.map(order => order.total)).to.deep.equal([400, 32]);
        })
    })
    it('An order can be added to some user', async () => {
        const theGee = await User.create({ username: 'angie', email: 'angie@gmail.com'});
        const mediumOrder = await Order.create({ total: 216.00 });
        await mediumOrder.setCustomer(theGee);
        const customer = await mediumOrder.getCustomer();
        const { username, email, admin } = customer;
        expect({ username, email, admin }).to.deep.equal({
            username: 'angie',
            email: 'angie@gmail.com',
            admin: false
        })
    })
    it('An order can have many products', async () => {
        const tallOrder = await Order.create();
        const bear = await Product.create({ name: 'blanched almond bear', price: 54 });
        const nobear = await Product.create({ name: 'almond bear', price: 6, description: 'it\'s not a blanched almond colored bear' });
        await tallOrder.priceUpdate(bear);
        /* const info = await tallOrder.priceUpdate(nobear);
           console.log(info.order, '\n', info.price); */
        // => ensuring that update can accurately update the total and update tallOrder at the same time <=
        expect(tallOrder.total).to.equal(60);
        const products = await tallOrder.getProducts();
        expect(products.map(product => product.name)).to.deep.equal(['blanched almond bear', 'almond bear']);
    })
    it('A product can belong to many order', async () => {
        const smallOrder = await Order.create();
        const alsoSmallOrder = await Order.create();
        const dragon = await Product.create({ name: 'elvarg', price: 83 });
        await smallOrder.priceUpdate(dragon);
        await alsoSmallOrder.priceUpdate(dragon);
        const allOrdersOfDragons = await dragon.getOrders();
        expect(allOrdersOfDragons.map(order => order.total)).to.deep.equal([83, 83]);

    })
    it.only('Creating a user associates that user with an empty cart (unpaid order)', async () => {
        // creating a user creates an empty cart with 0 total and isPaid equal to false
        const user = await User.create({ username: 'Chukwudi', password: 'password', admin: false });
        const cart = await User.peekCart(user);
        expect(cart.total).to.equal(0); 
        // We can add products to the order (in my case I'm going to create the products first)
        const fluffs = await Product.create({ name: 'fluffs', price: 450 });
        const crunchies = await Product.create({ name: 'crunchies', price: 200 });
        console.log(user.__proto__);
        console.log(user, cart);


    })
});

// Examine our database index file, Order.belongsTo(User, { as: 'Customer' });
// We have changed the reference to User as Customer.. this changes the name of our magic methods.
