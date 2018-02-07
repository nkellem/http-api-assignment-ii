const users = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    message: {users},
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

};

module.exports = {
  getUsers,
  notReal,
  addUser,
};
