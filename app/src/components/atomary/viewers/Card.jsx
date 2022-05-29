import React, {useState} from 'react';

const Card = ({ children, rootDOMAttributes, loading, hfull, wfull, customClasses, row }) => {
    const [classes] = useState(
        ' overflow-hidden flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 cursor-pointer card '
    );

    return (
        <div {...rootDOMAttributes}
             className={`${loading ? 'loading' : 'loading finished'}` + classes + `${hfull ? 'min-h-card ': ''}` + `${wfull ? 'w-full ' : ''}` + `${row ? 'flex-row' : 'flex-col'} ` + customClasses}
        >
            { children }
        </div>
    );
};

export default Card;