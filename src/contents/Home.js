/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import EventListener from 'react-event-listener';
import './Home.css';
import Axios from 'axios';
import ReactToPrint from 'react-to-print';
import {getProduct, insertCart, getCart, deleteCart, searchData} from '../redux/action/product';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import { Line } from 'react-chartjs-2';
require('dotenv').config()

const Home = () => {
    const BASE_URL = 'http://192.168.1.12:4000';
    const [height, setHeight] = useState(window.innerHeight - 80)
    const [showContent, setShowContent] = useState(true)
    const [transInput, setTrans] = useState(false)
    const [sidBarBox, setBar] = useState(false)
    const [modal, setModals] = useState(true)
    const [modalCheckout, setModalsCheckout] = useState(false)
    const [qty, setQty] = useState({});
    const [cart, setCart] = useState({});
    const [totalPrice, setTotal] = useState(0);
    const [product, setProduct] = useState('')
    const [dataIdCart, setIdCart] = useState({})
    const [dataIdProduct, setIdProduct] = useState({})
    const [dataSearch, setDataSearch] = useState('')
    const [dataIncomeDay, setIncomeDay] = useState('')
    const [dataIncomeYear, setIncomeYear] = useState('')
    const [dataOrderTotal, setOrderTotal] = useState('')
    const [dataPersenDay, setPersenDay] = useState('')
    const [dataPersenLstWeek, setPersenLastWeek] = useState('')
    const [dataPersenYear, setPersenYear] = useState('')
    const [dataAwal, setAwal] = useState('')
    const [dataAkhir, setAkhir] = useState('')
    const [dataOrderAwal, setOrderAwal] = useState('')
    const [dataOrderAkhir, setOrderAkhir] = useState('')
    const [dataYearAwal, setYearAwal] = useState('')
    const [dataYearAkhir, setYearAkhir] = useState('')
    const componentRef = useRef();
    const history = useHistory();
    const resize = () => {
        setHeight(window.innerHeight - 80)
    }
    const dataCart = useSelector(state => state.dataCart)
    const dataProduct = useSelector(state => state.dataProduct)
    const dispatch = useDispatch();

    const [showCheckout, setShowCheckout] = useState(false);
    const handleCloseCheckout = () => setShowCheckout(false);
    const handleShowCheckout = () => setShowCheckout(true);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id_cart) => {
        setIdCart(id_cart)
        setShow(true);}
    const [showDeleteProduct, setShowDeleteProduct] = useState(false);
    const handleCloseDeleteProduct = () => setShowDeleteProduct(false);
    const handleShowDeleteProduct = (id_cart) => {
        setIdProduct(id_cart)
        setShowDeleteProduct(true);}

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
        if(post.stock > 0){
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
        }else{
            alert('Stock Habis')
        }
    }

    const qtyCountPlus = (data)=>{
        const maxinput = qty[data.id_product] + 1
        if(maxinput <= data.stock){
            setQty({...qty, [data.id_product]: qty[data.id_product] + 1})
            const datax = {...cart,[data.id_product]:[data.price] * (qty[data.id_product]+1)}
            setCart(datax)
        }else{
            alert('Stock tidak cukup')
        }
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

    const handleInput =(e)=>{
        let formProductNew={...product};
        if(e.target.name==='image'){
            formProductNew[e.target.name]=e.target.files[0];
        }else{
            formProductNew[e.target.name]=e.target.value;
        }
        setProduct(formProductNew)
        // console.log(formProductNew)
    }

    const inputProduct =()=>{
        // console.log(product)
        if(product.product_name.length > 0 && product.description.length > 0 && product.category.length > 0 && product.price.length > 0 && product.stock.length > 0){
            const data = new FormData();
            data.append('image', product.image)
            data.set('product_name', product.product_name)
            data.set('description', product.description)
            data.set('category', product.category)
            data.set('price', product.price)
            data.set('stock', product.stock)
    
            Axios.post(BASE_URL+'/insert', data)
            .then(res=>{
                alert('Success...!')
                history.push('/')
            }).catch(err=>console.log(err))
        }else{
            alert('Form empty')
        }
    }   

    const checkout =()=>{
        setModalsCheckout(modalCheckout ? false : true)
        dataCart.forEach(data=>{
            const input = {
                id_product: data.id_product,
                qty: qty[data.id_product]
            }
            Axios.patch(BASE_URL+'/update/stock',input)
            .then(res=>{
                // console.log(res)
                handleCloseCheckout()
            }).catch(err=>console.log(err))
        })
        const dataPriceTotal = {total_price:totalPrice}
        Axios.post(BASE_URL+'/order',dataPriceTotal)
        .then(res=>{

        }).catch(err=>console.log(err))
    }

    const closeCheckOut = ()=>{
        setModalsCheckout(true)
        handleCancel()
    }

    const handleSearch = async(e)=>{
        if(e.key === 'Enter'){
            console.log(dataSearch)
            dispatch(searchData(dataSearch))
        }
    }

    const getIncomInday = ()=>{
        let date_ob = new Date();
        let date_day = date_ob.getFullYear() + "-" + ("0" + (date_ob.getMonth() + 1)).slice(-2) + "-" + ("0" + date_ob.getDate()).slice(-2)
        let date = {
            date:date_day
        }
        // console.log(date);
        Axios.post(BASE_URL+'/income/day', date)
        .then(res=>{
            setIncomeDay(rupiah(res.data[0].total.toString()))
            // console.log(res.data[0].total)
        })
        .catch(err=>console.log(err))
    }

    const getIncomIndayPersen = ()=>{
        let date_ob = new Date();
        let date_day = date_ob.getFullYear() + "-" + ("0" + (date_ob.getMonth() + 1)).slice(-2) + "-" + ("0" + date_ob.getDate()).slice(-2)
        let dates = {
            date:date_day
        }

        function getLastWeek() {
            var today = new Date();
            var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
            return lastWeek;
          }
        let lastWeeks = getLastWeek();
        let lastweekDisplay = lastWeeks.getFullYear().toString() +'-'+ ("0" + (lastWeeks.getMonth() + 1)).slice(-2) +'-'+ ("0" + lastWeeks.getDate()).slice(-2)

        let date = {
            date: lastweekDisplay
        }

        Axios.post(BASE_URL+'/income/day', date)
        .then(resAwal=>{
            if(resAwal.data[0].total !== null){
                Axios.post(BASE_URL+'/income/day', dates)
                .then(resAkhir=>{
                    // setAkhir(res.data[0].total)
                    const dataAkhirs = resAkhir.data[0].total
                    const dataAwals = resAwal.data[0].total
                    setAwal(dataAwals);
                    setAkhir(dataAkhirs)
                    // console.log(dataAkhirs)
                    if(dataAkhirs > dataAwals){
                        let persen = (dataAkhirs - dataAwals) / dataAwals * 100
                        setPersenDay(Math.floor(persen))
                    }else{
                        let persen = (dataAwals - dataAkhirs) / dataAwals * 100
                        setPersenDay(Math.floor(persen))
                    }
                })
                .catch(err=>console.log(err))
            }
        })
        .catch(err=>console.log(err))
    }


    const getOrderInday = ()=>{
        // hari ini
        let date_ob = new Date();
        let date_day = date_ob.getFullYear() + "-" + ("0" + (date_ob.getMonth() + 1)).slice(-2) + "-" + ("0" + date_ob.getDate()).slice(-2)

        // 1 minggu lalu
        function getLastWeek() {
            let today = new Date();
            let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
            return lastWeek;
          }
        let lastWeeks = getLastWeek();
        let lastweekDisplay = lastWeeks.getFullYear().toString() +'-'+ ("0" + (lastWeeks.getMonth() + 1)).slice(-2) +'-'+ ("0" + lastWeeks.getDate()).slice(-2)

        // dua minggu lalu
        function getLastWeeks() {
            let today = new Date();
            let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14);
            return lastWeek;
          }
        let lastWeekss = getLastWeeks();
        let lastweekDisplays = lastWeekss.getFullYear().toString() +'-'+ ("0" + (lastWeekss.getMonth() + 1)).slice(-2) +'-'+ ("0" + lastWeekss.getDate()).slice(-2)
        
        // data akhir
        let date = {
            lastweek: lastweekDisplay,
            newdate:date_day
        }

        // data awal
        let dateAkhirs = {
            lastweek: lastweekDisplays,
            newdate:lastweekDisplay
        }
        Axios.post(BASE_URL+'/orders/total', date)
        .then(resAkhir=>{
            // console.log(res);
            setOrderTotal(rupiah(resAkhir.data[0].orders.toString()))
            Axios.post(BASE_URL+'/orders/total', dateAkhirs)
            .then(resAwal=>{
                const dataAkhir = resAkhir.data[0].orders
                const dataAwal = resAwal.data[0].orders
                setOrderAwal(dataAwal);
                setOrderAkhir(dataAkhir)
                if(dataAwal === 0){
                    setPersenLastWeek(0)
                }else if(dataAkhir > dataAwal){
                    let persen = (dataAkhir - dataAwal) / dataAwal * 100
                    setPersenLastWeek(Math.floor(persen))
                }else{
                    let persen = (dataAwal - dataAkhir) / dataAwal * 100
                    setPersenLastWeek(Math.floor(persen))
                }
            })
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
    }


    const getIncomInYear = ()=>{
        // tahun akhir
        let date_ob = new Date();
        let date_day = date_ob.getFullYear()
        let date = {
            year:date_day
        }

        // tahun awal
        let dateLastYear = date_ob.getFullYear()-1
        // console.log(dateLastYear);
        Axios.post(BASE_URL+'/income/year', date)
        .then(resAkhir=>{
            setIncomeYear(rupiah(resAkhir.data[0].total.toString()))
            let dates = {
                year:dateLastYear
            }
            // console.log(dates)
            Axios.post(BASE_URL+'/income/year', dates)
            .then(resAwal=>{
                // console.log('ini res awal '+resAwal.data[0].total)

                const dataAwal = resAwal.data[0].total
                const dataAkhir = resAkhir.data[0].total
                setYearAwal(dataAwal);
                setYearAkhir(dataAkhir);
                if(dataAkhir > dataAwal){
                    let persen = (dataAkhir - dataAwal) / dataAwal * 100
                    setPersenYear(Math.floor(persen))
                }else{
                    let persen = (dataAwal - dataAkhir) / dataAwal * 100
                    setPersenYear(Math.floor(persen))
                }
            })
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
    }

    const deleteProduct = () =>{
        Axios.delete(BASE_URL+`/delete/${dataIdProduct}`)
        .then(res=>{
            alert('Delete Success !');
            handleCloseDeleteProduct();
            history.push('/');
        }).catch(err=>console.log(err))
    }

    const dataChart = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "This Month",
                // backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45],
            },
            {   
                label: "Last Month",
                // backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(43, 43, 238)',
                data: [0, 10, 2, 10, 10, 20, 35],
            }
        ]
    }
    

    useEffect(()=>{totals()})

    useEffect(()=>{
        getAllCart()
        getAllProduct()
        getIncomInday()
        getOrderInday()
        getIncomInYear()
        getIncomIndayPersen()
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
                                dataCart.length > 0 ? (dataCart.map(post=>{
                                    return(
                                        <tr key={post.id_product}>
                                            <td>{post.product_name}</td>
                                            <td>{qty[post.id_product]}X</td>
                                            <td>Rp. {rupiah(cart[post.id_product] > post.price ? cart[post.id_product] : post.price)}</td>
                                        </tr>
                                    )
                                })):false
                            }
                        </tbody>
                    </table>
                    <p className="ppn">Ppn 10% : Rp. {rupiah(handelPpn(totalPrice))}</p>
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
                {
                    showContent ? <h1 className="titleList title">List Items</h1> : <h1 className="titleList title">History</h1>
                }
                <input onKeyDown={handleSearch} onChange={(e)=>setDataSearch(e.target.value)} type="text" placeholder="search" className={transInput ? 'inputSearch active' : 'inputSearch'} />
                <img className="imgSearch" onClick={()=> setTrans(transInput ? false : true)} src={require('../asset/img/search.png')} alt=""/>
                <div className="cartHeader">
                    <h1 className="title">Cart</h1>
                    <div className="elipse">{dataCart ? dataCart.length : 0}</div>
                </div>
            </div>
            <div className="sideBar" style={{height: height}}>
                <img onClick={()=>setShowContent(true)} className="iconBar" src={require('../asset/img/spoon.png')} alt=""/>
                <img onClick={()=>setShowContent(false)} className="iconBar" src={require('../asset/img/catalog.png')} alt=""/>
                <img onClick={()=> setModals(modal ? false : true)} className="iconBar" src={require('../asset/img/add.png')} alt=""/>
            </div>
                <div onClick={()=> setBar(sidBarBox ? false : true)} className={sidBarBox ? 'backSide' : 'backSide slide'}></div>
            <div className={sidBarBox ? 'sidebarBox activeBar' : 'sidebarBox'}>
                <div className="boxMenu">
                    <img src={require('../asset/img/menu.png')} alt="" className="btnMenu" onClick={()=> setBar(sidBarBox ? false : true)} />
                    <h5 className="titleBtnMenu">Menu</h5>
                </div>
                <div onClick={()=>setShowContent(true)} className="boxIcon">
                    <img className="iconBarBox" src={require('../asset/img/spoon.png')} alt=""/>
                    <h5 className="titleIcon">Order</h5>
                </div>
                <div onClick={()=>setShowContent(false)} className="boxIcon">
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
                        <button onClick={handleShowCheckout} type="button" className="btn btn-primary btn-lg btn-block">Checkout</button>
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
                    showContent ?
                
                   (dataProduct.length > 0 ? (dataProduct.map(post=>{
                        return(
                            <div key={post.id_product} className="listContent">
                                <div onClick={()=> handleShowDeleteProduct(post.id_product)} className="Delete-Card">X</div>
                                <div id={post.id_product} className={'slideBack'}>
                                    <img className="tick" src={require('../asset/img/tick.png')} alt=""/>
                                </div>
                                <img onClick={()=> tickActive(post)} className="imgContent" src={post.image} alt=""/>
                                <p className="titleImg">{post.product_name}</p>
                                <p className="price">Rp. {rupiah(post.price)}</p>
                            </div> 
                        )
                    })): 
                        (<div className="box-empty">
                            <h3 className="product-empty">Product Empty</h3>
                        </div> )
                ):(
                    <>
                        <div className="box-day">
                            <div className="content-card">
                                <p>Today’s Income</p>
                                <h4>Rp. {dataIncomeDay ? dataIncomeDay : 0}</h4>
                                {
                                    dataAwal < dataAkhir ? <p>+{dataPersenDay}% Yesterday</p> : dataAwal > dataAkhir ? <p>-{dataPersenDay}% Yesterday</p> : <p>0% Yesterday</p>
                                }
                                
                            </div>
                        </div>
                        <div className="box-mon">
                            <div className="content-card">
                                <p>Orders</p>
                                <h4>{dataOrderTotal ? dataOrderTotal : 0}</h4>
                                {
                                    dataOrderAwal < dataOrderAkhir ? <p>+{dataPersenLstWeek}% Last Week</p> : dataOrderAwal > dataOrderAkhir ? <p>-{dataPersenLstWeek}% Last Week</p> : <p>0% Last Week</p>
                                }
                            </div>
                        </div>
                        <div className="box-year">
                            <div className="content-card">
                                <p>This Year’s Income</p>
                                <h4>Rp. {dataIncomeYear ? dataIncomeYear : 0}</h4>
                                {
                                    dataYearAwal < dataYearAkhir ? <p>+{dataPersenYear}% Last Year</p> : dataYearAwal > dataYearAkhir ? <p>-{dataPersenYear}% Last Year</p> : <p>0% Last Year</p>
                                }
                            </div>
                        </div>
                        <div className="chart">
                            <h4 className="lable-chart">Revenue</h4>
                            < Line
                                data={dataChart}
                                options={{}}
                                height={222}
                                width={700}
                            />
                        </div>
                    </>
                )
            }
            </div>
            <div 
            className={modal ? "modal" : "modals modalActive"}>
                <div className="box-modal">
                    <div className="content-modal">
                        <h3 className="titleAdd">Add Product</h3>
                        <div className="formInput">
                            <label className="labelInput">Product Name</label>
                            <input name="product_name" onChange={handleInput} type="text" className="form-control inputAdd" aria-describedby="emailHelp"></input>
                            <label className="labelInput">Description</label>
                            <input name="description" onChange={handleInput} type="text" className="form-control inputAdd" aria-describedby="emailHelp"></input>
                            <label className="labelInput">Category</label>
                            <select name="category" onChange={handleInput} className="form-control" id="exampleFormControlSelect1">
                                <option>Select</option>
                                <option value="Book">Book</option>
                                <option value="Pakaian">Pakaian</option>
                                <option value="Elektronik">Elektronik</option>
                                <option value="Kendaraan">Kendaraan</option>
                            </select>
                            <label className="labelInput">Price</label>
                            <input name="price" onChange={handleInput} type="number" className="form-control inputAdd" aria-describedby="emailHelp"></input>
                            <label className="labelInput">Stock</label>
                            <input name="stock" onChange={handleInput} type="number" className="form-control inputAdd" aria-describedby="emailHelp"></input>
                            <div className="custom-file chooseFile">
                                <input name="image" onChange={handleInput} type="file" className="custom-file-input" id="customFile"/>
                                <label className="custom-file-label">Choose file</label>
                            </div>
                            <button onClick={()=> setModals(modal ? false : true)}  type="button" className="btn btn-cancel-add">Cancel</button>
                            <button onClick={()=>inputProduct()} type="button" className="btn btn-ok-add">Add</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={modalCheckout ? "modal-checkout modal-checkout-active" : "modal-checkout"}>
                <div onClick={()=> closeCheckOut()} className="overlay"></div>
                <div className="content-modal-checkout">
                    <div onClick={()=> closeCheckOut()} className="close-modal-checkout">X</div>
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

            {/* modal delete */}
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

            {/* modal delete Prodcut */}
            <Modal show={showDeleteProduct} onHide={handleCloseDeleteProduct}>
                <Modal.Header closeButton>
                <Modal.Title>DELETE</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this ?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDeleteProduct}>
                    Cencel
                </Button>
                <Button variant="primary" onClick={()=>deleteProduct()}>
                    Ok
                </Button>
                </Modal.Footer>
            </Modal>

            {/* modal confirm checkout */}
            <Modal show={showCheckout} onHide={handleCloseCheckout}>
                <Modal.Header closeButton>
                <Modal.Title>Checkout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure ?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseCheckout}>
                    Cencel
                </Button>
                <Button variant="primary" onClick={()=> checkout()}>
                    Ok
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Home;