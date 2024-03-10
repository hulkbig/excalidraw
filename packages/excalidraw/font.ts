
import { EDITOR_LS_KEYS } from './constants';
import { EditorLocalStorage } from './data/EditorLocalStorage';
import {} from './';

export type CustomFonts = {
    handwriting: string | null;
    normal: string | null;
    code: string | null;
}

const FONT_MAP = {
    handwriting: 'Virgil',
    normal: 'Helvetica',
    code: 'Cascadia'
};

export const loadDefaultFonts = () : CustomFonts => {
    return {
        handwriting: "https://excalidraw-zh.com/fonts/Xiaolai.woff2",
        normal: "",
        code: "",
    }
}

export const saveCustomFonts = (customFonts: CustomFonts) => {
    EditorLocalStorage.set(EDITOR_LS_KEYS.CUSTOM_FONTS, customFonts);
}

export const loadCustomFonts = () => {
    return EditorLocalStorage.get(EDITOR_LS_KEYS.CUSTOM_FONTS) as CustomFonts | null;
}

export const isCustomFontsSet = () => {
    return EditorLocalStorage.has(EDITOR_LS_KEYS.CUSTOM_FONTS);
}

export const preloadCustomFonts = async (customFonts: CustomFonts) => {
    if (!('fonts' in document)) {
        return;
    }
    const promises = [];
    Object.keys(customFonts).forEach(font => {
        if (Object.getOwn) {
            return;
        }
    })


    

    if ('fonts' in document) {
        const font = new FontFace('MyFont', 'url(path/to/your/font-file.woff2) format(woff2)');
        
        document.fonts.add(font);
        font.load().then(() => {
          console.log('Font loaded');
          // 在这里执行任何需要等待字体加载完成后才能进行的操作
        }).catch(error => {
          console.error('Font failed to load', error);
        });
      }

}
