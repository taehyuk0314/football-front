import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import LabelBottomNavigation from "../components/LabelBottomNavigation";

export default class LayoutMain extends React.Component {
    render(): React.ReactNode {
        return(
            <>
                <Header/>
                <Outlet/>
                <Footer/>
                <LabelBottomNavigation/>                  
            </>
        ) 
    }
}