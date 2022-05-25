import React from 'react';

const Head = ({ children, ...rootDOMAttributes}) => {
    return <h1 {...rootDOMAttributes} className="head">{ children }</h1>
};

export default Head;