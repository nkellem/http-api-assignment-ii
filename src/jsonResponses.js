const query = require('querystring');

const users = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    message: { users },
  };

  return respondJSON(request, response, 200, responseJSON);
};

const notReal = (request, response) => {
  const responseJSON = {
    message: 'Error: not real',
    id: 'notReal',
  };

  return respondJSON(request, response, 404, responseJSON);
};

const addUser = (request, response) => {
  let body = [];

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    body = query.parse(bodyString);

    const responseJSON = {};

    if (!body.name || !body.age) {
      responseJSON.message = 'Missing Name or Age';
      responseJSON.id = 'missingParams';
      return respondJSON(request, response, 400, responseJSON);
    }

    let responseCode = 201;

    if (users[body.name]) {
      responseCode = 204;
    } else {
      users[body.name] = {};
    }

    users[body.name].name = body.name;
    users[body.name].age = body.age;

    if (responseCode === 201) {
      responseJSON.message = 'Created Successfully';
      return respondJSON(request, response, responseCode, responseJSON);
    }

    return respondJSONMeta(request, response, responseCode);
  });
};

module.exports = {
  getUsers,
  notReal,
  addUser,
};
