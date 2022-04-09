import React, {useState} from "react";

const ErrorBoundary = ( props ) => {
    const [items, setItems] = useState({
        hasError: false,
        errorMessage: ""
    });

    const componentDidCatch = (error, info) => {
        setItems({...items, hasError: items.hasError, errorMessage: error});
    }

    if (items.hasError) {
        return <h1>{items.errorMessage}</h1>;
    } else {
        return props.children
    }
}

export default ErrorBoundary;