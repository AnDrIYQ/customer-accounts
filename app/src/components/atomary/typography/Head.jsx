import React from 'react';

const Head = ({ children, customClasses, ...rootDOMAttributes}) => {
    return (
        <h1 {...rootDOMAttributes} className={"head " + customClasses} >{ children }</h1>
    )
};

export default Head;