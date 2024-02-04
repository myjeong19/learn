//* 객체 Product를 생성함
class Product {
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

//* 생성한 DOM요소에 부여할 속성 값
class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

//* DOM요소를 생성할 클래스

//* rootElement로, 첫번째 인자 값 tag를 할당해, DOM요소 생성
//* shouldRender가 true인 경우, render() 호출
//* render(){} 명시적 존재
//* createRootElement 태그, 클래스 명, 속성 값
//* hookId에, rootElement를 append()
class Component {
  // shouldRender 자동 호출 여부 기본 값  true
  constructor(renderHookId, shouldRender = true) {
    this.renderHookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  render() {}

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.renderHookId).append(rootElement);
    return rootElement;
  }
}

//* 쇼핑 카트
//* set cartItems 설정 값이 할당 될 때 호출
//* get totalAmount 값을 읽고 사용할 때 호출
//* super()를 통해 부모의 constructor를 호출함
class ShoppingCart extends Component {
  items = [];

  set cartItems(updatedItems) {
    this.items = updatedItems;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId, false);
    this.orderProducts = () => console.log(this.items);
    this.render();
  }

  //* addProduct의 인자 product는 ProductItem의 product임
  //* 넘겨 받은 값을 updatedItem 배열에 push함.
  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
    //* this.cartItem은 ShoppingCart의 cartItem을 의미함.
  }

  render() {
    //* 부모의 createRootElement에, settion과, cart라는 값을 넘겨줌
    const cartEl = this.createRootElement('section', 'cart');
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `;
    const orderButton = cartEl.querySelector('button');
    // orderButton.addEventListener('click', () => this.orderProducts());
    orderButton.addEventListener('click', this.orderProducts);
    this.totalOutput = cartEl.querySelector('h2');
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    //* 부모인 Compoent의 constructor를 호출.
    //* 부모인 renderHookId를 참조
    this.product = product;
    this.render();
  }

  addToCart() {
    //* ProductItem의 product를 addProductToCart의 인자로 넘겨줌
    App.addProductToCart(this.product);
  }

  render() {
    //* 부모 Component의 createRootElement 호출해, li에 product-item 클래스를 할당함
    const prodEl = this.createRootElement('li', 'product-item');
    prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" >
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
    const addCartButton = prodEl.querySelector('button');
    addCartButton.addEventListener('click', this.addToCart.bind(this));
  }
}

class ProductList extends Component {
  #products = [];

  //* Component의 renderHookId에, ProductList()의 인자 값을 전달한다.
  constructor(renderHookId) {
    super(renderHookId, false);

    //* this는 ProductList를 가르킴
    //* 즉 constructor가 호출되면 ProductList의 render()와, fetchProducts()가 호출됨.
    this.render();
    this.fetchProducts();
  }

  fetchProducts() {
    this.#products = [
      new Product(
        'A Pillow',
        'https://www.maxpixel.net/static/photo/2x/Soft-Pillow-Green-Decoration-Deco-Snuggle-1241878.jpg',
        'A soft pillow!',
        19.99
      ),
      new Product(
        'A Carpet',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/397px-Ardabil_Carpet.jpg',
        'A carpet which you might like - or not.',
        89.99
      ),
    ];
    this.renderProducts();
  }

  renderProducts() {
    for (const prod of this.#products) {
      new ProductItem(prod, 'prod-list');
    }
  }

  render() {
    //* 부모인 Compoent에서 받아온 createRootElement를 가르킴
    this.createRootElement('ul', 'product-list', [
      new ElementAttribute('id', 'prod-list'),
    ]);
    if (this.#products && this.#products.length > 0) {
      this.renderProducts();
    }
  }
}

class Shop {
  constructor() {
    this.render();
  }

  render() {
    this.cart = new ShoppingCart('app');
    new ProductList('app');
  }
}

//* this.cart는 App의 static이며, this.cart는 shop.cart임
//* shop의 cart에, 넘겨주기 위해, App의 addProductToCart에, product를 받아, addProduct를 호출해 넘겨줌
class App {
  static cart;

  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
