import React from 'react';
import Header from "./Header";
import Details from "./Details";
import Overview from "./Overview";
import Chart from "./Chart";
import { useEffect, useState, useContext } from "react";
import StockContext from "../context/StockContext";
import { fetchStockDetails, fetchQuote } from "../api/StockAPI"

function Dashboard(props) {
    const { stockSymbol } = useContext(StockContext);

    const [stockDetails, setStockDetails] = useState({});
    const [quote, setQuote] = React.useState({});

    useEffect(() => {
        async function updateStockDetails() {
            try{
                const result = await fetchStockDetails(stockSymbol);
                setStockDetails(result);
            } catch (error) {
                setStockDetails({});
                console.log(error);
            }
        }

        async function updateStockOverview() {
            try{
                const result = await fetchQuote(stockSymbol);
                setQuote(result);
            } catch (error) {
                setQuote({});
                console.log(error);
            }
        }
        updateStockDetails();
        updateStockOverview();
    }, [stockSymbol]);
    console.log(typeof quote.d)
    return (
        <div
            className="h-screen grid grid-cols-1 md:cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-jetbrainsmono">
            <div className = "col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
                <Header/>
            </div>
            <div className = "md:col-span-2 row-span-4">
                <Chart change={quote.d}/>
            </div>
            <div>

                    <Overview
                        name={stockDetails.name}
                        symbol={stockSymbol}
                        price={quote.pc}
                        change={quote.d}
                        changePercent={quote.dp}
                        currency={stockDetails.currency}>
                    </Overview>
            </div>
            <div className="row-span-2 xl:row-span-3">
                <Details details={stockDetails}></Details>
            </div>

        </div>
    );
}

export default Dashboard;