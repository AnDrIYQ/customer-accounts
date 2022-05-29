import React, {useEffect, useState} from 'react';
import Card from "../atomary/viewers/Card";
import Text from "../atomary/typography/Text";
import Icon from "../atomary/typography/Icon";
import {ChevronDoubleRightIcon, HomeIcon} from "@heroicons/react/solid";
import {useLocation, useNavigate} from "react-router-dom";

const BreadCrumbs = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const [urls, setUrls] = useState([
        {text: 'Dashboard', link: '/', icon: <HomeIcon />, first: true},
    ]);

    useEffect(() => {
        const breadcrumbs = [];
        window.location.pathname.split('/').filter(item => item !== '').map(item => {
            breadcrumbs.push({
                text: item.charAt(0).toUpperCase() + item.slice(1),
                link: '/' + item,
                first: false
            })
        })
        setUrls([...urls, ...breadcrumbs])
    }, []);

    return <Card row customClasses="px-5 py-3 border-none no-grow w-full gap-16">
        {urls.map((url, index) => {
            return <div key={index} className={"breadcrumbs gap-8"} onClick={() => navigate(url.link)}>
                {url.first && <Icon mini>{ url.icon }</Icon>}
                <Text>{ url.text }</Text>
                <Icon mini customClasses={"breadcrumbs-icon"}><ChevronDoubleRightIcon /></Icon>
            </div>}
        )}
    </Card>;
};

export default BreadCrumbs;