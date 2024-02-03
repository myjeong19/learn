// 사진 판매 사이트

//   Todo 1. 사진 클래스
class Photo {
  //? 클래스 필드

  constructor(title, imageURL, price, description) {
    this.title = title;
    //? 클래스 속성
    this.imageURL = imageURL;
    this.price = price;
    this.description = description;
  }
}

class ElementAttribute {
  constructor(attributeName, attributeValue) {
    this.name = attributeName;
    this.value = attributeValue;
  }
}

class Component {
  constructor(renderHookId) {
    // ! 추가할 위치
    this.hookId = renderHookId;
  }

  createRootElement(tag, cssClass, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClass) {
      // ! cssClass가 true인 경우, cssClass 할당
      rootElement.className = cssClass;
    }
    if (attributes && attributes.length > 0) {
      // ! attributes가 true이고, 길이가 0 보다 큰 경우
      for (const attribute of attributes) {
        rootElement.setAttribute(attribute.name, attribute.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

// Todo 2-1 상속
class ShoppingCart extends Component {
  cartItem = [];

  set cartItems(updateCartItem) {
    this.cartItem = updateCartItem;
    this.totalOutput.innerHTML = `<h2>Total: ${this.totalAmount.toLocaleString(
      'ko-KR'
    )}원</h2>`;
  }

  //   Todo 출력 업데이트 1-1
  get totalAmount() {
    const sum = this.cartItem.reduce(
      (prevValue, currentItem) => prevValue + currentItem.price,
      0
    );
    return sum;
  }
  constructor() {
    super();
  }

  handleAddPhoto(photo) {
    const updatedCartItems = [...this.cartItem];
    updatedCartItems.push(photo);
    this.cartItems = updatedCartItems;
  }

  render() {
    const elementCart = this.createRootElement('section', 'cart');
    elementCart.innerHTML = `
<h2>Total: ${0}원</h2>
<button>주문하기</button>
`;
    this.totalOutput = elementCart.querySelector('h2');
    return elementCart;
  }
}

// Todo 3. 단일 아이템의 렌더링 담당
class PhotoItem {
  constructor(photo) {
    this.photo = photo;
  }

  handleAddToCart() {
    App.addPhotoToCart(this.photo);
  }

  render() {
    const elementPhotoItem = document.createElement('li');
    elementPhotoItem.className = 'photo-item';
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
    //? this를 bind해, handleAddToCart의 this가 class의 this를 가르키게함
    return elementPhotoItem;
  }
}

// Todo 2. 사진들 사진 렌더 메서드 클래스
class PhotoList {
  photos = [
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

  //?   클래스 메서드
  render() {
    const elementPhotoList = document.createElement('ul');
    elementPhotoList.className = 'photo-list';
    for (const photo of this.photos) {
      const craetePhotoItem = new PhotoItem(photo);
      const elementPhotoItem = craetePhotoItem.render();
      elementPhotoList.append(elementPhotoItem);
    }

    return elementPhotoList;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById('app');

    //? 1-1 this.createCart는 Shop의 createCart를 의미함.
    this.createCart = new ShoppingCart();
    const elementCart = this.createCart.render();

    const craetePhotoShop = new PhotoList();
    const elementPhotoShop = craetePhotoShop.render();

    renderHook.append(elementCart);
    renderHook.append(elementPhotoShop);
  }
}

class App {
  static createCart;

  static init() {
    const shop = new Shop();
    shop.render();
    //? 1-2 renderApp의 cart는 shop.cart임
    this.createCart = shop.createCart;
  }

  static addPhotoToCart(photo) {
    this.createCart.handleAddPhoto(photo);
  }
}

App.init();
