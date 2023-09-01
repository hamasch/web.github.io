/** Shopify CDN: Minification failed

Line 98:8 Transforming object literal extensions to the configured target environment ("es5") is not supported yet

**/
(function() {
  var GWP_PROPERTY_NAME = '_vendor_gwp';
  var settings = null;

  function cartHasPromoItem (items, variant_id) {
    var foundItems = items.filter(function (item) {
      return item.variant_id === parseInt(variant_id) && (item.properties && item.properties[GWP_PROPERTY_NAME]);
    });

    return foundItems.length > 0;
  }

  function getTotalValueByVendor (items) {
    var totalValueByVendor = {};

    for (index = 0; index < items.length; index++) {
      var item = items[index];

      if (item.hasOwnProperty('vendor')) {
        if (totalValueByVendor[item.vendor]) {
          totalValueByVendor[item.vendor] = totalValueByVendor[item.vendor] + item.final_line_price;
        } else {
          totalValueByVendor[item.vendor] = item.final_line_price;
        }
      }
    }

    return totalValueByVendor;
  }

  function getCartItemIndex (items, variant_id) {
    var foundItemIndex = null;

    for (index = 0; index < items.length; index++) {
      var item = items[index];

      if (item.variant_id === parseInt(variant_id)) {
        if (item.properties && item.properties[GWP_PROPERTY_NAME]) {
          foundItemIndex = index + 1;
          break;
        }
      }
    }

    return foundItemIndex;
  }

  function getItemsToAdd (cart, totalValuesByVendor) {
    var itemsToAdd = [];

    settings.forEach(function (setting) {
      var threshold = setting.threshold * 100;

      if (Object.keys(totalValuesByVendor).includes(setting.title)) {
        var itemIsInCart = cartHasPromoItem(cart.items, setting.variant_id);

        if (totalValuesByVendor[setting.title] >= threshold && !itemIsInCart) {
          itemsToAdd.push(setting.variant_id);
        }
      }
    });

    return itemsToAdd;
  }

  function getItemsToRemove (cart, totalValuesByVendor) {
    var itemsToRemove = [];

    settings.forEach(function (setting) {
      var threshold = setting.threshold * 100;

      if (Object.keys(totalValuesByVendor).includes(setting.title)) {
        var itemIsInCart = cartHasPromoItem(cart.items, setting.variant_id);

        if (totalValuesByVendor[setting.title] < threshold && itemIsInCart) {
          var cartItemIndex = getCartItemIndex(cart.items, setting.variant_id);

          itemsToRemove.push(cartItemIndex);
        }
      }
    });

    return itemsToRemove;
  }

  function handleCartRequestComplete (e, cart) {
    var totalValuesByVendor = getTotalValueByVendor(cart.items);
    var itemsToAdd = getItemsToAdd(cart, totalValuesByVendor);
    var itemsToRemove = getItemsToRemove(cart, totalValuesByVendor);

    itemsToAdd.forEach(function (item) {
      CartJS.addItem(item, 1, {
        [GWP_PROPERTY_NAME]: GWP_PROPERTY_NAME
      });
    });

    if (itemsToRemove.length > 0) {
      CartJS.removeItem(itemsToRemove[0]);
    }
  }

  // Bind events
  $(document).on('cart.ready', function (e, cart) {
    settings = JSON.parse($('#vendor_gwp_settings').html());
    handleCartRequestComplete(e, cart);
  });

  $(document).on('cart.requestComplete', handleCartRequestComplete);
})();
