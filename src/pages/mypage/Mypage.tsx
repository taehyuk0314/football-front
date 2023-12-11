import axios from "axios";
import React, { useEffect } from "react";

export default function Mypage() {
    useEffect(()=>{
        axios.get("/mypage").then((r)=>{
            console.log(r.data)
        })
    })
    return(
        <>
        </>
    )
}