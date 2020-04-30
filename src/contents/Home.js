/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import EventListener from 'react-event-listener';
import './Home.css';
import Axios from 'axios';
import ReactToPrint from 'react-to-print';
import {getProduct, insertCart, getCart, deleteCart} from '../redux/action/product';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
require('dotenv').config()

const Home = () => {
    const BASE_URL = 'http://192.168.1.12:4000';
    const [height, setHeight] = useState(window.innerHeight - 80)
    const [transInput, setTrans] = useState(false)
    const [sidBarBox, setBar] = useState(false)
    const [modal, setModals] = useState(true)
    const [modalCheckout, setModalsCheckout] = useState(true)
    const [qty, setQty] = useState({});
    const [cart, setCart] = useState({});
    const [totalPrice, setTotal] = useState(0);
    const [dataIdCart, setIdCart] = useState({})
    const componentRef = useRef();
    const history = useHistory();
    const resize = () => {
        setHeight(window.innerHeight - 80)
    }
    const dataCart = useSelector(state => state.dataCart)
    const dataProduct = useSelector(state => state.dataProduct)
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id_cart) => {
        setIdCart(id_cart)
        setShow(true);}

    const getAllCart = async () => {
        Axios.get(BASE_URL+"/getcart").then(resolve => {
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

    const deleteCarts = ()=>{
        dispatch(deleteCart(dataIdCart))
        handleClose()
        history.push('/')
    }

    const handleCancel = async()=>{
        Axios.delete(BASE_URL+('/deleteall/cart'))
        .then(res=>{
            history.push('/')
        }).catch(err=>console.log(err))
    }

    const getAllProduct = async ()=>{
        await dispatch(getProduct());
    }

    const totals = ()=>{
        if(dataCart.length > 0){
            let total = 0
            dataCart.forEach(data=>{
                const x = data.price * qty[data.id_product]
                total += x
            })
            if(total > 0){
                setTotal(total)
            }
        }
    }

    const tickActive = (post)=>{
        if(dataCart.length > 0){
            let status = false
            dataCart.forEach(data=>{
                if(data.id_product === post.id_product){
                    status = true
                }
            })
            if(status === false){
                setQty({...qty, [post.id_product]: 1}) 
                document.getElementById(post.id_product).setAttribute('style','display:block');
                dispatch(insertCart(post))
            }else{
                alert('data sudah ada')
            }
        }else{
            dispatch(insertCart(post))
            document.getElementById(post.id_product).setAttribute('style','display:block');
            setQty({...qty, [post.id_product]: 1}) 
        }
    }

    const qtyCountPlus = (data)=>{
        setQty({...qty, [data.id_product]: qty[data.id_product] + 1})
        const datax = {...cart,[data.id_product]:[data.price] * (qty[data.id_product]+1)}
        setCart(datax)
    }
    const qtyCountMinus = (data)=>{
        if(qty[data.id_product] > 1){
            setQty({...qty, [data.id_product]: qty[data.id_product] - 1})
            const datax = {...cart,[data.id_product]:[data.price] * (qty[data.id_product]-1)}
            setCart(datax)
        }
    }
    const handelPpn = (number)=>{
        const fix = 10 * number / 100
        return fix;
    }

    useEffect(()=>{totals()})

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
                            <tr className="theader">
                                <td>Product Name</td>
                                <td>Count</td>
                                <td>Price</td>
                            </tr>
                            {
                                dataCart.map(post=>{
                                    return(
                                        <tr>
                                            <td>{post.product_name}</td>
                                            <td>{qty[post.id_product]}X</td>
                                            <td>Rp. {rupiah(cart[post.id_product] > post.price ? cart[post.id_product] : post.price)}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <p className="ppn">Ppn 10% : Rp. {handelPpn(totalPrice)}</p>
                    <p className="total-price">Total : Rp. {rupiah(totalPrice + handelPpn(totalPrice))}</p>
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
                dataCart.length > 0 ?  
                <div className="cartBar" style={{height: height}}>
                    <div className="ContentCart">
                        {
                             dataCart.length > 0 ? (dataCart.map(post=>{
                                return(
                                    <div key={post.id_cart} className="listCart">
                                        <div className="boxDelete">
                                            <div onClick={()=>{handleShow(post.id_cart)}} className="deleteCart">X</div>
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
                                                <p>Rp. {rupiah(cart[post.id_product] > post.price ? cart[post.id_product] : post.price)}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })) : false
                        }
                    </div>
                    <div className="btnCart">
                        <div className="boxTotalprice">
                            <h6 className="titleTotalprice">Total : <span className="totalPrice">Rp. {rupiah(totalPrice)}</span></h6>
                        </div>
                        <p className="texPPN">* Belum termasuk PPN</p>
                        <button onClick={()=> setModalsCheckout(modalCheckout ? false : true) } type="button" className="btn btn-primary btn-lg btn-block">Checkout</button>
                        <button onClick={()=> handleCancel()}  type="button" className="btn btn-secondary btn-lg btn-block">Cencel</button>
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
                                <div id={post.id_product} className={'slideBack'}>
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>DELETE</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this ?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cencel
                </Button>
                <Button variant="primary" onClick={()=>deleteCarts()}>
                    Ok
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Home;