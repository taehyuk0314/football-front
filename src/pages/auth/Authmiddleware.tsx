import React from "react"
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"

const Authmiddleware = (props: any) => {
  const state = useSelector((state: any) => state);
  console.log(state)
  if (!state.user || !state.user.memNo) {
    return <Navigate to={{ pathname: "/login" }} />
  }
  return <React.Fragment>{props.children}</React.Fragment>
}

export default Authmiddleware