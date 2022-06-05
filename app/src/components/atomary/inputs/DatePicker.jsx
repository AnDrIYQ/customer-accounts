import React, {useEffect, useRef} from 'react';
import Datepicker from '@themesberg/tailwind-datepicker/Datepicker';
import {CalendarIcon} from "@heroicons/react/solid";
import Icon from "../typography/Icon";

const DatePicker = ({ value, setValue, label }) => {
    const picker = useRef(null);
    useEffect(() => {
        new Datepicker(picker.current, {
        });
    }, [])

    return (
        <div className="relative isolate">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon mini><CalendarIcon /></Icon>
            </div>
            <input datepicker-format="dd/mm/yyyy" value={value} onChange={(e) => setValue(e.target.value)} inputMode='none' ref={picker} datepicker="true" type="text"
                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder={label} />
        </div>
    );
};

export default DatePicker;