import React from 'react';
import {mockCompanyProfile} from "../constants/mock";
import Search from "./Search";

function Header({ name }) {
    return (
        <div className={"xl:px-32"}>
            <h1 className={"text-5xl text-emerald-400"}>{mockCompanyProfile.name}</h1>
            <Search/>
        </div>
    );
}

export default Header;