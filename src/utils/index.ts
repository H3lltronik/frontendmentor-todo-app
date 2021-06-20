const html = document.querySelector('html');
const classesToToggle = [".page-header", ".theme-switcher"]
import {store} from '../store/index'

export const switchTheme = function (theme : string) {
    store.commit ('changeTheme', theme)
    if (html) html.dataset.theme = `${theme}`;
    for (const classToToggle of classesToToggle) {
        document.querySelectorAll(classToToggle).forEach (el => {
            const element: HTMLElement = <HTMLElement>el
            element.dataset.theme = `${theme}`
        });
    }
}