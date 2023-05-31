// File: videoStream.test.js

const request = require('supertest');
const app = require('./index'); // Import your Express app or server


describe('Video Streaming', () => {
    it('should return the video file', (done) => {
      request(app)
        .get('/video')
        .expect('Content-Type', 'video/mp4')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
