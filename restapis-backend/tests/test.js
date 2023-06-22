const chai = require('chai');
const chaiHttp = require('chai-http');
const { MongoMemoryServer } = require('mongodb-memory-server-core');
const mongoose = require('mongoose');
const sinon = require('sinon');

const app = require('../routes/user'); // Assuming this is the file containing the route handler
const User = require('../models/entries'); // Assuming you have a User model defined

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /all-user-entries', () => {
  let mongoServer;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    // Clear the User collection before each test
    await User.deleteMany();
  });

  it('should return all users', () => {
    const user1 = new User({ name: 'John Doe', email: 'john@example.com' });
    const user2 = new User({ name: 'Jane Smith', email: 'jane@example.com' });
  
    const findStub = sinon.stub(User, 'find');
    findStub.returns(Promise.resolve([user1, user2]));
  
    return chai.request(app)
      .get('/all-user-entries')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Users are found');
        expect(res.body.posts).to.be.an('array');
        expect(res.body.posts.length).to.equal(2);
  
        findStub.restore();
      });
  });
  
  
});
