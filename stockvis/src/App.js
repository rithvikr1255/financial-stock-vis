import './App.css';
import Dashboard from "./components/Dashboard";
import {useState} from "react";
import StockContext from "./context/StockContext";

function App() {
  const [stockSymbol, setStockSymbol] = useState("FB");
  return (
      <div style={{backgroundColor: "#011703"}}>
        <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
          <Dashboard/>
        </StockContext.Provider>
      </div>
  );
}

export default App;
