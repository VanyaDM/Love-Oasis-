const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

describe('MongoDB Connection', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should connect to MongoDB', () => {
    expect(mongoose.connection.readyState).toEqual(1); 
  });
});
