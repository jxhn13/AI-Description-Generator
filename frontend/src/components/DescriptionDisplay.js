import React from 'react';
import '../App.css';
import '../index.css';
import ReactMarkdown from 'react-markdown';

const DescriptionDisplay = ({ description1, relatedTopics, onTopicClick }) => {
    return (
        <div id="output-box">
            {description1 && (
                <div>
                    <h2>Description</h2>
                    <ReactMarkdown>{description1}</ReactMarkdown>
                </div>
            )}
            {relatedTopics && relatedTopics.length > 0 && (
                <div>
                    <h2>Related Topics</h2>
                    <ul>
                        {relatedTopics.map((topic, index) => (
                            <li key={index}>
                                {topic.url ? (
                                    <a 
                                        href={topic.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        onClick={() => onTopicClick(topic.name
                                        
                                        )} 
                                    >
                                        {topic.name}
                                    </a>
                                ) : (
                                    <span>{topic.name}</span>
                                )}
                                {topic.description && (
                                    <p>{topic.description}</p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DescriptionDisplay;

