import React from "react"
import ReactDOM from "react-dom/client"
import Header from "./Component/Header"
import Body from "./Component/Body"

function Githubprofile() {
    return (
        <>
            <Header />
            <Body />
        </>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<Githubprofile />)