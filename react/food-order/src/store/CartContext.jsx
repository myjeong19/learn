import { createContext, useReducer } from 'react';

const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';

const CartContext = createContext({
  items: [],
  addItem: item => {},
  removeItem: id => {},
});

const cartReducer = (state, action) => {
  const existingCartItemIndex = state.items.findIndex(
    item => item.id === action.item.id
  );

  switch (action.type) {
    case ADD_ITEM:
      //   state.items.push(action.item);
      //   272.2 bad state update
      //   1. The point at which the state value is modified occurs before the completion of the cartReducer execution
      //   2. It is advisable to avoid updating existing items.

      const updatedItems = [...state.items];

      if (existingCartItemIndex > -1) {
        const existingItem = state.items[existingCartItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
        // overwrite the existing item with the updated item
      } else {
        updatedItems.push({ ...action.item, quantity: 1 });
      }
      return { ...state, items: updatedItems };

    case REMOVE_ITEM:
      const existingCartItem = state.items[existingCartItemIndex];
      if (existingCartItem.quantity === 1) {
        const updatedItems = [...state.items];
        updatedItems.splice(existingCartItemIndex, 1);
        // remove the item from the array
      } else {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity - 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return { ...state, items: updatedItems };
  }

  return state;
};

export const CartContextProvider = ({ children }) => {
  // Easy managing the Cart State
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  const addItem = item => {
    dispatchCartAction({ type: ADD_ITEM, item });
  };
  const removeItem = id => {
    dispatchCartAction({ type: REMOVE_ITEM, id });
  };

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartContext;
// 272-1. export CartContext Object
