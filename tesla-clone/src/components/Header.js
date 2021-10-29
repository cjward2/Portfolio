import { useState } from 'react';
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { selectCars } from '../features/car/carSlice';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

const Header = () => {
    //Set state for side Menu
    const [burgerStatus, setBurgerStatus] =  useState(false);
    //Bring in Cars state from store
    const cars = useSelector(selectCars);

    return (
        <Container>
            <Link to="/" id="logo">
                
                <img src="/images/logo.svg" alt="Tesla Logo" />
            </Link>
            <Menu>
                {/* If cars exists, map through it */}
                { cars && cars.map((car, index) =>(
                    <Link to={`/detail/${index}`} key={ index } href="#">{ car }</Link>
               ))}
            </Menu>
            <RightMenu>
                <a href="#">Shop</a>
                <a href="#">Account</a>
                {/* Onclick, set state to true, which with CSS opens menu */}
                <CustomMenu onClick={() => setBurgerStatus(true)}></CustomMenu>
            </RightMenu>
            <BurgerNav show={ burgerStatus }>
                <CloseWrapper>
                    {/* Onclick, set state to false, which with CSS closes menu */}
                    <CustomClose onClick={ ()=> setBurgerStatus(false) } />
                </CloseWrapper>
                {/* Show cars in siude menu */}
                { cars && cars.map((car, index) =>(
                    <li key={ index }><Link to={`/detail/${index}`}>{ car }</Link></li>
               ))}
                <li><a href="#">Existing Inventory</a></li>
                <li><a href="#">Used Inventory</a></li>
                <li><a href="#">Trade-in</a></li>
                <li><a href="#">Cybertruck</a></li>
                <li><a href="#">Roadster</a></li>

            </BurgerNav>
        </Container>
    )
}

export default Header


const Container = styled.nav`
    min-height: 60px;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
`

const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    text-align: center;

    a {
        font-weight: 600;
        text-transform: uppercase;
        padding: 0 10px;
        flex-wrap: nowrap;
    }

    @media(max-width: 768px) {
        display: none;
    }
    
`

const RightMenu = styled.div`
    display: flex;
    align-items: center;
    a {
        font-weight: 600;
        text-transform: uppercase;
        margin-right: 10px;
        flex-wrap: nowrap;
    }
`

const CustomMenu = styled(MenuIcon)`
    cursor: pointer;

`

const BurgerNav = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    background: white;
    width: 300px;
    list-style: none;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    text-align: start;
    // passed down props to styled component to open or close nav menu
    transform: ${props => props.show ? `translateX(0)` : `translateX(100%)`};
    transition: transform 0.2s;

    li {
        padding: 15px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        a {
            font-weight: 600;
        }
    }
`

const CustomClose = styled(CloseIcon)`
    cursor: pointer;
`

const CloseWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`