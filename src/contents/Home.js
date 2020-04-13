import React, {useState, useEffect} from 'react';
import EventListener from 'react-event-listener'
import './Home.css';

const Home = () => {
    const [height, setHeight] = useState(window.innerHeight - 80)
    const [transInput, setTrans] = useState(false)
    const [sidBarBox, setBar] = useState(false)
    const [slideBack, setSlide] = useState(false)
    const [cart, setCart] = useState(0)
    const resize = () => {
        setHeight(window.innerHeight - 80)
    }

    const dataCart = () => {
        setCart(2)
    }

    useEffect(()=>{dataCart()})

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
                    <div className="elipse">{cart}</div>
                </div>
            </div>
            <div className="sideBar" style={{height: height}}>
                <img className="iconBar" src={require('../asset/img/spoon.png')} alt=""/>
                <img className="iconBar" src={require('../asset/img/catalog.png')} alt=""/>
                <img className="iconBar" src={require('../asset/img/add.png')} alt=""/>
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
                <div className="boxIcon">
                    <img className="iconBarBox" src={require('../asset/img/add.png')} alt=""/>
                    <h5 className="titleIcon">Add</h5>
                </div>
            </div>
            {
                cart ? 
                <div className="cartBar" style={{height: height}}>
                    <div className="ContentCart">
                        <div className="listCart">
                            <img className="imgCartList" src={require('../asset/img/theshackbook2.jpg')} alt=""/>
                            <h5 className="titleProductCart">Wiener Schnitzel</h5>
                            <div className="boxPrice">
                                <div className="addqty">
                                    <div className="plus">+</div>
                                    <span className="qty">1</span>
                                    <div className="minus">-</div>
                                </div>
                                <div className="pricelistcart">
                                    <p>Rp. 69.000</p>
                                </div>
                            </div>
                        </div>
                        <div className="listCart">
                        <img className="imgCartList" src={require('../asset/img/theshackbook2.jpg')} alt=""/>
                            <h5 className="titleProductCart">Wiener Schnitzel</h5>
                            <div className="boxPrice">
                                <div className="addqty">
                                    <div className="plus">+</div>
                                    <span className="qty">1</span>
                                    <div className="minus">-</div>
                                </div>
                                <div className="pricelistcart">
                                    <p>Rp. 69.000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btnCart">
                        <div className="boxTotalprice">
                            <h6 className="titleTotalprice">Total : <span className="totalPrice">Rp. 105.000</span></h6>
                        </div>
                        <p className="texPPN">* Belum termasuk PPN</p>
                        <button type="button" class="btn btn-primary btn-lg btn-block">Checkout</button>
                        <button onClick={()=> setSlide(slideBack ? false : true)}  type="button" class="btn btn-secondary btn-lg btn-block">Cencel</button>
                    </div>
                </div> :
                <div className="cartBar" style={{height: height}}>
                    <img className="iconEmpty" src={require('../asset/img/food-and-restaurant.png')} alt=""/>
                    <h3>Your cart is empty</h3>
                    <p className="textCart">Please add some items from the menu</p>
                </div>
            } 
            <div className="content">
                <div className="listContent">
                    <div className={slideBack ? "slideBack slideBackActive" : 'slideBack'}>
                        <img className="tick" src={require('../asset/img/tick.png')} alt=""/>
                    </div>
                    <img onClick={()=> setSlide(slideBack ? false : true)} className="imgContent" src={require('../asset/img/wiener.png')} alt=""/>
                    <p className="titleImg">Wiener Schnitzel</p>
                    <p className="price">Rp. 69.000</p>
                </div>  
                <div className="listContent">
                    <div className={slideBack ? "slideBack slideBackActive" : 'slideBack'}>
                        <img className="tick" src={require('../asset/img/tick.png')} alt=""/>
                    </div>
                    <img onClick={()=> setSlide(slideBack ? false : true)}  className="imgContent" src={require('../asset/img/unnamed.jpg')} alt=""/>
                    <p className="titleImg">Wiener Schnitzel</p>
                    <p className="price">Rp. 69.000</p>
                </div>  
                <div className="listContent">
                    <div className={slideBack ? "slideBack slideBackActive" : 'slideBack'}>
                        <img className="tick" src={require('../asset/img/tick.png')} alt=""/>
                    </div>
                    <img onClick={()=> setSlide(slideBack ? false : true)}  className="imgContent" src={require('../asset/img/wiener.png')} alt=""/>
                    <p className="titleImg">Wiener Schnitzel</p>
                    <p className="price">Rp. 69.000</p>
                </div>    
                <div className="listContent">
                    <div className={slideBack ? "slideBack slideBackActive" : 'slideBack'}>
                        <img className="tick" src={require('../asset/img/tick.png')} alt=""/>
                    </div>
                    <img onClick={()=> setSlide(slideBack ? false : true)}  className="imgContent" src={require('../asset/img/theshackbook2.jpg')} alt=""/>
                    <p className="titleImg">Wiener Schnitzel</p>
                    <p className="price">Rp. 69.000</p>
                </div>
                <div className="listContent">
                    <div className={slideBack ? "slideBack slideBackActive" : 'slideBack'}>
                        <img className="tick" src={require('../asset/img/tick.png')} alt=""/>
                    </div>
                    <img onClick={()=> setSlide(slideBack ? false : true)}  className="imgContent" src={require('../asset/img/wiener.png')} alt=""/>
                    <p className="titleImg">Wiener Schnitzel</p>
                    <p className="price">Rp. 69.000</p>
                </div>
            </div>
        </div>
    )
}

export default Home;