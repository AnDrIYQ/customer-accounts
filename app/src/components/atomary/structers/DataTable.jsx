import React, {useEffect, useRef} from 'react';
import {Table} from "flowbite-react";
import {v4} from 'uuid';
import {useNavigate} from "react-router-dom";
import Icon from "../typography/Icon";
import Image from "../typography/Image";
import {UserCircleIcon} from "@heroicons/react/solid";

const DataTable = ({ columns, rows, iconEnd, iconStart, headless }) => {
    const navigate = useNavigate();

    const onClickHandler = (e, item) => {
        if (item?.meta?.link) {navigate(item?.meta?.url)}
        if (item?.meta?.action) {item?.meta?.fn()}
    }

    return (
        <div className={"flex w-full max-w-xs sm:max-w-none overflow-x-visible"}>
            <Table hoverable={true} style={{minWidth: '762px'}}>
                {!headless &&
                    <Table.Head>
                        {!!columns.length &&
                            columns.map(column => <Table.HeadCell key={v4()}>{column || '--'}</Table.HeadCell>)}
                    </Table.Head>
                }
                <Table.Body>
                    {!!rows.length && rows.map(row => <Table.Row key={v4()}>
                        {!!iconStart && <Table.Cell><Icon>{iconStart}</Icon></Table.Cell>}
                        {!!row.length &&
                            row.map(item => {
                                return <Table.Cell key={v4()}>
                                    <span className={item?.meta?.link || item?.meta?.action ? `link` : ``} onClick={(e) => {onClickHandler(e, item)}}
                                    >{item?.text}
                                        {item?.iconContent ? <Icon>{item?.iconContent}</Icon> : false}
                                        {item?.imageContent && item?.meta?.avatar ? <Image mini avatar src={item?.imageContent} /> : false}
                                        {!item?.imageContent && item?.meta?.avatar ? <Icon avatar><UserCircleIcon /></Icon> : false}
                                    </span>
                                </Table.Cell>
                            }
                        )}
                        {!!iconEnd && <Table.Cell><Icon>{iconEnd}</Icon></Table.Cell>}
                    </Table.Row>)}
                </Table.Body>
            </Table>
        </div>
    );
};

export default DataTable;