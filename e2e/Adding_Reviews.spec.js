/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
const assert = require('assert');

Feature('Adding New Review');

Before(({ I }) => {
  I.amOnPage('/#/home');
});

Scenario('show the form review of first restaurant', ({ I }) => {
  I.seeElement('.restaurant__title a');

  const firstRestaurant = locate('.restaurant__title a').first();
  I.click(firstRestaurant);

  I.seeElement('.customer-review');

  I.seeElement('.form-review');
  I.seeElement('.form-group #inputReviewerName');
  I.seeElement('.form-group #inputReview');
  I.seeElement('.form-group #buttonSubmit');
});

Scenario('add review to first restaurant in detail page', async ({ I }) => {
  I.seeElement('.restaurant__title a');
  const firstRestaurant = locate('.restaurant__title a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('.restaurant-name-centered');
  const visibleRestaurantName = await I.grabTextFrom('.restaurant-name-centered');
  assert.strictEqual(firstRestaurantName, visibleRestaurantName);

  const reviewerName = '001';
  const reviewContent = '002';

  I.fillField('#inputReviewerName', reviewerName);
  I.fillField('#inputReview', reviewContent);
  I.click('#buttonSubmit');

  I.see('001');
  I.see('002');
});
