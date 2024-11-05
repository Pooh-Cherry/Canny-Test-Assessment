import GetPostsEndpoint from './endpoints/GetPostsEndpoint';
import HTTPServer from './webserver/HTTPServer';

const httpServer = new HTTPServer({
  endpoints: {
    '/api/posts/get': GetPostsEndpoint,
  },
});
httpServer.start();
console.log('Ready to receive requests');
