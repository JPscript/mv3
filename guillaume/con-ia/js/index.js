// fetch openfoodfacts api to get orange juices images
fetch('https://world.openfoodfacts.org/cgi/search.pl?search_terms=orange+juice&search_simple=1&action=process&json=1')
  .then(response => response.json())
  .then(data => {
    const products = data.products;
    const imagesContainer = document.getElementById('images-container');

    products.forEach(product => {
      if (product.image_url) {
        const img = document.createElement('img');
        img.src = product.image_url;
        img.alt = product.product_name || 'Orange Juice';
        imagesContainer.appendChild(img);
      }
    });
  })
  .catch(error => console.error('Error fetching data:', error));