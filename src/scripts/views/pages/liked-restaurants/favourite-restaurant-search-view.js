import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantSearchView {
  getTemplate() {
    return `
      <article class="favourite-content">
        <section class="list-favourites">
          <div class="liked-page">
            <h1 class="content-heading" tabindex="0">Your Liked Restaurant</h1>
            <div class="search-form">
              <input id="query" class="search-query" type="text" placeholder="Search Restaurants">
              <button id="btn-search" class="btn-search">Search</button>
            </div>
            <div id="restaurants" class="restaurants restaurants-list">
            </div>
          </div>
        </section>
      </article>
    `;
  }

  runWhenUserIsSearching(callback) {
    // document.getElementById('query').addEventListener('change', (event) => {
    //   callback(event.target.value);
    //   console.log(event.target.value);
    // });
    document.getElementById('btn-search').addEventListener('click', () => {
      const valueName = document.getElementById('query').value;
      callback(valueName);
      console.log(valueName);
    });
  }

  showFavoriteRestaurants(restaurants = []) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
      console.log(restaurants);
    }
    document.getElementById('restaurants').innerHTML = html;

    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return '<div class="restaurant-item__not__found">Tidak ada restaurant untuk ditampilkan</div>';
  }
}

export default FavoriteRestaurantSearchView;
