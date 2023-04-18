//Defining the models for client and user
const clients = [];
const users = [];

class Client {
  constructor(id, name, clientId, clientSecret) {
    this.id = id;
    this.name = name;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }
}

class User {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
