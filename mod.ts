import {existsSync } from "https://deno.land/std/fs/mod.ts";
import * as path from 'https://deno.land/std/path/mod.ts';
import {rand} from "https://deno.land/x/remapper@3.1.2/src/mod.ts";

function h(l:number) {
    const r = 'sadojkoop2392038i90id90mocmsdklkljdklasue9o'
    let s = 'font_'
    for(let i = 0; i < l; i++) {
        s += r[rand(0,r.length,1)]
    }
    return s
}
let version: rmVersion;


const fontDir = 'RMFonts'

const Fonts = {
    Lite: "lite",
    Swifter: "swifter",
    Tzur: "tzur",
    Gameplay: "gameplay"
} // Premade fonts

type rmVersion = "v3" //| "v4"

type yapLevel = "Mild" | "Medium" | "Youreadumbass"
function log(text: string, whatareweyappingabout: yapLevel) {
    switch(whatareweyappingabout){
        case "Mild":
            console.log(`%c[FontPlus] : ${text}`, "color:green")
            break;
        case "Medium":
            console.log(`%c[FontPlus] : ${text}`, "color:orange")
            break;
        case "Youreadumbass":
            console.log(`%c[FontPlus] : ${text}`, "color:red")
            break;
    }
    
}

export function initFonts(RemapperVersion: rmVersion) {
    if(RemapperVersion == "v3") {
        version = "v3"
    } /* else { // RM4

    } */
}

async function getFontData(URL: string, custom?:boolean) {
    try {
        if(!custom) {
            const id = `https://raw.githubusercontent.com/UGEcko/FontPlus/main/Fonts/${version}/${URL}.rmmodel`
            const web = await fetch(id);
            const content = await web.text();
            return content as string;
        } else {
            const web = await fetch(URL);
            const content = await web.text();
            return content as string;
        }
    } catch(err) {
        log(err,"Medium")
    }
}

function ensureDirectory(data?: string, identifier?: string) {
    try {
        const dirPath = path.join(path.dirname(path.fromFileUrl(Deno.mainModule)),fontDir) // ./RMFonts
        if(!existsSync(dirPath, {isDirectory : true})) { // Check if the RMFonts folder doesnt exist to make it.
            Deno.mkdir(dirPath, {recursive : true})
        }
        if(data && identifier) { // Will download the font if data & identifier is filled.
            let path = ''
            if(!identifier.includes('.rmmodel')) {
                path = `${dirPath}\\${identifier}.rmmodel` 
            } else {
                path = `${dirPath}\\${identifier}`
            }
            if(!existsSync(path)) { // Write if the font doesnt exist.
                Deno.writeTextFileSync(path, data)
            }
            return path;
        }
    } catch(err) {
        log(err,"Medium")
    }
}

export async function getFont(font: (keyof typeof Fonts) | undefined, customFont?: string): Promise<string> {
    if(version) {
            let path = '';
            if(font != undefined) { // If you're using a pre-made font.
                const selectFont = Fonts[font];
                const pathx = ensureDirectory(await getFontData(selectFont,false), font) as string
                path = pathx
            }
            else if(customFont) { // If you're using a custom font.
                const identifer = customFont.slice(customFont.lastIndexOf('/')+1);
                const pathx = ensureDirectory(await getFontData(customFont,true), identifer) as string
                path = pathx
            }
            else {
                log("getFont() Is not filled in. Please use a pre made or custom font.","Youreadumbass")
            }
            return path as string;
    } else {
        log("Please initiate FontPlus by using the init() function.", "Medium")
        return '';
    }
}

