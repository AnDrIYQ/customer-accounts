import React from 'react';

const Button = ({ children, action, ...rootDOMAttributes}) => {
    return (
        <div className="max-w-button">
            <button type="button"
                    onClick={action}
                    {...rootDOMAttributes}
                    className="theme_color text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                { children }
            </button>
        </div>
    );
};

export default Button;