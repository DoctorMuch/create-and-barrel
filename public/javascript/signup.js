async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signUp').value.trim();
  const email = document.querySelector('#email-signUp').value.trim();
  const password = document.querySelector('#password-signUp').value.trim();

  if(username && email && password) {
    const response = await fetch('/api/users/', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    if(response.ok) {
      document.location.replace('/dash');
      console.log('Stay strong, you got this');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.signUp-form').addEventListener('submit', signupFormHandler);