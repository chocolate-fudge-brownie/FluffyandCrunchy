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
        await tallOrder.update(bear);
        await tallOrder.update(nobear);
        // => ensuring that update can accurately update the total and update tallOrder at the same time <=
        expect(tallOrder.total).to.equal(60);
        const products = await tallOrder.getProducts();
        expect(products.map(product => product.name)).to.deep.equal(['blanched almond bear', 'almond bear']);
    })
    it('A product can belong to many order', async () => {
        const smallOrder = await Order.create();
        const alsoSmallOrder = await Order.create();
        const dragon = await Product.create({ name: 'elvarg', price: 83 });
        await smallOrder.update(dragon);
        await alsoSmallOrder.update(dragon);
        const allOrdersOfDragons = await dragon.getOrders();
        expect(allOrdersOfDragons.map(order => order.total)).to.deep.equal([83, 83]);

    })
});

// Examine our database index file, Order.belongsTo(User, { as: 'Customer' });
// We have changed the reference to User as Customer.. this changes the name of our magic methods.