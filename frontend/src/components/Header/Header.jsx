import { NavLink } from "react-router-dom"
import './Header.module.scss'

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <div className="left px-2">
                    <NavLink className="navbar-brand" to='/'>দেয়াল</NavLink>
                </div>
                <div className="center">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item px-4">
                                <NavLink
                                    className="nav-link"
                                    activeClassName="active"
                                    to='/' exact
                                >Home</NavLink>
                            </li>
                            <li className="nav-item px-4">
                                <NavLink
                                    className="nav-link"
                                    activeClassName="active"
                                    to='/rules'
                                >Rules</NavLink>
                            </li>
                            <li className="nav-item px-4">
                                <NavLink
                                    className="nav-link"
                                    activeClassName="active"
                                    to='/about'
                                >About</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="right">
                    <button className="btn btn-primary px-3">লিখুন</button>
                </div>
            </div>
        </nav>
    )
}

export default Header
