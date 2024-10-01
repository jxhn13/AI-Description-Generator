import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { remark } from 'remark';
import html from 'remark-html';

const DescriptionInput = ({ onGenerate, onSummarize, descriptions, setDescriptions }) => {
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSummarizeLoading, setIsSummarizeLoading] = useState(false);
    const [descriptionStyle, setDescriptionStyle] = useState('short'); // Add state for description style

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleStyleChange = (event) => {
        setDescriptionStyle(event.target.value);
    };

    const handleGenerate = async () => {
        if (inputValue.trim()) {
            setIsLoading(true);
            await onGenerate(inputValue, descriptionStyle); // Pass style to API call
            setIsLoading(false);
            setInputValue('');
        }
    };

    const handleSummarize = async () => {
        if (descriptions.description1.trim()) {
            setIsSummarizeLoading(true);
            await onSummarize();
            setIsSummarizeLoading(false);
        }
    };

    const convertMarkdownToText = async (markdown) => {
        const processed = await remark().use(html).process(markdown);
        const tempElement = document.createElement('div');
        tempElement.innerHTML = processed.toString();
        return tempElement.textContent || tempElement.innerText || "";
    };

    const handleDownloadDescriptionPDF = async () => {
        const doc = new jsPDF();
        const descriptionText = await convertMarkdownToText(descriptions.description1 || "");

        doc.setFontSize(16);
        doc.text("Description:", 10, 10);
        doc.setFontSize(12);
        doc.text(doc.splitTextToSize(descriptionText, 180), 10, 20);

        doc.save('description.pdf');
    };

    const handleDownloadSummaryPDF = async () => {
        const doc = new jsPDF();
        const summaryText = await convertMarkdownToText(descriptions.description2 || "");

        doc.setFontSize(16);
        doc.text("Summary:", 10, 10);
        doc.setFontSize(12);
        doc.text(doc.splitTextToSize(summaryText, 180), 10, 20);

        doc.save('summary.pdf');
    };

    return (
        <div id="input-container">
            <input
                id="message-input"
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Enter a word"
            />
            <div id="button-container">
                <button id="button" onClick={handleGenerate} disabled={isLoading}>
                    {isLoading ? 'Generating...' : 'GENERATE'}
                </button>
                <button id="button1" onClick={handleSummarize} disabled={isSummarizeLoading || !descriptions.description1.trim()}>
                    {isSummarizeLoading ? 'Summarizing...' : 'SUMMARIZE'}
                </button>
            </div>
            <button id="pdf" onClick={handleDownloadDescriptionPDF} disabled={!descriptions.description1.trim()}>
                DOWNLOAD DESC
            </button>
            <button id="pdf" onClick={handleDownloadSummaryPDF} disabled={!descriptions.description2.trim()}>
                DOWNLOAD SUMMARY
            </button>
            <div id='style'>
                <label htmlFor="description-style">Description Style:</label>
                <select id="description-style" value={descriptionStyle} onChange={handleStyleChange}>
                    <option value="short">Short</option>
                    <option value="long">Long</option>
                    <option value="descriptive">Descriptive</option>
                </select>
            </div>
        </div>
    );
};

export default DescriptionInput;
