import { Type } from "./action.type";

export const initialState = {
  basket: [],
  user: null,
};
// export const reducer = (state, action) => {
//   switch (action.type) {
//     case Type.ADD_TO_BASKET:
//       const existingItem = state.basket.find(
//         (item) => item.id === action.item.id
//       );
//       console.log(existingItem)
//       if (!existingItem) {
//         return {
//           ...state,
//           basket: [...state.basket, { ...action.item, amount: 1 }],
//         };
//       } else {
//         const updatedBasket = state.basket.map((item) => {
//           return item.id === action.item.id
//             ? { ...item, amount: item.amount + 1 }
//             : item;
//         });
//         console.log(updatedBasket)
//         return {
//           ...state,
//           basket: updatedBasket,
//         };
//       }
//     default:
//       return state;
//   }
// };
export const reducer = (state = { basket: [] }, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      console.log("Action received:", action);

      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );

      if (!existingItem) {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      } else {
        const updatedBasket = state.basket.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
        console.log("Updated basket:", updatedBasket);
        return {
          ...state,
          basket: updatedBasket,
        };
      }
    case Type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];
      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          newBasket.splice(index, 1);
        }
        return {
          ...state,
          basket: newBasket,
        };
      }
    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case Type.EMPTY_USER:
      return {
        ...state,
        basket: [],
      };
    default:
      console.warn(`Unhandled action type: ${action.type}`);
      return state;
  }
};
