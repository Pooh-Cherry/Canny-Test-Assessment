import getPath from '../utils/getPath';

class Request {
  constructor(queryData, request, response) {
    this._queryData = queryData;
    this._request = request;
    this._response = response;
  }

  error(error) {
    const data = JSON.stringify({
      error: 'server error',
    });
    this._respond(data, 500);
  }

  fail(message) {
    const responseData = {
      error: message,
    };
    const data = JSON.stringify(responseData);
    this._respond(data, 400, { 'Content-Type': 'text/plain' });
  }

  getData() {
    return this._queryData;
  }

  getPath() {
    return getPath(this._request.url);
  }

  setData(queryData) {
    this._queryData = queryData;
  }

  respond(text, status) {
    status = status || 200;
    this._respond(text, status, { 'Content-Type': 'text/plain' });
  }

  respondJSON(json, status) {
    status = status || 200;
    this._respond(json, status, { 'Content-Type': 'application/json' });
  }

  _respond(data, status, additionalHeaders) {
    var headers = Object.assign(
      {
        'Access-Control-Allow-Origin': '*',
        'Content-Length': Buffer.byteLength(data, 'utf8'),
        'Content-Type': 'text/plain',
      },
      additionalHeaders
    );

    this._response.writeHead(status, headers);
    this._response.end(data, 'utf8');
  }
}

module.exports = Request;
