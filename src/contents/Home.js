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
                <h1 className="titleList">List Item</h1>
                <input type="text" className={transInput ? 'inputSearch active' : 'inputSearch'} />
                <img className="imgSearch" onClick={()=> setTrans(transInput ? false : true)} src={require('../asset/img/search.png')} alt=""/>
                <div className="cartHeader">
                    <h1>Cart</h1>
                </div>
            </div>
            <div className="sideBar" style={{height: height}}></div>
            
            <div className="cartBar"style={{height: height}}></div>
            <div className="content">
                <img src={require('../asset/img/wiener.png')} alt=""/>
            </div>
        </div>
    )
}

export default Home;