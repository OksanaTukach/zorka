window.addEventListener('load', () => {
  const removeProductBtns = document.querySelectorAll('.js-remove-item');
  if (removeProductBtns.length) {
    removeProductBtns.forEach((element) =>
      element.addEventListener('click', removeProduct)
    );
  }

  setHeaderHeightVar();
});

window.addEventListener('resize', () => {
  setHeaderHeightVar();
});

window.addEventListener('scroll', () => {
  setHeaderHeightVar();
});

const removeProduct = (event) => {
  const product = event.target.closest('.basket-table__product');
  const productList = product.closest('.basket-table__product-list');

  product.style.height = `${product.offsetHeight}px`;

  setTimeout(() => {
    product.style.height = '0px';
  }, 0);

  setTimeout(() => {
    product.removeEventListener('click', removeProduct);
    product.remove();

    if (productList.children.length === 0) {
      productList.closest('.basket-table__row').remove();
    }
  }, 300);
};

const setHeaderHeightVar = () => {
  document.documentElement.style.setProperty(
    '--header-height',
    `${document.querySelector('.header').clientHeight}px`
  );
};
