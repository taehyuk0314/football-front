import axios from "axios";
import React from "react";

export default class Mypage extends React.Component<any,any> {
    componentDidMount(): void {
        axios.get("/mypage").then((r)=>{
            console.log(r.data)
        })
    }
    render(): React.ReactNode {
        return(
            <>
            
            </>
        )
    }
}