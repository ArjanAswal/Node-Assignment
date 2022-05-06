import request from 'supertest';
import app from './../src/app';
import './fixtures/test-setup';

test('An equipment can be created', async () => {
  let response = await request(app).post('/manufacturer').send({
    name: 'Elves',
  });
  let id = response.body.data.manufacturer[0].id;

  response = await request(app).post('/equipment').send({
    model: 'The Anduril Sword',
    serialNumber: '000001A',
    manufacturer_id: id,
  });
  expect(response.statusCode).toBe(201);
});

test('An equipment can be updated', async () => {
  let response = await request(app).post('/manufacturer').send({
    name: 'Elves',
  });
  let id = response.body.data.manufacturer[0].id;

  response = await request(app).post('/equipment').send({
    model: 'The Anduril Sword',
    serialNumber: '000001A',
    manufacturer_id: id,
  });

  id = response.body.data.equipment[0].id;

  response = await request(app)
    .patch('/equipment/' + id)
    .send({
      model: 'Sacred Ring',
      serialNumber: '000001A',
    });

  expect(response.statusCode).toBe(200);
  expect(response.body.data.equipment[0].model).toBe('Sacred Ring');
});

test('An equipment can be deleted', async () => {
  let response = await request(app).post('/manufacturer').send({
    name: 'Elves',
  });
  let id = response.body.data.manufacturer[0].id;

  response = await request(app).post('/equipment').send({
    model: 'The Anduril Sword',
    serialNumber: '000001A',
    manufacturer_id: id,
  });

  id = response.body.data.equipment[0].id;

  response = await request(app)
    .delete('/equipment/' + id)
    .send();

  expect(response.statusCode).toBe(204);
});

test('The manufacturer of an equipment can be read', async () => {
  let response = await request(app).post('/manufacturer').send({
    name: 'Elves',
  });
  let id = response.body.data.manufacturer[0].id;

  response = await request(app).post('/equipment').send({
    model: 'The Anduril Sword',
    serialNumber: '000001A',
    manufacturer_id: id,
  });

  id = response.body.data.equipment[0].id;

  response = await request(app)
    .get('/equipment/' + id + '/manufacturer/')
    .send();

  expect(response.statusCode).toBe(200);
});
