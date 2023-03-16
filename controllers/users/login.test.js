const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
require('dotenv').config();
const { DB_HOST } = process.env;


describe('Users controller login test', () => {
    let server;
    beforeAll(() => {
        mongoose.connect(DB_HOST)
            .then(() => {
                server = app.listen(4000, () => { })
            })
            .catch(() => {
                process.exit(1);
            });
    });

    afterAll(() => {
        mongoose.disconnect();
        server.close();
    });


    it('should return response status code 200', async() => {
        const { status } = await request(app)
            .post('/api/users/login')
            .set('Content-type', 'application/json')
            .send({ email: 'business@gmail.com', password: '12345678' });
        
        expect(status).toEqual(200);

    });

    it('should return token in response', async() => {
        const { body: { data: { token } } } = await request(app)
            .post('/api/users/login')
            .set('Content-type', 'application/json')
            .send({ email: 'business@gmail.com', password: '12345678' });
        
        expect(typeof token).toBe('string');
    });

    it('should return Object user with 2 fields: email, subscription with type string', async() => {
        const { body: { data: { user } } } = await request(app)
            .post('/api/users/login')
            .set('Content-type', 'application/json')
            .send({ email: 'business@gmail.com', password: '12345678' });
        
        expect(typeof user).toBe('object');
        expect(typeof user.email).toBe('string');
        expect(typeof user.subscription).toBe('string');
    });

    it('login without email, should response error 400 with message: email is required', async() => {
        const { status, body: { message } } = await request(app)
            .post('/api/users/login')
            .set('Content-type', 'application/json')
            .send({ password: '12345678' });
        
        expect(status).toBe(400);
        expect(message).toBe('"email" is required');
    });

      it('login without password, should response error 400 with message: password is required', async() => {
        const { status, body: { message } } = await request(app)
            .post('/api/users/login')
            .set('Content-type', 'application/json')
            .send({ email: 'business@gmail.com' });
        
        expect(status).toBe(400);
        expect(message).toBe('"password" is required');
      });
    
    it('login with incorrect password, should response error 400 with message: password length must be at least 6 characters long', async() => {
        const { status, body: { message } } = await request(app)
            .post('/api/users/login')
            .set('Content-type', 'application/json')
            .send({ email: 'business@gmail.com', password: '12345'  });
        
        expect(status).toBe(400);
        expect(message).toBe('"password" length must be at least 6 characters long');
    });

    it('login with incorrect email, should response error 400 with message: "email" must be a valid email', async() => {
        const { status, body: { message } } = await request(app)
            .post('/api/users/login')
            .set('Content-type', 'application/json')
            .send({ email: 'businessgmail.com', password: '12345678'  });
        
        expect(status).toBe(400);
        expect(message).toBe('"email" must be a valid email');
    });

    it('login without email and password, should response error 400 with message: \"password\" is required', async() => {
        const { status, body: { message } } = await request(app)
            .post('/api/users/login')
            .set('Content-type', 'application/json')
            .send();
        
        expect(status).toBe(400);
        expect(message).toBe('\"password\" is required');
    });

    it('login with invalid password, should response error 401 with message: Email or password is wrong', async() => {
        const { status, body: { message } } = await request(app)
            .post('/api/users/login')
            .set('Content-type', 'application/json')
            .send({ email: 'business@gmail.com', password: '123457890'  });
        
        expect(status).toBe(401);
        expect(message).toBe('Email or password is wrong');
    });

    it('login with invalid email, should response error 401 with message: Email or password is wrong', async() => {
        const { status, body: { message } } = await request(app)
            .post('/api/users/login')
            .set('Content-type', 'application/json')
            .send({ email: 'business777@gmail.com', password: '12345678'  });
        
        expect(status).toBe(401);
        expect(message).toBe('Email or password is wrong');
    });
})