import request from 'supertest';
import app from './../src/app';
import './fixtures/test-setup';

test('Should create a new manufacturer', async () => {
  const response = await request(app).post('/manufacturer').send({
    name: 'Elves',
  });
  expect(response.statusCode).toBe(201);
});
