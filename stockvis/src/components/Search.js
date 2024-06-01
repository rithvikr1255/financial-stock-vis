import React from 'react';
import {mockSearchResults} from "../constants/mock";
import {XIcon, SearchIcon} from "@heroicons/react/solid"
import SearchResults from "./SearchResults";
function Search(props) {
    const [input, setInput] = React.useState('');
    const [bestMatches, setBestMatches] = React.useState(mockSearchResults.result);

    function clear() {
        setInput("");
        setBestMatches([]);
    }

    function updateBestMatches() {
        setBestMatches(mockSearchResults.result);
    }
    return (
        <div className={"relative z-50"}>
            <div className="flex items-center my-4 border-2 rounded-md relative z-50 w-96 bg-emerald-900 border-b-emerald-950">
                <input
                    type="text"
                    value={input}
                    className="w-full px-4 py-2 focus:outline-none rounded-md bg-emerald-900 text-white placeholder-emerald-400"
                    placeholder="Search stock"
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            updateBestMatches();
                        }
                    }}
                />

                {input && (<button onClick={() => clear()}>
                    <XIcon className="h-4 w-4 text-emerald-400 m-1" />
                </button>
                )}

                <button onClick={updateBestMatches} className={"h-8 w-8 bg-emerald-950 rounded-md flex justify-center items-center m-1 p-2"}>
                    <SearchIcon className="h-4 w-4 fill-emerald-400" />
                </button>
            </div>
            {input && bestMatches.length > 0 ? <SearchResults results={bestMatches}/> : null}
        </div>
    );
}

export default Search;