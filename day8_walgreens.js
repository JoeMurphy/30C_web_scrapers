(function() {
    // Create an empty array to store all product data
    const allProductsData = [];

    // Select all product cards on the page
    const productCards = document.querySelectorAll('.card.card__product');

    // Loop through each product card and extract data
    productCards.forEach((productCard) => {
        // Extract product image (ensure to prepend 'https:' to src if it starts with '//')
        let productImage = productCard.querySelector('.product__img img')?.getAttribute('src');
        productImage = productImage ? (productImage.startsWith('//') ? 'https:' + productImage : productImage) : 'No image';

        // Extract product title
        const productTitle = productCard.querySelector('.product__title h3')?.innerText.trim() || 'No title';

        // Extract product size
        const productSize = productCard.querySelector('.amount')?.innerText.trim() || 'No size';

        // Extract product brand
        const productBrand = productCard.querySelector('.brand')?.innerText.trim() || 'No brand';

        // Extract product rating
        const productRating = productCard.querySelector('.product__rating img')?.getAttribute('title') || 'No rating';

        // Extract number of reviews
        const numberOfReviews = productCard.querySelector('.product__rating figcaption')?.innerText.trim() || 'No reviews';

        // Extract product price
        const productPrice = productCard.querySelector('.price__contain .body-medium')?.innerText.trim() || 'No price';

        // Check availability for Pickup, Same Day Delivery, and Shipping
        const pickupAvailable = productCard.querySelector('.availability-msg-icon .icon__check-v2') ? "Available" : "Unavailable";
        const sameDayDeliveryAvailable = productCard.querySelector('#same-day-deliverycompare_sku6019095 .icon__check-v2') ? "Available" : "Unavailable";
        const shippingAvailable = productCard.querySelector('.icon__dismiss-v2') ? "Unavailable" : "Available";

        // Store all extracted data into an object
        const productData = {
            image: productImage,
            title: productTitle,
            size: productSize,
            brand: productBrand,
            rating: productRating,
            numberOfReviews: numberOfReviews,
            price: productPrice,
            availability: {
                pickup: pickupAvailable,
                sameDayDelivery: sameDayDeliveryAvailable,
                shipping: shippingAvailable
            }
        };

        // Push the product data object into the array
        allProductsData.push(productData);
    });

    // Output all products data to the console
    console.log(allProductsData);
})();
