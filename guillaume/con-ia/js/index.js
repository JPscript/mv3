// fetch openfoodfacts api to get a list of categories

const categoriesSelect = document.getElementById('categories-select');
const categoryForm = document.getElementById('category-form');

fetch('https://world.openfoodfacts.org/categories.json')
  .then(response => response.json())
  .then(data => {
    const categories = data.tags;
    // Vider le select et ajouter l'option par défaut
    categoriesSelect.innerHTML = '<option value="">— Sélectionnez une catégorie —</option>';

    categories.slice(0, 50).forEach(category => {
      const option = document.createElement('option');
      option.value = category.id;        // ex: "en:orange-juices"
      option.textContent = category.name; // ex: "Orange juices"
      categoriesSelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error fetching categories:', error);
    categoriesSelect.innerHTML = '<option value="">❌ Erreur de chargement</option>';
  });

// Écouteur sur le formulaire pour lancer la recherche par catégorie
categoryForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const selectedCategory = categoriesSelect.value;
  if (!selectedCategory) {
    alert('Veuillez sélectionner une catégorie.');
    return;
  }

  fetchProductsByCategory(selectedCategory);
});

// Recherche de produits par catégorie sélectionnée
function fetchProductsByCategory(categoryId) {
  const imagesContainer = document.getElementById('results-container');

  // Afficher un état de chargement
  imagesContainer.innerHTML = '<div class="loading">Chargement des produits…</div>';

  // L'API attend le tag sous forme "en:orange-juices" → URL : /category/{tag}.json
  const url = `https://world.openfoodfacts.org/category/${categoryId}.json`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const products = data.products;
      // Vider le loading
      imagesContainer.innerHTML = '';

      if (!products || products.length === 0) {
        imagesContainer.innerHTML = '<div class="alert">Aucun produit trouvé pour cette catégorie.</div>';
        return;
      }

      products.forEach(product => {
        // Créer la carte produit
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        // Wrapper image
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'product-image-wrapper';

        if (product.image_url) {
          const img = document.createElement('img');
          img.src = product.image_url;
          img.alt = product.product_name || 'Produit';
          img.loading = 'lazy';
          imageWrapper.appendChild(img);
        } else {
          const noImage = document.createElement('div');
          noImage.className = 'no-image';
          noImage.textContent = '📷 Pas d\'image disponible';
          imageWrapper.appendChild(noImage);
        }

        productCard.appendChild(imageWrapper);

        // Info produit
        const productInfo = document.createElement('div');
        productInfo.className = 'product-info';

        // Marque
        if (product.brands) {
          const brand = document.createElement('span');
          brand.className = 'product-brand';
          brand.textContent = product.brands;
          productInfo.appendChild(brand);
        }

        // Nom
        const productName = document.createElement('h3');
        productName.textContent = product.product_name || 'Produit inconnu';
        productInfo.appendChild(productName);

        // Nutri-Score
        const nutriWrapper = document.createElement('div');
        nutriWrapper.className = 'nutri-score';

        const scoreBadge = document.createElement('span');
        const grade = product.nutriscore_grade || product.nutrition_grades || null;
        scoreBadge.className = `score-badge score-${grade || 'unknown'}`;
        scoreBadge.textContent = grade ? grade.toUpperCase() : '?';
        nutriWrapper.appendChild(scoreBadge);

        const scoreLabel = document.createElement('span');
        scoreLabel.className = 'score-label';
        scoreLabel.textContent = grade ? `Nutri-Score ${grade.toUpperCase()}` : 'Nutri-Score inconnu';
        nutriWrapper.appendChild(scoreLabel);

        productInfo.appendChild(nutriWrapper);
        productCard.appendChild(productInfo);

        // Tags catégories (max 3)
        const categories = product.categories_tags;
        if (categories && categories.length > 0) {
          const tagsContainer = document.createElement('div');
          tagsContainer.className = 'product-tags';

          categories.slice(0, 3).forEach(cat => {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = cat.replace(/^\w+:/, '').replace(/-/g, ' ');
            tagsContainer.appendChild(tag);
          });

          productCard.appendChild(tagsContainer);
        }

        imagesContainer.appendChild(productCard);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      imagesContainer.innerHTML = '<div class="alert alert-danger">❌ Erreur lors du chargement des produits. Réessayez plus tard.</div>';
    });
}
