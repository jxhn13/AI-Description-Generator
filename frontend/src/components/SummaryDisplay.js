import React from 'react';
import '../App.css';
import '../index.css';
import ReactMarkdown from 'react-markdown';

const DescriptionDisplay = ({ description2 }) => {
    return (
        <div id="output-box">
              
              <ReactMarkdown>{description2}</ReactMarkdown>

        </div>
    );
};

export default DescriptionDisplay;
