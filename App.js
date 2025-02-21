// App.js
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [filter, setFilter] = useState([]);

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(input);
            const res = await axios.post('https://your-backend-url/bfhl', parsedInput);
            setResponse(res.data);
        } catch (error) {
            alert('Invalid JSON or request failed');
        }
    };

    const renderResponse = () => {
        if (!response) return null;

        return (
            <div>
                {filter.includes('Numbers') && <p>Numbers: {response.numbers.join(', ')}</p>}
                {filter.includes('Alphabets') && <p>Alphabets: {response.alphabets.join(', ')}</p>}
                {filter.includes('Highest Alphabet') && <p>Highest Alphabet: {response.highest_alphabet.join(', ')}</p>}
            </div>
        );
    };

    return (
        <div>
            <h1>BFHL Frontend</h1>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
            
            <select multiple onChange={(e) => 
                setFilter(Array.from(e.target.selectedOptions, option => option.value))
            }>
                <option value="Numbers">Numbers</option>
                <option value="Alphabets">Alphabets</option>
                <option value="Highest Alphabet">Highest Alphabet</option>
            </select>

            {renderResponse()}
        </div>
    );
};

export default App;
