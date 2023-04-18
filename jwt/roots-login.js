//Creating routes for login and accessing protected routes
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  
    // Generate access token
    const accessToken = jwt.sign({ userId: user.id }, 'ssj_estate_api_secret_key');
    res.json({ access_token: accessToken });
  });
  
  app.get('/protected', (req, res) => {
    // Access protected route
    const accessToken = req.header('Authorization').replace('Bearer ', '');
    try {
      jwt.verify(accessToken, 'ssj_estate_api_secret_key');
      res.json({ message: 'This is a protected route' });
    } catch (err) {
      res.status(401).json({ message: 'Invalid access token' });
    }
  });