import React, { useState } from 'react';
import axios from 'axios';
import DescriptionInput from './components/DescriptionInput';
import DescriptionDisplay from './components/DescriptionDisplay';
import SummaryDisplay from './components/SummaryDisplay';
import './index.css';

const App = () => {
    const [descriptions, setDescriptions] = useState({ description1: '', relatedTopics: [], description2: '' });
    const [showSummary, setShowSummary] = useState(false);

    const generateDescription = async (word,style) => {
        if (!word.trim()) {
            alert('Please enter a word.');
            return;
        }

        try {
            const descriptionResponse = await axios.post('http://localhost:5000/api/description-gemini', { word });
            const relatedTopicsResponse = await axios.post('http://localhost:5000/api/related-topics-gemini', { word });

            setDescriptions({
                description1: descriptionResponse.data.description1,
                relatedTopics: relatedTopicsResponse.data.related_topics,
                description2: ''
            });
            setShowSummary(false);
        } catch (error) {
            console.error('Error fetching description or related topics:', error);
            setDescriptions({ description1: 'Failed to fetch description.', relatedTopics: [], description2: '' });
        }
    };

    const summarizeDescription = async () => {
        if (!descriptions.description1.trim()) {
            alert('No description available to summarize.');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:5000/api/summarize-gemini', { description1: descriptions.description1 });
            setDescriptions({ ...descriptions, description2: response.data.description2 });
            setShowSummary(true); 
        } catch (error) {
            console.error('Error fetching summary:', error);
            setDescriptions({ ...descriptions, description2: 'Failed to fetch summary.' });
        }
    };
    const handleTopicClick = async (topic) => {
        try {
            const response = await axios.post('http://localhost:5000/api/description-gemini', { word: topic });
            setDescriptions(prevState => ({ ...prevState, description1: response.data.description1 }));
        } catch (error) {
            console.error('Error fetching topic description:', error);
        }
    };

    return (
        <div>
        <h1>AI Description Generator</h1>
        <DescriptionInput 
            onGenerate={generateDescription} 
            onSummarize={summarizeDescription} 
            descriptions={descriptions} 
            setDescriptions={setDescriptions}
        />
        
       {showSummary ? (
            <SummaryDisplay 
                description2={descriptions.description2} 
            />
) :
(
            <DescriptionDisplay 
                description1={descriptions.description1} 
            relatedTopics={descriptions.relatedTopics}
            onTopicClick={handleTopicClick}
            />
        )}
    </div>
);
};
export default App;

