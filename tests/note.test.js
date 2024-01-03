// tests/note.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); 

chai.use(chaiHttp);
const expect = chai.expect;

describe('Authentication API', () => {
  it('should create a new user account', (done) => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send({ email: 'testuser@test.com', password: 'testpassword' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should log in to an existing user account and receive an access token', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: 'testuser@test.com', password: 'testpassword' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });
});

describe('Notes API', () => {
    let authToken; // Store the authentication token
  
    // Before running the note tests, authenticate a user and store the token
    before((done) => {
      chai
        .request(app)
        .post('/api/auth/login')
        .send({ username: 'testuser', password: 'testpassword' })
        .end((err, res) => {
          authToken = res.body.token;
          done();
        });
    });
  
    it('should get a list of notes for the authenticated user', (done) => {
      chai
        .request(app)
        .get('/api/notes')
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  
    it('should create a new note for the authenticated user', (done) => {
      chai
        .request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Test Note', content: 'This is a test note.' })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message').equals('Note created successfully');
          done();
        });
    });
  
    it('should get a note by ID for the authenticated user', (done) => {
      // Assume you have a noteId for an existing note
      const noteId = 'your-existing-note-id';
  
      chai
        .request(app)
        .get(`/api/notes/${noteId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('title').equals('Test Note');
          done();
        });
    });
  
    it('should update an existing note for the authenticated user', (done) => {
      // Assume you have a noteId for an existing note
      const noteId = 'your-existing-note-id';
  
      chai
        .request(app)
        .put(`/api/notes/${noteId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Updated Note', content: 'This note has been updated.' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equals('Note updated successfully');
          done();
        });
    });
  
    it('should delete an existing note for the authenticated user', (done) => {
      // Assume you have a noteId for an existing note
      const noteId = 'your-existing-note-id';
  
      chai
        .request(app)
        .delete(`/api/notes/${noteId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equals('Note deleted successfully');
          done();
        });
    });
  
    it('should share a note with another user for the authenticated user', (done) => {
      // Assume you have a noteId and anotherUserId for sharing
      const noteId = 'your-existing-note-id';
      const anotherUserId = 'another-user-id';
  
      chai
        .request(app)
        .post(`/api/notes/${noteId}/share`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ userId: anotherUserId, canEdit: true })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equals('Note shared successfully');
          done();
        });
    });
  
    it('should search for notes based on keywords for the authenticated user', (done) => {
      const searchQuery = 'test';
  
      chai
        .request(app)
        .get(`/api/search?q=${searchQuery}`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  
    // Add more test cases for other endpoints
  });
  
describe('Users API', () => {
let authToken; // Store the authentication token

// Before running the user tests, authenticate a user and store the token
before((done) => {
    chai
    .request(app)
    .post('/api/auth/login')
    .send({ username: 'testuser', password: 'testpassword' })
    .end((err, res) => {
        authToken = res.body.token;
        done();
    });
});

it('should get a list of all users for the authenticated user', (done) => {
    chai
    .request(app)
    .get('/api/users')
    .set('Authorization', `Bearer ${authToken}`)
    .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
    });
});

});
