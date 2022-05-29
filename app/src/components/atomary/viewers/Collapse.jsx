import React from 'react';
import {Accordion} from 'flowbite-react';

const Collapse = ({ children, color, opened, title, ...rootDOMAttributes }) => {
    return <Accordion {...rootDOMAttributes}>
        <Accordion.Panel open={opened} className={"bg-red-500"}>
            <Accordion.Title>
                <span>{title}</span>
            </Accordion.Title>
            <Accordion.Content>
                <div className="flex collapse flex-col w-full gap-8 items-start">
                    { children }
                </div>
            </Accordion.Content>
        </Accordion.Panel>
    </Accordion>;
};

export default Collapse;