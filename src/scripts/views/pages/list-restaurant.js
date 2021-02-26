import RestaurantSource from '../../data/restaurants-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const ListRestaurant = {
  async render() {
    return `
    <article>
      <section class="hero-section" id="herosection">
        <img src="./images/hero-image-large.jpg" class="cover lazyload" 
          alt="PickyEats Hero" tabindex="0" crossorigin="anonymous"
          srcset="./images/hero-image-small.jpg 480w, ./images/hero-image-large.jpg 900w" 
          sizes="(max-width: 767.98px) 480px,(min-width: 768px) 900px">
        <div class="overlay-shadow">
          <h1 class="title-hero" tabindex="0">Your No.1 Eatery Picker!</h1>
          <p class="span-title" tabindex="0">Share your favourite eatery with others!</p>
        </div>
      </section>
  
      <section class="restaurants-section">
        <h1 class="section-heading" tabindex="0">Restaurant Recommendations</h1>
        <div class="preloader">
          <video autoplay loop muted playsinline>
            <source src="./loading-image.webm" type="video/webm" class="cover" alt="Preloader" tabindex="0" crossorigin="anonymous">
            <source src="./loading-image.mp4" type="video/mp4" class="cover" alt="Preloader" tabindex="0" crossorigin="anonymous">
          </video>
        </div>
        <div id="restaurants" class="restaurants-list">
        </div>
      </section>
    </article>
    `;
  },

  async afterRender() {
    try {
      const restaurants = await RestaurantSource.getRestaurantList();
      console.log(restaurants);
      const restaurantsContainer = document.querySelector('#restaurants');
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default ListRestaurant;
