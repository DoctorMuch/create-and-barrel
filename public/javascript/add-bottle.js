async function addBottleHandler(event) {
  event.preventDefault();

  const whiskey_name = document.querySelector('#bottle-name').value.trim();
  const price = document.querySelector('#bottle-price').value.trim();

  if (whiskey_name && price) {
    const response = await fetch('/api/whiskeys', {
      method: 'post',
      body: JSON.stringify({
        whiskey_name,
        price,
        
      }),
      headers: { 'Content-Type': 'application/json'}
    });

    if(response.ok) {
      document.location.reload();
      return;
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.new-btl-form').addEventListener('submit', addBottleHandler);