
import React from 'react';

const RelatedTopicsDisplay = ({ relatedTopics }) => {
    const topicsArray = typeof relatedTopics === 'string' ? relatedTopics.split(',').map(topic => topic.trim()) : relatedTopics;

    return (
        <div id="output-box">
            <h2>Related Topics</h2>
            <ul>
                {topicsArray.map((topic, index) => (
                    <li key={index}>{topic}</li>
                ))}
            </ul>
        </div>
    );
};

export default RelatedTopicsDisplay;
