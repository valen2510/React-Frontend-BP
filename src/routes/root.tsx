import { Outlet } from "react-router-dom"
import { Header } from "components/Header/header"

export const Root = () => {
    return (
        <>
            <Header/>
            <main className="container">
                <Outlet />
            </main>
        </>
    )
}