import React from 'react';
import {mockCompanyProfile} from "../constants/mock";
import Search from "./Search";

function Header() {
    return (
        <div className={"xl:px-32"}>
            <h1 className={"text-5xl text-emerald-400"}>Stock Vis</h1>
            <Search/>
        </div>
    );
}

export default Header;