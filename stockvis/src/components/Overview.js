import React from 'react';
import Card from "./Card";
import {TrendingUpIcon, TrendingDownIcon} from "@heroicons/react/solid"


function Overview({ name, symbol, price, change, changePercent, currency }) {
    return (
        <Card>
            <span className={"absolute left-4 top-4 text-emerald-400 text-xl xl:text-2xl 2xl:text-3xl"}>
                { symbol } - { name }
            </span>
            <div className={"w-full h-full flex items-center justify-around mt-4"}>
                <span className={"text-lg text-neutral-50 xl:text-2xl 2xl:text-4xl flex items-center"}>
                    ${ price }
                    <span className={"text-lg xl:text-2xl 2xl:text-2xl text-neutral-50 m-2"}>{ currency }</span>
                </span>
                <span className={`text-lg xl:text-xl 2xl:text-2xl flex items-center ${change >= 0 ? 'text-lime-500' : 'text-red-500'}`}>
                    {change >= 0 ? "+" : "-"}${change.toString().replace("-","")}
                    <span className={"text-md xl:text-lg 2xl:text-xl ml-1"}>({changePercent >= 0 ? "+" : "-"}{changePercent.toString().replace("-","")})%</span>
                    <span className={"ml-1 w-5 h-5"}>{change >= 0 ? <TrendingUpIcon/> : <TrendingDownIcon/>}</span>
                </span>
            </div>
        </Card>
    );
}

export default Overview;