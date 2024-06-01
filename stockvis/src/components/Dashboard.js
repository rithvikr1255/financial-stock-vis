import React from 'react';
import Card from './Card';
import Header from "./Header";
import {mockCompanyProfile} from "../constants/mock";
import Details from "./Details";
function Dashboard(props) {
    return (
        <div
            className="h-screen grid grid-cols-1 md:cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-jetbrainsmono">
            <div className = "col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
                <Header name = {mockCompanyProfile.name}/>
            </div>
            <div className = "md:col-span-2 row-span-4">
                <Card>
                    <h1 className={"text-emerald-400"}>Chart</h1>
                </Card>
            </div>
            <div>
                <Card>
                    <h1 className={"text-emerald-400"}>Overview</h1>
                </Card>
            </div>
            <div className="row-span-2 xl:row-span-3">
                <Details details={mockCompanyProfile}></Details>
            </div>

        </div>
    );
}

export default Dashboard;