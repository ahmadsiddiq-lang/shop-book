import React, {useState, useEffect} from 'react';
import EventListener from 'react-event-listener'
import './Home.css';

const Home = () => {
    const [height, setHeight] = useState(window.innerHeight - 80)
    const [transInput, setTrans] = useState(false)
    const resize = () => {
        setHeight(window.innerHeight - 80)
    }

    return(
        <div className="bodyContent">
            <EventListener
          target="window"
          onResize={resize}
        />
            <div className="header">
                <img src={require('../asset/img/menu.png')} alt="" className="imgMenu" />
                <h1 className="titleList title">List Items</h1>
                <input type="text" placeholder="search" className={transInput ? 'inputSearch active' : 'inputSearch'} />
                <img className="imgSearch" onClick={()=> setTrans(transInput ? false : true)} src={require('../asset/img/search.png')} alt=""/>
                <div className="cartHeader">
                    <h1 className="title">Cart</h1>
                    <div className="elipse">10</div>
                </div>
            </div>
            <div className="sideBar" style={{height: height}}>
                <img className="iconBar" src={require('../asset/img/spoon.png')} alt=""/>
                <img className="iconBar" src={require('../asset/img/catalog.png')} alt=""/>
                <img className="iconBar" src={require('../asset/img/add.png')} alt=""/>
            </div>
            
            <div className="cartBar" style={{height: height}}>
                <img className="iconEmpty" src={require('../asset/img/food-and-restaurant.png')} alt=""/>
                <h3>Your cart is empty</h3>
                <p className="textCart">Please add some items from the menu</p>
            </div>
            <div className="content">
                <img src={require('../asset/img/wiener.png')} alt=""/>
            </div>
        </div>
    )
}

export default Home;