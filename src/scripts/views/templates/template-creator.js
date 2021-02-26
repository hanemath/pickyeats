import CONFIG from '../../globals/config';

const createDrinkItemMap = (drinks) => {
  const drinksHTML = drinks.map((drink) => {
    const listDrink = `
    <li class="drink-name" tabindex="0">${drink.name}
      <span class="detail-drink" tabindex="0">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </span>
    </li>
    `;
    return listDrink;
  }).join('');

  return `<ul class="list-drinks">${drinksHTML}</ul>`;
};

const createFoodItemMap = (foods) => {
  const foodsHTML = foods.map((food) => {
    const listFood = `
    <li class="food-name" tabindex="0">${food.name}
      <span class="detail-food" tabindex="0">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
      </span>
    </li>
    `;
    return listFood;
  }).join('');

  return `<ul class="list-foods">${foodsHTML}</ul>`;
};

const createReviewItemMap = (reviews) => {
  let reviewsHTML = '';
  reviews.forEach((review) => {
    reviewsHTML += `
    <li class="customer-review" tabindex="0">
      <p class="name" tabindex="0">${review.name} on ${review.date}</p>
      <p class="content" tabindex="0">${review.review}</p>
    </li>
    `;
  });

  return `<ul class="list-reviews">${reviewsHTML}</ul>`;
};

const createCategoriesItemMap = (categories) => {
  let categoriesHTML = '';
  categories.forEach((category) => {
    categoriesHTML += `
      <p class="list-category" tabindex="0">#${category.name} </p>
    `;
  });

  return `<p>${categoriesHTML}</p>`;
};

const createRestaurantDetailTemplate = (restaurant) => `
  <div class="hero-image">
    <div class="restaurant-grid">
      <img src="./images/tape-large.jpg" class="image-tape lazyload" alt="Background Tape" crossorigin="anonymous"
        srcset="./images/tape-small.jpg 480w, ./images/tape-large.jpg 900w"
        sizes="(max-width: 767.98px) 480px, 900px">
      <div class="restaurant-name-centered">${restaurant.restaurant.name}</div>
    </div>
  </div>
  
  <img crossorigin="anonymous" class="lazyload restaurant-poster" data-src="${restaurant.restaurant.pictureId ? CONFIG.BASE_URL + '/images/small/' + restaurant.restaurant.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}" alt="${restaurant.restaurant.name} Restaurant Interior Design"  tabindex="0"/>
  <div class="restaurant-info">
    <div class="info-first-grid">
      <h3 class="title" tabindex="0">About us</h3>
      <p class="resto-desc" tabindex="0">${restaurant.restaurant.description}</p>
    </div>
    <div class="info-second-grid">
      <h3 class="title" tabindex="0">Address</h3>
      <p class="resto-desc" tabindex="0">${restaurant.restaurant.address}, ${restaurant.restaurant.city}</p>
      <p class="restaurant-rating" tabindex="0">
        <span class="icon-star" aria-hidden="true" tabindex="0">${restaurant.restaurant.rating} on reviews</span>
      </p>
      <p  tabindex="0">Categories : ${createCategoriesItemMap(restaurant.restaurant.categories)}</p>
    </div>
  </div>

  <h2 class="title-banner" tabindex="0">OUR MENU</h2>
  <p class="subtitle-banner" tabindex="0">The all-time favourite served with love</p>

  <div class="restaurant-menu">
    <div class="menu-foods">
      <h3 class="title" tabindex="0">FOODS</h3>
      <div>${createFoodItemMap(restaurant.restaurant.menus.foods)}</div>
    </div>
    <div class="menu-drinks">
      <h3 class="title" tabindex="0">DRINKS</h3>
      <div>${createDrinkItemMap(restaurant.restaurant.menus.drinks)}</div>
    </div>
  </div>
  <div class="restaurant-review">
    <div>
      <h3 class="title" tabindex="0">REVIEWS</h3>
      ${createReviewItemMap(restaurant.restaurant.customerReviews)}
    </div>
    <section id="formReview" class="form-review"></section>
  </div>
</div>
`;

const createRestaurantItemTemplate = (restaurant) => `
  <div class="card">
      <div class="card-image">
          <img crossorigin="anonymous" data-src=" ${restaurant.pictureId ? CONFIG.BASE_URL + '/images/small/' + restaurant.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}" class="lazyload cover-resto img-responsive" alt="${restaurant.name} Restaurant Interior Design" tabindex="0">
          <div class="label">
              <p class="city-label" tabindex="0">Kota ${restaurant.city}</p>
          </div>
      </div>
      <div class="card-text">
          <h3 class="restaurant__title"><a href="${`/#/detail/${restaurant.id}`}" class="resto-name" tabindex="0">${restaurant.name || '-'}</a></h3>
          <p class="resto-rating" tabindex="0">
            <span class="icon-star" aria-hidden="true">${restaurant.rating}</span>
          </p>
          <p class="resto-desc" tabindex="0">${restaurant.description || '-'}</p>
      </div>
  </div>
`;

const createFormReviewTemplate = () => `
  <div class="card">
    <div class="card-text">
      <h3 class="title" tabindex="0">Give Us Review..</h3>
      <form class="form-review">
        <div class="form-group">
          <label for="inputReviewerName">Your Name</label>
          <input id="inputReviewerName" type="text" class="form-control" placeholder="Your Name" tabindex="0">
        </div>
        <div class="form-group">
          <label for="inputReview">Your Review</label>
          <input id="inputReview" type="text" class="form-control" placeholder="Your Review" tabindex="0">
        </div>
        <div class="form-group">
          <button id="buttonSubmit" class="btn btn-success" tabindex="0" type="button">Submit</button>
        </div>
      </form>
    </div>
  </div>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like" tabindex="0">
    <span class="icon-heart-o" aria-hidden="true"></span>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like" tabindex="0">
    <span class="icon-heart" aria-hidden="true"></span>
  </button>
`;

export {
  createRestaurantDetailTemplate, createRestaurantItemTemplate,
  createLikeRestaurantButtonTemplate, createUnlikeRestaurantButtonTemplate,
  createFormReviewTemplate,
};
