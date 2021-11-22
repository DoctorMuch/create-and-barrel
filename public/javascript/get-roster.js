async function getUsers(event) {
    event.preventDefault();
    const response = await fetch('/api/users', {
        method: 'get',
        body: JSON.stringify({
            username
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    if(response.ok){
        document.location.replace('/users');
    }else{
        alert(response.statusText);
    }
};
document.querySelector('#roster').addEventListener('click', getUsers);