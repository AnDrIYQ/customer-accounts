import React from 'react';

const Text = ({ children, customClasses, ...rootDOMAttributes}) => {
    return <p className={"text flex " + customClasses} {...rootDOMAttributes} dangerouslySetInnerHTML={{__html: children.toString().replaceAll(',', '')}} />
};

export default Text;