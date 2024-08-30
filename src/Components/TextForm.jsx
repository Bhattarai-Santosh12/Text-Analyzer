import { useState } from "react";
import React from 'react';

export default function TextForm(props) {

  const handelUpperCase = () => {
    let newText = text.toUpperCase();
    setText(newText);
  };

  const handelLowerCase = () => {
    let lowerCaseText = text.toLowerCase();
    setText(lowerCaseText);
  };

  const clearTextBox = () => {
    setText(""); // Clear the text
    setError(""); // Clear any existing error message
  };

  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(""); // State to manage error message

  const handelCopyText = () => {
    if (text.length > 0) { // Check if there is text to copy
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true); // Set copied state to true
        setError(""); // Clear any previous error
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      },
      (err) => {
        console.error("Failed to Copy!", err);
        setError("Failed to copy text. Try again.");
      });
    } else {
      setError("Textbox is empty. Please enter some text to copy."); // Set error message
    }
  };

  const handelOnChange = (event) => {
    setText(event.target.value); // Update the text state
    setError(""); // Clear error message when text changes
  };

  const [text, setText] = useState("");

  const wordCount = text.trim().length > 0 ? text.trim().split(/\s+/).length : 0;

  const countVowelConsonant = (str) => {
    let vowels = 0;
    let consonants = 0;
    let lowerCaseStr = str.toLowerCase();

    for (let char of lowerCaseStr) {
      if (/[aeiou]/.test(char)) {
        vowels++;
      } else if (/[bcdfghjklmnpqrstvwxyz]/.test(char)) { // Only count consonants
        consonants++;
      }
    }
    return { vowels, consonants }; // Return as an object
  };

  const { vowels, consonants } = countVowelConsonant(text);

  return (
    <>
      <div className="container">
        <div className="mb-3 my-3">
          <h1>{props.heading}</h1>
          <label htmlFor="myBox" className="form-label"></label>
          <textarea 
            className={`form-control ${error ? 'is-invalid' : ''}`} 
            value={text} 
            onChange={handelOnChange} 
            id="exampleFormControlTextarea1" 
            rows="6" 
            placeholder="Enter Text"
          ></textarea>
          {error && <div className="invalid-feedback">{error}</div>} {/* Display error */}
        </div>
        <button className="btn btn-primary mx-1" onClick={handelUpperCase}>Convert to UpperCase</button>
        <button className="btn btn-primary mx-1" onClick={handelLowerCase}>Convert to Lower Case</button>
        <button className="btn btn-primary mx-1" onClick={clearTextBox}>Clear</button>
        <button className="btn btn-primary mx-1" onClick={handelCopyText}>Copy</button>
        {copied && <span style={{ color: "green", marginLeft: "10px" }}>Text Copied!</span>}
      </div>

      <div className="container my-2">
        <h1>Your Text Summary</h1>
        <p>{wordCount} words and {text.length} characters</p>
        <p>{0.008 * wordCount} minutes to read the text</p>
        <p>Vowels: {vowels}</p>
        <p>Consonants: {consonants}</p>
      </div>
    </>
  );
}
