import React, { createContext,useContext,useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const Reducer = (state,action)=>{
    switch(action.type) {
        case "ADD":
            return [...state,{id:action.id,name:action.name,qty:action.qty,size:action.size,price:action.price,img:action.img}]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
         case "UPDATE":
            let arr = [...state]
            arr.find((toys, index) => {
                if (toys.id === action.id) {
                    console.log(toys.qty, parseInt(action.qty), action.price + toys.price)
                    arr[index] = { ...toys, qty: parseInt(action.qty) + toys.qty, price: action.price + toys.price }
                }
                return arr
            })
            return arr
        case "DROP":
            let empArray = []
            return empArray
        default:
            console.log('error in reducer')
    }

}

export const Cartprovider = ({children})=>{
    const [state, dispatch] = useReducer(Reducer,[])
    return(
   <CartDispatchContext.Provider value={dispatch}>
    <CartStateContext.Provider value={state}>
        {children}
    </CartStateContext.Provider>
   </CartDispatchContext.Provider>
    )
  
}

export const useCart = ()=> useContext(CartStateContext)
export const useDispatchCart = ()=> useContext(CartDispatchContext)
 