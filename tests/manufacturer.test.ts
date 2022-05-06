import request from 'supertest';
import app from './../src/app';
import './fixtures/test-setup';

test('A manufacturer can be created', async () => {
  const response = await request(app).post('/manufacturer').send({
    name: 'Elves',
  });
  expect(response.statusCode).toBe(201);
});

test('A manufacturer can be updated', async () => {
  let response = await request(app).post('/manufacturer').send({
    name: 'Elves',
  });
  let id = response.body.data.manufacturer[0].id;

  response = await request(app)
    .patch('/manufacturer/' + id)
    .send({
      name: 'Dwarves',
    });

  expect(response.statusCode).toBe(200);
  expect(response.body.data.manufacturer[0].name).toBe('Dwarves');
});

test('A manufacturer can be deleted', async () => {
  let response = await request(app).post('/manufacturer').send({
    name: 'Elves',
  });
  let id = response.body.data.manufacturer[0].id;

  response = await request(app)
    .delete('/manufacturer/' + id)
    .send();

  expect(response.statusCode).toBe(204);
});

test('If a manufacturer is deleted using the REST endpoint, any related equipment will be also automatically deleted.', async () => {
  let response = await request(app).post('/manufacturer').send({
    name: 'Elves',
  });
  let id = response.body.data.manufacturer[0].id;

  response = await request(app).post('/equipment').send({
    model: 'The Anduril Sword',
    serialNumber: '000001A',
    manufacturer_id: id,
  });

  response = await request(app)
    .delete('/manufacturer/' + id)
    .send();

  expect(response.statusCode).toBe(204);

  response = await request(app)
    .get('/manufacturer/' + id + '/equipment/')
    .send();

  expect(response.statusCode).toBe(200);

  expect(response.body.data.equipments.length).toBe(0);
});

test('The equipments of a manufacturer can be read', async () => {
  let response = await request(app).post('/manufacturer').send({
    name: 'Elves',
  });
  let id = response.body.data.manufacturer[0].id;

  response = await request(app)
    .get('/manufacturer/' + id + '/equipment/')
    .send();

  expect(response.statusCode).toBe(200);
});
