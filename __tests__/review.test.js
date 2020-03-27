const { getReview, getReviewer, getReviews, getReviewers } = require('../db/data-helpers');
const mongoose = require('mongoose');

const request = require('supertest');
const app = require('../lib/app');

describe('review routes', () => {
  it('creates a review', async() => {
    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 4,
        reviewerId: new mongoose.Types.ObjectId(), 
        review: 'This film was an abomination!',
        filmId: new mongoose.Types.ObjectId()
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 4,
          reviewerId: expect.any(String), 
          review: 'This film was an abomination!',
          filmId: expect.any(String),
          __v: 0
        });
      });
  });

});

