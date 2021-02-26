import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantSource {
  static async getRestaurantList() {
    const preloaderInitiator = (response) => {
      const preloader = document.querySelector('.preloader');
      if (response.status === 200) {
        preloader.style.display = 'none';
      } else {
        preloader.style.display = 'block';
        console.log('an error occured while requesting data');
      }
    };

    const response = await fetch(API_ENDPOINT.RESTAURANT_LIST);
    preloaderInitiator(response);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const preloaderInitiator = (response) => {
      const preloader = document.querySelector('.preloader');
      if (response.status === 200) {
        preloader.style.display = 'none';
      } else {
        preloader.style.display = 'block';
        console.log('an error occured while requesting data');
      }
    };

    const response = await fetch(API_ENDPOINT.DETAIL(id));
    preloaderInitiator(response);
    return response.json();
  }

  static async addNewReview(review) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '12345',
      },
      body: JSON.stringify(review),
    };

    const response = await fetch(API_ENDPOINT.NEW_REVIEW, options);
    return response.json();
  }
}

export default RestaurantSource;
