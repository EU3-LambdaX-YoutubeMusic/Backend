
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
  },5000);


  it('create user without required field should fail', async () => {
    let err;
    try {
      const userWithoutRequiredField = await request.post("/api/v1/users/register")
        .send({ firstName: 'TekLoon' });
      err = userWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err.body).toBeDefined();
    expect(err.body.status).toBe(422);
    expect(err.body.error).toBe('"lastName" is required');
  },5000);

  it('should throw an error if user already exists', async () => {
    const res = await request.post("/api/v1/users/register")
      .send({ firstName: 'Tola',
        lastName: 'Akere',
        email: 'tolyay@gmail.com',
        password: '123456' });
    expect(res.body).toBeDefined();
    expect(res.body.status).toBe(409);
    expect(res.body.message).toBe('user already exist');
  },5000);

    it('should login an existing user', async () => {
    const res = await request.post("/api/v1/users/login")
      .send({ email: "tolyay@gmail.com", password: '123456' });
    const validUser = await UserModel.findOne({ email: "tolyay@gmail.com" });
    const savedUser = await validUser.save()

    expect(res.body.user.id).toBeDefined();
    expect(res.body.user.id).toBe(savedUser._id.toString());
    expect(res.body.user.email).toBe(savedUser.email);
    expect(savedUser.firstName).toBeDefined();
    expect(savedUser.lastName).toBeDefined();
  },5000);

});


async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const test of collections) {
    const collection = mongoose.connection.collections[test];
    await collection.deleteMany();
  }
}
afterAll(async () => {
  await removeAllCollections();
},5000);
