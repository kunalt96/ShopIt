import React, { useState } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const dispatch = useDispatch()
  const { userInfo } = userLogin
  const { userInfo: userDetails } = userUpdateProfile

  const logoutHandler = () => {
    console.log('i am called')
    dispatch(logout())
  }

  const toggle = () => setIsOpen(!isOpen)
  return (
    <header>
      <div>
        <Navbar color='dark' dark expand='lg'>
          <Container>
            <LinkContainer to='/'>
              <NavbarBrand>ShopIt</NavbarBrand>
            </LinkContainer>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className='ml-auto' navbar>
                <LinkContainer to='/cart'>
                  <NavLink>
                    <i className='fas fa-shopping-cart'></i> Cart
                  </NavLink>
                </LinkContainer>
                {userInfo ? (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      {userDetails ? userDetails.name : userInfo.name}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <LinkContainer to='/profile'>
                        <DropdownItem>Profile</DropdownItem>
                      </LinkContainer>

                      <DropdownItem onClick={logoutHandler}>
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ) : (
                  <LinkContainer to='/login'>
                    <NavLink href='#'>
                      <i className='fas fa-user'></i> Sign in
                    </NavLink>
                  </LinkContainer>
                )}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    </header>
  )
}

export default Header
