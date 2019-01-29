const mongoose = require('mongoose');
const Blog = require('../models/blog');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('Blogs', () => {

    let blogs = [];
    
    //Get All Blogs
    describe('/Get Blogs', () => {
        it('it should Get all the Blogs', (done) => {
            chai.request(app)
                .get('/api/blogs/')
                .end((err, res) => {
                    if(err) {
                        console.log('Error while executing test');
                        done();
                    } else {
                        console.log(res.body);
                        blogs = res.body.blogs;
                        res.should.have.status(200);
                        // res.body.should.be.a('array');
                        done();
                    }
                });
        })
    })


    // //Right now it runs before the connection is made to mongoDB, wait and then execute these
    // // find out how to do this
    // function deleteBlogs() {
    //     console.log(typeof blogs);
    //     console.log(blogs);
    //     //Delete a blog
    //     blogs.forEach(blog => {
    //         describe('/Delete Blog', () => {
    //             it('it should delete a blog post', (done) => {
    //                 chai.request(app)
    //                     .delete('/api/blogs/' + blog._id)
    //                     .send({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJuZWVyYWpuZWdpQGdtYWlsLmNvbSIsImlhdCI6MTU0NTc5NDg4MCwiZXhwIjoxNTQ1ODgxMjgwfQ.bVS7SWy__Akl9d08s2d-8WHkz54IqONDp2uFTwKfgGI'})
    //                     .end((err, res) => {
    //                         if(err) {
    //                             console.log('Error while deleting blogs')
    //                             done();
    //                         } else {
    //                             res.should.have.status(200)
    //                             done();
    //                         }
    //                     })
    //             })
    //         })
    //     });
    // }

    // //Post a Blog
    // describe('/Post Blog', () => {
    //     it('it should Post a Correct Blog', (done) => {
    //         const blog = {
    //             author_id : '5c225637d0b8d1227cc5a9eb',
	//             author_name : 'Neeraj Negi',
	//             content : 'First Test Blog',
    //             title : 'Would you like to care for some Chai or Mocha?',
    //             token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJuZWVyYWpuZWdpQGdtYWlsLmNvbSIsImlhdCI6MTU0NTc5NDg4MCwiZXhwIjoxNTQ1ODgxMjgwfQ.bVS7SWy__Akl9d08s2d-8WHkz54IqONDp2uFTwKfgGI'
    //         }

    //         chai.request(app)
    //             .post('/api/blogs')
    //             .send(blog)
    //             .end((err, res) => {
    //                 if(err) {
    //                     console.log('Error while executing test');
    //                     done();
    //                 } else {
    //                     console.log(res.body);
    //                     res.should.have.status(200);
    //                     done();
    //                 }
    //             })
    //     })
    // })

    
})