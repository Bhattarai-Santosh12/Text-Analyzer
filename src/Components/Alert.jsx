import React from "react";

export default function Alert(props) {
    const capital=(word)=>{
        const lower=word.toLowerCase();
        return lower.charAt(0).toUpperCase()+ lower.slice(1);
    }
  return (
    <div>
      {props.alert && (
        <div
          className={`alert alert-primary alert-dismissible fade show`}
          role="alert"
        >
          {capital(props.alert.type)}: {props.alert.msg}
         
        </div>
      )}
    </div>
  );
}
