import React from 'react';

const Button = ({ children, action, right, unwidth, ...rootDOMAttributes}) => {
    return (
        <div className={`${!unwidth ? 'max-w-button' : 'flex'}` + `${right ? 'justify-end' : ''}`}>
            <button type="button"
                    onClick={action}
                    {...rootDOMAttributes}
                    className={"theme_color bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm" +
                        "sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 " + `${unwidth ? '!w-full' : ''}`}>
                { children }
            </button>
        </div>
    );
};

export default Button;