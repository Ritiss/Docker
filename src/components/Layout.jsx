import { Outlet } from "react-router-dom"
import Header from "./common/Header"
import Footer from "./common/Footer"

export const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}