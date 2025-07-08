import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'

export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let option = props.options || {};
    let priceOptions = Object.keys(option);
    const [qty, setqty] = useState(1)
    const [Size, setSize] = useState("")

    const handleAddtoCart = async () => {
        let toys = []
        for (const item of data) {
            if (item.id === props.toyItems._id) {
                toys = item;

                break;
            }
        }
        if (toys !== []) {
            if (toys.size === Size) {
                await dispatch({ type: "UPDATE", id: props.toyItems._id, price: finalprice, qty: qty })
                return
            }
            else if (toys.size !== Size) {
                await dispatch({ type: "ADD", id: props.toyItems._id, name: props.toyItems.name, price: finalprice, qty: qty, size: Size,  img: props.toyItems.img })
                return

            }
            return

        }
        await dispatch({ type: "ADD", id: props.toyItems._id, name: props.toyItems.name, price: finalprice, qty: qty, size: Size ,img: props.toyItems.img })
        console.log(data)

    }
    let finalprice = qty * parseInt(option[Size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <div className="card">
            <img
                src={props.toyItems.img}
                className="card-img-top"
                alt={props.toyItems.name}
                style={{ height: "150px", objectFit: "fill", borderRadius: "15px" }}
            />

            <div className="card-body text-center">
                <h5 className="card-title">{props.toyItems.name}</h5>

                <div className="price-box">
                    <select className="m-1 rounded" onChange={(e) => setqty(e.target.value)}>
                        {Array.from(Array(6), (_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>

                    <select
                        className="m-1 rounded"
                        ref={priceRef}
                        onChange={(e) => setSize(e.target.value)}
                    >
                        {priceOptions.map((data) => (
                            <option key={data} value={data}>
                                {data}
                            </option>
                        ))}
                    </select>

                    <div>₹{finalprice}/-</div>
                </div>

                <button className="btn btn-add mt-2" onClick={handleAddtoCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );

}
