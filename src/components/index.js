import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './Navbar';
import { MobilemenuLinks, SubMenu } from "./mobilemenu";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

    const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    `;
    const Navbar = () => {
      const SidebarNav = styled.nav`
      width: 250px;
      height: 100vh;
      display: flex;
      justify-content: center;
      position: fixed;
      top: 0;
      left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
      transition: 350ms;
      z-index: 10;
    `;

    const SidebarWrap = styled.div`
      width: 100%;
    `;
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <Nav>
       <Bars onClick={showSidebar}/>
        <NavMenu>
          <NavLink to='/about' activestyle="true">
            About
          </NavLink>
          <NavLink to='/blogs' activestyle="true">
            Blogs
          </NavLink>
          <NavLink to='/sign-up' activestyle="true">
            Sign Up
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>
        <NavBtn>
          <NavBtnLink to='/logout'>Logout</NavBtnLink>
        </NavBtn>
      </Nav>
      <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {MobilemenuLinks.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
    </>
  );
};

export default Navbar;
