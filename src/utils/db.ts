import localforage from "localforage";
import { dbName, defaultTheme, THEME } from "../config";

localforage.config({
    driver: localforage.WEBSQL,
    name: dbName,
    version: 1.0,
    size: 4980736,
    storeName: dbName,
    description: 'Some description'
})

export class TodoAppDb {
    subscribers : Function[] = [];

    constructor () {
        
    }

    getTheme = async () : Promise<string|undefined> => {
        try {
            const theme = await localforage.getItem<string> (THEME)
            if (theme) return theme
            
            return defaultTheme;
        } catch (err) {
            console.log("Get Theme error", err)
        }
    }
    
    saveTheme = async (theme: string) => {
        try {
            await localforage.setItem (THEME, theme);
        } catch (err) {
            console.log("Save Theme error", err)
        }
    }
}