import React, { useState } from 'react';

export default function TextForm(props) {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleUpperCase = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to UpperCase !!!", "success");
  };

  const handleLowerCase = () => {
    let lowerCaseText = text.toLowerCase();
    setText(lowerCaseText);
    props.showAlert("Converted to LowerrCase !!!", "success");
  };

  const clearTextBox = () => {
    setText("");
    // setError("");
    props.showAlert("Text Cleared !!!", "success");
  };

  const handleCopyText = () => {
    if (text.length > 0) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setError("");
        setTimeout(() => setCopied(false), 2000);
        props.showAlert("Copide !!!", "success");
      },
      (err) => {
        console.error("Failed to Copy!", err);
        setError("Failed to copy text. Try again.");
      });
    } else {
      setError("Textbox is empty. Please enter some text to copy.");
    }
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
    setError("");
  };

  const wordCount = text.trim().length > 0 ? text.trim().split(/\s+/).length : 0;

  const countVowelConsonant = (str) => {
    let vowels = 0;
    let consonants = 0;
    let lowerCaseStr = str.toLowerCase();

    for (let char of lowerCaseStr) {
      if (/[aeiou]/.test(char)) {
        vowels++;
      } else if (/[bcdfghjklmnpqrstvwxyz]/.test(char)) {
        consonants++;
      }
    }
    return { vowels, consonants };
  };

  const { vowels, consonants } = countVowelConsonant(text);

  return (
    <>
      <div className="container" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
        <div className="mb-3 my-3">
          <h1>{props.heading}</h1>
          <label htmlFor="myBox" className="form-label"></label>
          <textarea
            className={`form-control ${error ? 'is-invalid' : ''}`}
            value={text}
            onChange={handleOnChange}
            id="exampleFormControlTextarea1"
            rows="6"
            placeholder="Enter Text"
            style={{
              backgroundColor: props.mode === 'dark' ? '#333' : 'white',
              color: props.mode === 'dark' ? 'white' : 'black',
            }}
          ></textarea>
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
        <button className="btn btn-primary mx-1" onClick={handleUpperCase}>Convert to UpperCase</button>
        <button className="btn btn-primary mx-1" onClick={handleLowerCase}>Convert to Lower Case</button>
        <button className="btn btn-primary mx-1" onClick={clearTextBox}>Clear</button>
        <button className="btn btn-primary mx-1" id="box" onClick={handleCopyText}>Copy</button>
        {copied && <span style={{ color: "green", marginLeft: "10px" }}>Text Copied!</span>}
      </div>

      <div className="container my-2" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
        <h1>Your Text Summary</h1>
        <p>{wordCount} words and {text.length} characters</p>
        <p>{0.008 * wordCount} minutes to read the text</p>
        <p>Vowels: {vowels}</p>
        <p>Consonants: {consonants}</p>
      </div>
    </>
  );
}
