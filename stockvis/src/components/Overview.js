import React, { useEffect, useState } from 'react';
import Card from "./Card";
import { TrendingUpIcon, TrendingDownIcon } from "@heroicons/react/solid";
import { trainModel, makePrediction } from "../utils/model";
import './Overview.css';
import {fetchHistoricalData} from "../api/StockAPI"; // Import the new CSS file

function Overview({ name, symbol, price, change, changePercent, currency }) {
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const historicalData = await fetchHistoricalData(symbol, 'TIME_SERIES_MONTHLY');
                const model = await trainModel(historicalData);
                const lastClosePrice = parseFloat(Object.values(historicalData)[0]["4. close"]);
                const predictedPrice = makePrediction(model, lastClosePrice);
                setPrediction(predictedPrice);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [symbol]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Card>
            <span className={"absolute left-4 top-4 text-emerald-400 text-xl xl:text-2xl 2xl:text-3xl"}>
                {symbol} - {name}
            </span>
            <div className={"w-full h-full flex items-center justify-around mt-4"}>
                <span className={"text-lg text-neutral-50 xl:text-2xl 2xl:text-4xl flex items-center"}>
                    ${price}
                    <span className={"text-lg xl:text-2xl 2xl:text-2xl text-neutral-50 m-2"}>{currency}</span>
                </span>
                <span
                    className={`text-lg xl:text-xl 2xl:text-2xl flex items-center ${change >= 0 ? 'text-lime-500' : 'text-red-500'}`}>
                    {change >= 0 ? "+" : "-"}${typeof change === "number" ? change.toString().replace("-", "") : change}
                    <span
                        className={"text-md xl:text-lg 2xl:text-xl ml-1"}>({changePercent >= 0 ? "+" : "-"}{typeof changePercent === "number" ? changePercent.toString().replace("-", "") : changePercent})%</span>
                    <span className={"ml-1 w-5 h-5"}>{change >= 0 ? <TrendingUpIcon/> : <TrendingDownIcon/>}</span>
                </span>
                <h1 className={"ml-5 text-sm"}>
                    {prediction && (
                        <div className={`mt-4 prediction-text flex items-center`}>
                            Predicted Next Close: ${prediction.toFixed(2)}
                        </div>
                    )}
                </h1>
            </div>
        </Card>
    );
}

export default Overview;
