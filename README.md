# FontPlus *(For [Remapper 3.1.2](https://github.com/Swifter1243/ReMapper))*
<b>FontPlus is a quick and simple way to use fonts when using Remapper!</b>

(Update coming after RM4.0 update to be fully cached within RM_Cache, currently all fonts are saved within a folder located in the map directory.)
<hr>

### How it works:
For every font that is used in the map, is downloaded from [this repo](https://github.com/UGEcko/FontPlus/tree/main/Fonts), and cached within Remapper for quick and easy use.

I encourage everyone who has their own font and/or would like to pitch in to the font pool, please do! Send a PR to the Fonts folder with the font.rmmodel and it will be integrated!

<hr>

# Setup

Starting off, please import FontPlus: ``import { getFont, init } from  'https://raw.githubusercontent.com/UGEcko/FontPlus/main/mod.ts'``

(Be sure it is cached.)

Before fetching any fonts, be sure to use ``initFonts(RMVersion)``, preferably in the beginning of your script. This is so when you fetch fonts, it will get the correct version for you.

Lastly, to retrieve fonts, you can call ex: ``getFont("Swifter")`` to retrieve the swifter font!

## Usage Examples:

```ts
initFonts("v3");

const text = new Text(await getFont("Tzur"));
text.position = [0,5,20]

const textScene = new ModelScene(new Geometry("Cube", {
    shader: "Standard",
    shaderKeywords:[],
    color:[1,1,1]
}))
textScene.static(text.toObjects("Remapper funny!"));
```

Note: The ``getFont()`` function returns the file path of the font model relative to the map directory, like how you would traditionally load font models.

```ts 
await getFont("Tzur") == "./RemapperFonts/tzur.rmmodel"
```

<hr>

### Currently supported fonts:
* [Swifter](https://github.com/thelightdesigner/ScuffedWalls/blob/main/Images/Text/swifterfont.png)
* [Tzur](https://github.com/thelightdesigner/ScuffedWalls/blob/main/Images/Text/TzurS11Font.png)
* [Lite](https://github.com/thelightdesigner/ScuffedWalls/blob/main/Images/Text/litefont.png)
* Gameplay

## Using online fonts
If youd like to use an rmmodel font that isnt on the FontPlus repo, but its on github (preferably), you can do ``getFont(undefined, "rawGithublink")`` to download the font.

<hr>

As mentioned before, I encourage everyone who would like to pitch in to expand this font library to do so! Create a PR in the Font folder including the .rmmodel, or you can send me the file on discord: <b>ugecko<b>.
