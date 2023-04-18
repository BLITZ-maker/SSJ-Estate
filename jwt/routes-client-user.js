//Creating routes for registering client and user
app.post('/register-client', (req, res) => {
    const { clientId, clientSecret, name } = req.body;
    const client = new Client(clients.length + 1, name, clientId, clientSecret);
    clients.push(client);
    res.json({ message: 'Client registered successfully' });
  });
  
  app.post('/register-user', (req, res) => {
    const { email, password, name } = req.body;
    const user = new User(users.length + 1, name, email, password);
    users.push(user);
    res.json({ message: 'User registered successfully' });
  });
  