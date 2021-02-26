import FavoriteRestaurantIdb from '../../data/favouriterestaurant-idb';
import FavoriteRestaurantSearchView from './liked-restaurants/favourite-restaurant-search-view';
import FavoriteRestaurantSearchPresenter from './liked-restaurants/favourite-restaurant-search-presenter';
import FavoriteRestaurantShowPresenter from './liked-restaurants/favourite-restaurant-show-presenter';

const view = new FavoriteRestaurantSearchView();

const Like = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
    new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
  },
};

export default Like;
