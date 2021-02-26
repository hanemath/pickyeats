import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurants-source';
import { createRestaurantDetailTemplate, createFormReviewTemplate } from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import API_ENDPOINT from '../../globals/api-endpoint';
import CacheHelper from '../../utils/cache-helper';
import FavoriteRestaurantIdb from '../../data/favouriterestaurant-idb';

const renderDetailData = (restaurant) => {
  const restaurantContainer = document.querySelector('#restaurant');
  restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

  LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteRestaurants: FavoriteRestaurantIdb,
    restaurant: {
      id: restaurant.restaurant.id,
      name: restaurant.restaurant.name,
      city: restaurant.restaurant.city,
      address: restaurant.restaurant.address,
      rating: restaurant.restaurant.rating,
      description: restaurant.restaurant.description,
      pictureId: restaurant.restaurant.pictureId,
    },
  });
};

const renderFormReview = (url) => {
  const formContainer = document.querySelector('#formReview');
  formContainer.innerHTML = createFormReviewTemplate();
  const buttonSubmit = document.querySelector('#buttonSubmit');

  buttonSubmit.addEventListener('click', async () => {
    const inputReviewerName = document.querySelector('#inputReviewerName');
    const inputReview = document.querySelector('#inputReview');

    const review = {
      id: url.id,
      name: inputReviewerName.value,
      review: inputReview.value,
    };

    try {
      const response = await RestaurantSource.addNewReview(review);
      if (!response.error) {
        const newReviews = response.customerReviews;
        const restaurantCacheMatched = await CacheHelper.revalidateCache(
          API_ENDPOINT.DETAIL(url.id),
        );
        if (restaurantCacheMatched) {
          const restaurantCache = await restaurantCacheMatched.json();
          restaurantCache.restaurant.customerReviews = newReviews;
          CacheHelper._putCache(API_ENDPOINT.DETAIL(url.id), restaurantCache);
          renderDetailData(restaurantCache);
          renderFormReview(url);
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
};

const Detail = {
  async render() {
    return `
    <article class="detail-content">
      <section class="restaurant-banner">
        <h1 class="title-banner" tabindex="0">BEST RESTAURANT</h1>
        <p class="subtitle-banner" tabindex="0">Wrap Up Foodies Best Picks</p>
        <div class="preloader">
          <video autoplay loop muted playsinline>
            <source src="./loading-image.webm" type="video/webm" class="cover" alt="Preloader" tabindex="0" crossorigin="anonymous">
            <source src="./loading-image.mp4" type="video/mp4" class="cover" alt="Preloader" tabindex="0" crossorigin="anonymous">
          </video>
        </div>
      </section>
      <section id="restaurant" class="restaurant-detail"></section>
      <section id="likeButtonContainer"></section>
    </article>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.detailRestaurant(url.id);
    console.log(restaurant);

    renderDetailData(restaurant);
    renderFormReview(url);
  },
};

export default Detail;
