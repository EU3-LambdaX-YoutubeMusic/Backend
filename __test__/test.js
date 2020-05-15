
const mongoose = require('mongoose');
const supertest = require("supertest");

const UserModel = require('../resources/users/users.models');
const { testdburl } = require('../config/dbConfig');
const app = require("../app"); // Link to server file

const request = supertest(app);

const userData = {
  firstName: 'Tola',
  lastName: 'Akere',
  email: 'tolyay@gmail.com',
  password: '123456',
};

describe('user model test', () => {
  // connect to the MongoDB Memory Server by using mongoose.connect
  beforeAll(async () => {
    await mongoose.connect(testdburl, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
        process.exit(1);
      }
    });
  });

  it('create & save user successfully', async (done) => {
    const res = await request.post("/api/v1/users/register").send(userData);
    const validUser = await UserModel.findOne({ email: "tolyay@gmail.com" });
    const savedUser = await validUser.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.firstName).toBe(userData.firstName);
    expect(savedUser.lastName).toBe(userData.lastName);
    expect(savedUser.email).toBe(userData.email);
    expect(res.body.user.email).toBe(savedUser.email);
    expect(res.body.user.id).toBe(savedUser._id.toString());
    done();
  });
 

});


async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const wayfarer_test of collections) {
    const collection = mongoose.connection.collections[wayfarer_test];
    await collection.deleteMany();
  }
}
afterAll(async () => {
  await removeAllCollections();
});
