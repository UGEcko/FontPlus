import { existsSync  } from "https://deno.land/std/fs/mod.ts";
import * as path from 'https://deno.land/std/path/mod.ts';

//! Attention: This module requires read-write permissions via deno, use of getFont() requires initFonts() before any declaration of getFont().

import {cacheData, rand} from "https://deno.land/x/remapper@3.1.2/src/mod.ts";
const Fonts = {
    lite: "https://raw.githubusercontent.com/UGEcko/FontPlus/main/Fonts/lite.rmmodel",
    swifter: "https://raw.githubusercontent.com/UGEcko/FontPlus/main/Fonts/swifter.rmmodel",
    tzur: "https://raw.githubusercontent.com/UGEcko/FontPlus/main/Fonts/tzur.rmmodel"
};
let cachedFonts: (keyof typeof Fonts)[] = [];

export function initFonts() { // This is so the RM_Cache doesnt limit access / delete the font data if no fonts are being used.
    cacheData("Fonts", () => {
        const data = [""] // Dummy 
        return data;
    },[rand(0,10,1)]);
    cachedFonts = []
}

function cache_font(font: (keyof typeof Fonts)[]) {
    if(cachedFonts.includes(font[0])) { // If its already in the cache, dont do anything.
        return;
    } else {
        if(!cachedFonts.includes(font[0])) {
            cachedFonts.push(font[0]);
        };

        cacheData("Fonts", () => { // push the cache array to fonts cache
            const data = cachedFonts
            return data;
        },[rand(0,10,1)]);
    }
}

async function downloadFont(URL: string, fontPath: string) {
    try {
        const web = await fetch(URL)
        const content = await web.text();
        await Deno.writeTextFile(fontPath,content);
       
    } catch(ex) {
        console.log("DOWNLOAD FONT ERROR " + ex);
    }
}

async function manageFontDirectory(fonts: (keyof typeof Fonts)[]) {
    try {
        const customDirPath = path.join(path.dirname(path.fromFileUrl(Deno.mainModule)), 'RemapperFonts');
        await Deno.mkdir(customDirPath, { recursive: true });

        const downloadPromises = fonts.map(async (font) => {
            const fontDir = `${customDirPath}\\${font}.rmmodel`;
            if (!existsSync(fontDir)) {
                await downloadFont(Fonts[font], fontDir);
            }
        });

        await Promise.all(downloadPromises); // Wait for all fonts to download
    } catch (error) {
        console.error("Error creating tempdir:", error);
    }
}

export async function getFont(font: (keyof typeof Fonts)) {
        cache_font([font]);
        await manageFontDirectory([font]); // Download/handle font before returning the path
        const fontPath = `./RemapperFonts\\${font}.rmmodel`;
    return fontPath;
}
