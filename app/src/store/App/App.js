import { makeAutoObservable } from "mobx";
import {hexToHSL} from "../../functions/to-hsl";
import {Color} from "../../classes/color";

export default class AppStore {
    constructor() {
        makeAutoObservable(this);
    }
    // Fields
    themeColor = "#000"
    isLoading = true;

    // Mutators
    setColor(color) {
        this.themeColor = color;
    }
    setLoading(loading) {
        this.isLoading = loading;
    }
    // Actions
    finishLoading() {
        this.setLoading(false);
    }
    startLoading() {
        this.setLoading(true);
    }
    updateColor() {
        const hsl = hexToHSL(new Color(this.themeColor).value);
        document.documentElement.style.setProperty('--hue', hsl[0])
        document.documentElement.style.setProperty('--sat', hsl[1])
        document.documentElement.style.setProperty('--light', hsl[2])
    }
}