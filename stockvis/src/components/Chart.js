import React, { useState, useEffect, useContext } from 'react';
import { convertUnixTimestampToDate, createDate, convertDatetoUnix } from "../helpers/date-helper";
import Card from "./Card";
import { AreaChart, ResponsiveContainer, Area, Tooltip, XAxis, YAxis } from 'recharts';
import { chartConfig } from "../constants/config";
import ChartFilter from "./ChartFilter";
import { fetchHistoricalData } from "../api/StockAPI";  // Update this import to your new API
import StockContext from "../context/StockContext";

function Chart(change) {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("1D");
    const themeColor = change.change >= 0 ? "#12d417" : "#f04444";
    const { stockSymbol } = useContext(StockContext);

    useEffect(() => {
        function getDateRange() {
            const { days, weeks, months, years } = chartConfig[filter];
            const endDate = new Date();
            const startDate = createDate(endDate, -days, -weeks, -months, -years);
            return { startDate, endDate };
        }

        function getTimeSeries() {
            switch (filter) {
                case '1D':
                    return { series: 'TIME_SERIES_INTRADAY', interval: '15min' }; // Intraday with 15min intervals for 1D
                case '1W':
                    return { series: 'TIME_SERIES_DAILY', interval: '' }; // Daily for 1 week
                case '1M':
                    return { series: 'TIME_SERIES_DAILY', interval: '' }; // Daily for 1 month
                case '1Y':
                    return { series: 'TIME_SERIES_WEEKLY', interval: '' }; // Weekly for 1 year
                default:
                    return { series: 'TIME_SERIES_DAILY', interval: '' };
            }
        }

        async function updateChartData() {
            try {
                const { startDate, endDate } = getDateRange();
                const { series, interval } = getTimeSeries();
                const outputSize = filter === '1D' ? 'compact' : 'full';
                const result = await fetchHistoricalData(stockSymbol, series, interval, outputSize);
                console.log('Raw result:', result);
                if (result) {
                    const filteredData = filterDataByDate(result, startDate, endDate);
                    console.log('Filtered data:', filteredData);
                    setData(formatData(filteredData));
                } else {
                    setData([]);
                }
            } catch (error) {
                setData([]);
                console.error(error);
            }
        }

        updateChartData();
    }, [stockSymbol, filter]);

    function filterDataByDate(data, startDate, endDate) {
        if (!data) return [];
        const filtered = {};
        Object.keys(data).forEach(date => {
            const dataDate = new Date(date);
            if (dataDate >= startDate && dataDate <= endDate) {
                filtered[date] = data[date];
            }
        });
        return filtered;
    }

    function formatData(data) {
        if (!data) return [];
        return Object.keys(data).map(date => {
            return {
                value: parseFloat(data[date]["4. close"]).toFixed(2),
                date: date,
            };
        }).reverse();
    }

    return (
        <Card>
            <ul className={"flex absolute top-2 right-2 z-40"}>
                {Object.keys(chartConfig).map((item) => {
                    return (
                        <li key={item}>
                            <ChartFilter text={item}
                                         active={filter === item}
                                         onClick={() => { setFilter(item) }}
                                         change={change}
                            />
                        </li>
                    )
                })}
            </ul>
            <ResponsiveContainer>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={themeColor} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={themeColor} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke={themeColor} fillOpacity={1} strokeWidth={0.5}
                          fill={"url(#chartColor)"} />
                    <Tooltip />
                    <XAxis dataKey={"date"} />
                    <YAxis domain={["dataMin", "dataMax"]} />
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    );
}

export default Chart;
