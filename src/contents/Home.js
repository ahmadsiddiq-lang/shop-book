/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import EventListener from 'react-event-listener';
import './Home.css';
import Axios from 'axios';
import ReactToPrint from 'react-to-print';
import {getProduct, insertCart, getCart, deleteCart} from '../redux/action/product';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
    const [height, setHeight] = useState(window.innerHeight - 80)
    const [transInput, setTrans] = useState(false)
    const [sidBarBox, setBar] = useState(false)
    const [slideBack, setSlide] = useState(false)
    const [modal, setModals] = useState(true)
    const [modalCheckout, setModalsCheckout] = useState(true)
    const [qty, setQty] = useState({})
    const componentRef = useRef();
    const resize = () => {
        setHeight(window.innerHeight - 80)
    }
    const dataCart = useSelector(state => state.dataCart)
    const dataProduct = useSelector(state => state.dataProduct)
    const dispatch = useDispatch();

    const getAllCart = async () => {
        Axios.get("http://192.168.1.12:4000/getcart").then(resolve => {
            dispatch(getCart(resolve))

            // for set qty
            if (resolve.data.length > 0) {
                const con = {}
                resolve.data.forEach((x, i) => {
                    con[x.id_product] = 1
                })
                setQty(con)
            }
        })
    }

    // conver to rupiah
    const rupiah = (number)=>{
        var reverse = number.toString().split('').reverse().join(''),
        thousand = reverse.match(/\d{1,3}/g);
        thousand = thousand.join('.').split('').reverse().join('');
        return thousand;
    }

    const deleteCarts = (id_cart)=>{
        dispatch(deleteCart(id_cart))
        getAllCart()
    }

    const getAllProduct = async ()=>{
        await dispatch(getProduct());
    }

    const tickActive = (post)=>{
        if(dataCart.length > 0){
            dataCart.forEach(data=>{
                if(data.id_product !== post.id_product){
                    // console.log(post.id_product)
                    setQty({...qty, [post.id_product]: 1}) 
                    document.getElementById(post.id_product).setAttribute('style','display:block');
                    dispatch(insertCart(post))
                }else{
                    alert('Data ada')
                }
            })
        }else{
            dispatch(insertCart(post))
            document.getElementById(post.id_product).setAttribute('style','display:block');
            setQty({...qty, [post.id_product]: 1}) 
        }
        // console.log({...qty, [post.id_product]: 1})
    }

    const qtyCountPlus = (data)=>{
        setQty({...qty, [data.id_product]: qty[data.id_product] + 1})
    }
    const qtyCountMinus = (data)=>{
        if(qty[data.id_product] > 1){
            setQty({...qty, [data.id_product]: qty[data.id_product] - 1})
        }
    }

    useEffect(()=>{
        getAllCart()
        getAllProduct()
    }, [])
    class ComponentToPrint extends React.Component {
        render() {
          return (
            <div className="note-chackout">
                <h3 className="h3-checkout">Checkout</h3>
                    <p className="no-receipt">Receipt no: #010410919</p>
                    <p className="name-cashier">Cashier :  Pevita Pearce</p>
                    <table className="tabel-ckecout">
                        <tbody>
                            <tr>
                                <td>Coffee Latte 1x</td>
                                <td>Rp. 15.000</td>
                            </tr>
                            <tr>
                                <td>Ppn 10%</td>
                                <td>Rp. 10.500</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="total-price">Total : Rp. 115.500</p>
                    <p className="payment">Payment: Cash</p>
            </div>
          );
        }
      }

    return(
        <div className="bodyContent">
            <EventListener
          target="window"
          onResize={resize}
        />
            <div className="header">
                <img src={require('../asset/img/menu.png')} alt="" className="imgMenu" onClick={()=> setBar(sidBarBox ? false : true)} />
                <h1 className="titleList title">List Items</h1>
                <input type="text" placeholder="search" className={transInput ? 'inputSearch active' : 'inputSearch'} />
                <img className="imgSearch" onClick={()=> setTrans(transInput ? false : true)} src={require('../asset/img/search.png')} alt=""/>
                <div className="cartHeader">
                    <h1 className="title">Cart</h1>
                    <div className="elipse">{dataCart ? dataCart.length : 0}</div>
                </div>
            </div>
            <div className="sideBar" style={{height: height}}>
                <img onClick={()=>{console.log(dataCart)}} className="iconBar" src={require('../asset/img/spoon.png')} alt=""/>
                <img className="iconBar" src={require('../asset/img/catalog.png')} alt=""/>
                <img onClick={()=> setModals(modal ? false : true)} className="iconBar" src={require('../asset/img/add.png')} alt=""/>
            </div>
                <div onClick={()=> setBar(sidBarBox ? false : true)} className={sidBarBox ? 'backSide' : 'backSide slide'}></div>
            <div className={sidBarBox ? 'sidebarBox activeBar' : 'sidebarBox'}>
                <div className="boxMenu">
                    <img src={require('../asset/img/menu.png')} alt="" className="btnMenu" onClick={()=> setBar(sidBarBox ? false : true)} />
                    <h5 className="titleBtnMenu">Menu</h5>
                </div>
                <div className="boxIcon">
                    <img className="iconBarBox" src={require('../asset/img/spoon.png')} alt=""/>
                    <h5 className="titleIcon">Order</h5>
                </div>
                <div className="boxIcon">
                    <img className="iconBarBox" src={require('../asset/img/catalog.png')} alt=""/>
                    <h5 className="titleIcon">History</h5>
                </div>
                <div onClick={()=> setModals(modal ? false : true)} className="boxIcon">
                    <img className="iconBarBox" src={require('../asset/img/add.png')} alt=""/>
                    <h5 className="titleIcon">Add</h5>
                </div>
            </div>
            {
                dataCart.length !== 0 ?  
                <div className="cartBar" style={{height: height}}>
                    <div className="ContentCart">
                        {
                             dataCart.length > 0 ? (dataCart.map(post=>{
                                return(
                                    <div key={post.id_cart} className="listCart">
                                        <div className="boxDelete">
                                            <div onClick={()=>{deleteCarts(post.id_cart)}} className="deleteCart">X</div>
                                        </div>
                                        <img className="imgCartList" src={post.image} alt=""/>
                                        <h5 className="titleProductCart">{post.product_name}</h5>
                                        <div className="boxPrice">
                                            <div className="addqty">
                                                <div onClick={()=>{qtyCountMinus(post)}} className="plus">-</div>
                                                <span id={post.id_cart} className="qty">{qty[post.id_product]}</span>
                                                <div onClick={()=>{qtyCountPlus(post)}} className="minus">+</div>
                                            </div>
                                            <div className="pricelistcart">
                                                <p>Rp. {rupiah(post.price)}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })) : <p>Loading...</p>
                        }
                    </div>
                    <div className="btnCart">
                        <div className="boxTotalprice">
                            <h6 className="titleTotalprice">Total : <span className="totalPrice">Rp. 105.000</span></h6>
                        </div>
                        <p className="texPPN">* Belum termasuk PPN</p>
                        <button onClick={()=> setModalsCheckout(modalCheckout ? false : true) } type="button" className="btn btn-primary btn-lg btn-block">Checkout</button>
                        <button onClick={()=> setSlide(slideBack ? false : true)}  type="button" className="btn btn-secondary btn-lg btn-block">Cencel</button>
                    </div>
                </div> :
                <div className="cartBar" style={{height: height}}>
                    <img className="iconEmpty" src={require('../asset/img/food-and-restaurant.png')} alt=""/>
                    <h3>Your cart is empty</h3>
                    <p className="textCart">Please add some items from the menu</p>
                </div>
            }
            <div className="content cf">
                {
                    dataProduct.map(post=>{
                        return(
                            <div key={post.id_product} className="listContent">
                                <div id={post.id_product} className={slideBack ? "slideBack slideBackActive" : 'slideBack'}>
                                    <img className="tick" src={require('../asset/img/tick.png')} alt=""/>
                                </div>
                                <img onClick={()=> tickActive(post)} className="imgContent" src={post.image} alt=""/>
                                <p className="titleImg">{post.product_name}</p>
                                <p className="price">Rp. {rupiah(post.price)}</p>
                            </div> 
                        )
                    })
                }
            </div>
            <div 
            className={modal ? "modal" : "modals modalActive"}>
                <div className="box-modal">
                    <div className="content-modal">
                        <h3 className="titleAdd">Add Product</h3>
                        <div className="formInput">
                            <label className="labelInput">Email address</label>
                            <input type="email" className="form-control inputAdd" aria-describedby="emailHelp"></input>
                            <label className="labelInput">Email address</label>
                            <input type="email" className="form-control inputAdd" aria-describedby="emailHelp"></input>
                            <label className="labelInput">Email address</label>
                            <input type="email" className="form-control inputAdd" aria-describedby="emailHelp"></input>
                            <label className="labelInput">Email address</label>
                            <input type="email" className="form-control inputAdd" aria-describedby="emailHelp"></input>
                            
                            <div className="custom-file chooseFile">
                                <input type="file" className="custom-file-input" id="customFile"/>
                                <label className="custom-file-label">Choose file</label>
                            </div>
                            <button onClick={()=> setModals(modal ? false : true)}  type="button" className="btn btn-cancel-add">Cancel</button>
                            <button type="button" className="btn btn-ok-add">Add</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={modalCheckout ? "modal-checkout" : "modal-checkout modal-checkout-active"}>
                <div onClick={()=> setModalsCheckout(modalCheckout ? false : true)} className="overlay"></div>
                <div className="content-modal-checkout">
                    <div onClick={()=> setModalsCheckout(modalCheckout ? false : true)} className="close-modal-checkout">X</div>
                    <div className="box-content-checkout">
                        <ComponentToPrint ref={componentRef} />
                        <ReactToPrint
                                trigger={() => <button type="button" className="btn btn-checkout-print btn-lg btn-block">Print</button>}
                                content={() => componentRef.current}
                            />
                        <p>Or</p>
                        <button type="button" className="btn btn-checkout-send btn-lg btn-block">Send Email</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// const mapState = ({dataProduc})=>{
//     return(
//         dataProduc
//     );
// }

export default Home