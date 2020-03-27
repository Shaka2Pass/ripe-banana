const { getReviewer } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('reviewer routes', () => {
  it('creates an reviewer', async() => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Roger Siskal',
        company: 'Washington Movie Host'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Roger Siskal',
          company: 'Washington Movie Host',
          id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets an reviewer by id', async() => {
    const reviewer = await getReviewer();
    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual(reviewer);
      });
  });

  it('updates a reviewer by id', async() => {
    const reviewer = await getReviewer();

    return request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .send({ name: 'Ebert Ernie', company: 'Oregon Movie Central' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Ebert Ernie',
          company: 'Oregon Movie Central',
          id: expect.any(String),
          __v:0
        });
      });
  });

});

