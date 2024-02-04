// 사진 판매 사이트

//* Photo 객체를 만드는 클래스
class Photo {
  constructor(title, imageURL, price, description) {
    this.title = title;
    this.imageURL = imageURL;
    this.price = price;
    this.description = description;
  }
}

//* ElementAttribute 태그에 속성 부여, 클래스
class ElementAttribute {
  constructor(attributeName, attributeValue) {
    this.name = attributeName;
    this.value = attributeValue;
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  //* 명시적 render
  render() {}

  createRootElement(tag, cssClass, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClass) {
      //* cssClass가 true인 경우, cssClass 할당
      rootElement.className = cssClass;
    }
    if (attributes && attributes.length > 0) {
      //* attributes가 true이고, 길이가 0 보다 큰 경우
      for (const attribute of attributes) {
        //* attributes의 길이만큼 반복하며, setAttribute으로 속성 할당
        rootElement.setAttribute(attribute.name, attribute.value);
      }
    }
    //* this.hookId는 renderHookId
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

//* Component를 상속 받은 ShoppingCart
class ShoppingCart extends Component {
  cartItem = [];

  //* 장바구니 총액 DOM 업데이트
  set cartItems(updateCartItem) {
    this.cartItem = updateCartItem;
    //* updateCartItem 카트 상품 목록 업데이트한 배열 값
    this.totalOutput.innerHTML = `<h2>Total: ${this.totalAmount.toLocaleString(
      'ko-KR'
    )}원</h2>`;
  }

  //* 장바구니 총액
  get totalAmount() {
    const sum = this.cartItem.reduce(
      (prevValue, currentItem) => prevValue + currentItem.price,
      0
    );
    return sum;
  }

  constructor(renderHookId) {
    //* 부모 생성자 호출
    super(renderHookId, false);
    this.orderPhoto = () => {
      console.log('Ordering...');
      console.log(this.cartItem);
    };
    this.render();
  }

  //* 카트에 상품추가
  handleAddPhoto(photo) {
    const updatedCartItems = [...this.cartItem];
    updatedCartItems.push(photo);
    this.cartItems = updatedCartItems;
  }

  render() {
    //* 부모 Component의 createRootElement
    const elementCart = this.createRootElement('section', 'cart');
    elementCart.innerHTML = `
    <h2>Total: ${0}원</h2>
    <button>주문하기</button>
    `;
    const orderButton = elementCart.querySelector('button');
    orderButton.addEventListener('click', this.orderPhoto);
    this.totalOutput = elementCart.querySelector('h2');
  }
}

class PhotoItem extends Component {
  constructor(photo, renderHookId) {
    super(renderHookId, false);
    this.photo = photo;
    this.render();
  }

  handleAddToCart() {
    App.addPhotoToCart(this.photo);
  }

  render() {
    const elementPhotoItem = this.createRootElement('li', 'photo-item');
    elementPhotoItem.innerHTML = `
    <div>
      <img src='${this.photo.imageURL}' alt='${this.photo.title}'>
      <div>
          <h2>${this.photo.title}</h2>
          <h3>${this.photo.price.toLocaleString('ko-KR')}원</h3>
          <p>${this.photo.description}</p>
          <button>카트 담기</button>
      </div>
    </div>
    `;

    const buttonAddCart = elementPhotoItem.querySelector('button');
    buttonAddCart.addEventListener('click', this.handleAddToCart.bind(this));
    //* this를 bind해, handleAddToCart의 this가 class의 this를 가르키게함
  }
}

class PhotoList extends Component {
  photos = [];

  constructor(renderHookId) {
    super(renderHookId);
    this.fetchPhotos();
  }

  fetchPhotos() {
    this.photos = [
      new Photo(
        'Photo 1',
        'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        20000,
        'This is Photo 1'
      ),

      new Photo(
        'Photo 2',
        'https://images.unsplash.com/photo-1697462247864-338e7eba8c4c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        15000,
        'This is Photo 2'
      ),
    ];
    this.renderPhotos();
  }

  renderPhotos() {
    for (const photo of this.photos) {
      new PhotoItem(photo, 'photo-list');
    }
  }

  render() {
    this.createRootElement('ul', 'photo-list', [
      new ElementAttribute('id', 'photo-list'),
    ]);
    if (this.photos && this.photos.length > 0) {
      this.renderPhotos();
    }
  }
}

class Shop {
  constructor() {
    this.render();
  }

  render() {
    //* 1-1 this.createCart는 Shop의 createCart를 의미함.
    this.createCart = new ShoppingCart('app');
    new PhotoList('app');
  }
}

class App {
  static createCart;

  static init() {
    const shop = new Shop();
    this.createCart = shop.createCart;
  }

  static addPhotoToCart(photo) {
    this.createCart.handleAddPhoto(photo);
  }
}

App.init();
