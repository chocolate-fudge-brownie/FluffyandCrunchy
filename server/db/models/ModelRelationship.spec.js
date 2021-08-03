const { expect } = require('chai');
const { db, models: { User, Product, Order } } = require('../index');

describe('Testing Model Associations', () => {
    before(() => db.sync({force: true}));
    afterEach(() => db.sync({force:true}));

    describe('Sequelize Model Manipulation | Magic Methods', () => {
        it('A user can have many orders', async () => {
            const theAnt = await User.create({ username: 'antonio', email: 'antoniod@gmail.com' });
            const tallOrder = await Order.create({ total: 400.21 });
            const shortOrder = await Order.create({ total: 32.02 });
            await theAnt.addOrder(tallOrder);
            await theAnt.addOrder(shortOrder);
            const orders = await theAnt.getOrders();
            expect(orders.map(order => order.total)).to.deep.equal(['400.21', '32.02']);
            // // const theGee = User.create({ username: 'angie', email: 'angie@gmail.com'});
            // // const theDrian = User.create({ username: 'adrian', email: 'daydreaming@gmail.com'});
            // const bear = await Product.create({ name: 'blanched almond bear', price: 54.00 });
            // const nobear = await Product.create({ name: 'almond bear', price: 6.00, description: 'it\'s not a blanched almond bear' });
            // const antOrder = await Order.addProduct(bear, nobear);
            // // const tallOrder = await Order.create({ total: 400.21 });

            // // const shortOrder = await Order.create({total: 32.02});
            // await theAnt.addOrders(antOrder);
            // const total = await theAnt.getOrders().map((product) => product.price);
            // expect(total).to.deep.equal(60.00);
        })
    })
    it('An order can be added to some user', async () => {
        const theGee = await User.create({ username: 'angie', email: 'angie@gmail.com'});
        const mediumOrder = await Order.create({ total: 216.12 });
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
        const bear = await Product.create({ name: 'blanched almond bear', price: 54.00 });
        const nobear = await Product.create({ name: 'almond bear', price: 6.43, description: 'it\'s not a blanched almond bear' });
        // await tallOrder.update(bear);
        await tallOrder.addProducts(bear);
        await tallOrder.updateTotal(bear);
        await tallOrder.addProducts(nobear);
        await tallOrder.updateTotal(nobear);
        expect(tallOrder.total).to.equal(60.43);
    })
    // it('A product can belong to many order', async () => {

    // })
});

// Examine our database index file, Order.belongsTo(User, { as: 'Customer' });
// We have changed the reference to User as Customer.. this changes the name of our magic methods.