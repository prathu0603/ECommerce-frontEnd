export const cartReducer = (state, action) => {
  switch (action.type) {
    case "INITIAL":
      return { ...state, cart: action.payload };
    case "ADD_TO_CART":
      return { ...state, cart: action.payload };

    case "REMOVE_FROM_CART":
      return { ...state, cart: action.payload };

    case "DECREASE_QTY":
      return { ...state, cart: action.payload };

    case "USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
