import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import LabelBottomNavigation from "../components/LabelBottomNavigation";
import { MobileView } from "react-device-detect";

export default function LayoutMain() {
    
    return(
        <>
            <Header/>
            <Outlet/>
            <Footer/>
            <MobileView>
                <LabelBottomNavigation/>                  
            </MobileView>
        </>
    ) 
}