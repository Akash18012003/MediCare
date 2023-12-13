import React, { useState, useRef, useEffect } from 'react'
import { useDispatchCart,useCart } from "./ContextReducer";
export default function Card(props) {
  let dispatch = useDispatchCart(); 
  let data=useCart();
  let options =props.options;
  let priceOptions = Object.keys(options);
  let medIteam = props.medIteam;
  const priceRef = useRef();
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")

  
  const handleAddToCart = async () => {
  const existingItemIndex = data.findIndex((item) => item.id === medIteam._id);

  if (existingItemIndex !== -1) {
    // Item with the same ID exists in the cart, update it
    dispatch({
      type: "UPDATE",
      id: props.medIteam._id,
      price: finalPrice,
      qty: qty,
    });
  } else {
    // Item with the same ID doesn't exist in the cart, add a new item
    dispatch({
      type: "ADD",
      id: props.medIteam._id,
      name: props.medIteam.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.ImgSrc,
    });
  }
};


  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])
  return ( 
    <div>
      <div>
        <div 
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img src={props.medIteam.img} className="card-img-top" alt="..." style={{height:"120px" , objectFit:"fill"}} />
          <div className="card-body">
            <h5 className="card-title">{props.medIteam.name}</h5> 
            <div className="container w-100">
              <select className="m-2 h-100  bg-success rounded " onChange={(e)=>setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {" "}
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              <select className="m-2 h-100  bg-success rounded" ref ={priceRef}onChange={(e)=>setSize(e.target.value)}>
                {priceOptions.map((data)=>{
                  return <option key={data} value={data}>{data}</option>
                })}
              </select> 
              <div className="d-inline h-100 fs-5">₹{finalPrice}/-
              </div>
            </div>
            <hr>
            </hr>
            <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}