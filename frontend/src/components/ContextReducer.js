import React, { useReducer, useContext, createContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
     switch (action.type) {
            case "ADD":
                return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
            case "REMOVE":
                let newArr = [...state]
                    newArr.splice(action.index, 1)
                return newArr;
    
                case "UPDATE":
                    return state.map((med) => {
                        if (med.id === action.id) {
                            return { ...med, qty: parseInt(action.qty) + med.qty, price: action.price + med.price };
                        }
                        return med;
                    });
                
            case "DROP":
                 let empArray = []
                 return empArray
            default:
             console.log("Error in Reducer");
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);