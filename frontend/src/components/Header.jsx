import { NavLink } from "react-router-dom"

const Header = () => {
    return (
        <header className="header">
            <div className="topbar py-2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 text-center text-md-start">All Rights Reserved &copy; 2021</div>
                        <div className="col-md-6 text-center text-md-end pe-0 pe-md-3">Crafted By Xayed</div>
                    </div>
                </div>
            </div>
            <nav className="navbar navbar-expand-md navbar-light">
                <div className="container">
                    <NavLink className="navbar-brand" to='/'>দেয়াল</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item px-md-4">
                                <NavLink
                                    className="nav-link"
                                    activeClassName="active"
                                    to='/' exact
                                >Home</NavLink>
                            </li>
                            <li className="nav-item px-md-4">
                                <NavLink
                                    className="nav-link"
                                    activeClassName="active"
                                    to='/rules'
                                >Rules</NavLink>
                            </li>
                            <li className="nav-item ps-md-4">
                                <NavLink
                                    className="nav-link"
                                    activeClassName="active"
                                    to='/about'
                                >About</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
