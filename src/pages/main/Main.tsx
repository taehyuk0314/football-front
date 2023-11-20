import React from "react";
import { Link } from "react-router-dom";

export default class Main extends React.Component {
    render(): React.ReactNode {
        return(
            <>
                <Link to="/login">로그인</Link>
            </>
        )
    }
}