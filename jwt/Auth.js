// Example for making a protected GET request to '/protected' endpoint
const accessToken = '<YOUR_ACCESS_TOKEN>'; // Replace with the actual access token

fetch('/protected', {
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error('Failed to fetch protected data');
  }
  return response.json();
})
.then(data => {
  console.log(data); // Data from the protected endpoint
})
.catch(error => {
  console.error(error);
});
