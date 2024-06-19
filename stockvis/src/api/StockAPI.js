
import React from 'react';
const basePath = "https://finnhub.io/api/v1";


async function searchSymbol(query) {
    const url = `${basePath}/search?q=${query}&token=${process.env.REACT_APP_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}

async function fetchStockDetails(stockSymbol) {
    const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${process.env.REACT_APP_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}

async function fetchQuote(stockSymbol) {
    const url = `${basePath}/quote?symbol=${stockSymbol}&token=${process.env.REACT_APP_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}

async function fetchHistoricalData(stockSymbol, timeSeries, interval = '1min', outputSize = 'compact') {
    const baseUrl = 'https://www.alphavantage.co/query?';
    let url;

    if (timeSeries === 'TIME_SERIES_INTRADAY') {
        url = `${baseUrl}function=${timeSeries}&symbol=${stockSymbol}&interval=${interval}&outputsize=${outputSize}&apikey=${process.env.REACT_APP_HISTORICAL_KEY}`;
    } else {
        url = `${baseUrl}function=${timeSeries}&symbol=${stockSymbol}&outputsize=${outputSize}&apikey=${process.env.REACT_APP_HISTORICAL_KEY}`;
    }

    console.log('Fetching data from URL:', url);

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = await response.json();
    console.log('Fetched data:', data);

    if (timeSeries === 'TIME_SERIES_INTRADAY' && data[`Time Series (${interval})`]) {
        return data[`Time Series (${interval})`];
    } else if (timeSeries === 'TIME_SERIES_DAILY' && data["Time Series (Daily)"]) {
        return data["Time Series (Daily)"];
    } else if (timeSeries === 'TIME_SERIES_WEEKLY' && data["Weekly Time Series"]) {
        return data["Weekly Time Series"];
    } else if (timeSeries === 'TIME_SERIES_MONTHLY' && data["Monthly Time Series"]) {
        return data["Monthly Time Series"];
    } else {
        throw new Error('Unexpected API response format:' + timeSeries);
    }
}



export { searchSymbol, fetchStockDetails, fetchQuote, fetchHistoricalData };