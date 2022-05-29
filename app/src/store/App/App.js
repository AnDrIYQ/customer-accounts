import { makeAutoObservable } from "mobx";
import {hexToHSL} from "../../functions/to-hsl";
import {Color} from "../../classes/color";

export default class AppStore {
    constructor() {
        makeAutoObservable(this);
    }
    // Fields
    themeColor = "#6176ff"
    isLoading = true;
    routeLoading = true;
    sideBarOpened = true;
    currentPage = '/'
    // Mutators
    setColor(color) {
        this.themeColor = color || "#6176ff";
    }
    setSideBarOpened(opened) {
        this.sideBarOpened = opened;
    }
    setLoading(loading) {
        this.isLoading = loading;
    }
    setRouteLoading(loading) {
        this.routeLoading = loading;
    }
    // Actions
    openSideBar() {
        this.setSideBarOpened(true);
    }
    closeSideBar() {
        this.setSideBarOpened(false);
    }
    makeRouteLoaded() {
        this.setRouteLoading(false);
    }
    loadRoute() {
        this.setRouteLoading(true);
    }
    finishLoading() {
        document.querySelector('#root').classList.add('finished');
        this.setLoading(false);
    }
    startLoading() {
        document.querySelector('#root').classList.remove('finished');
        this.setLoading(true);
    }
    updateColor(color) {
        this.setColor(color);
        const hsl = hexToHSL(new Color(this.themeColor).value);
        document.documentElement.style.setProperty('--hue', hsl[0]);
        document.documentElement.style.setProperty('--sat', hsl[1]);
        document.documentElement.style.setProperty('--light', hsl[2]);
        document.querySelector('head > meta[name="theme-color"]').setAttribute('content', new Color(this.themeColor).value);
    }
}