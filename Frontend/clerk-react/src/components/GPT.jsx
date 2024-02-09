import React, { useState } from "react";
import { TypeAnimation } from 'react-type-animation';

function GPT() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setResponse('')
        try {
            const responseData = await fetch('/api/gpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt })
            });
            const data = await responseData.json();
           
            setResponse(data.response);
            setPrompt(''); // Clear the prompt after submitting
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleClear = () => {
        setResponse(''); // Clear the response
        setPrompt(''); // Clear the prompt
    };

    return (
        <div className="pr-4">
            <form onSubmit={handleSubmit}>
                <input
                    className="rounded-none"
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt"
                />
                <div className="pl-32 pr-32">
                    <button className="border-2 border-black font-newroman cursor-pointer py-2 rounded-none hover:bg-black hover:text-white" type="submit">Search</button>
                </div>
            </form>
            {response && (
                <div className="border border-black pl-4 cursor-pointer transition-all hover:border-green-800 flex flex-row text-center relative mb-4 ">
                  <div className="basis-5/6">
                    <TypeAnimation
                        sequence={[response]}
                        speed={50}
                        repeat={1}
                    />
                    </div>
                    <div className="basis-1/6">
                    <button onClick={handleClear} className="absolute top-0 right-0 material-symbols-outlined rounded-none pb-1 s contrast hover:bg-green-800 hover:text-white" style={{ width: '50px' }}>delete</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GPT;
