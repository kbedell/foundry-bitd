export const registerSystemSettings = function () {
    /**
     * Option to automatically collapse Item Card descriptions
     */
    game.settings.register("bitd", "autoCollapseItemCards", {
        name: "SETTINGS.BitDAutoCollapseCardN",
        hint: "SETTINGS.BitDAutoCollapseCardL",
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange: s => {
            ui.chat.render();
        }
    });

    /**
     * Register shorthand macros
     */
    game.settings.register("worldbuilding", "macroShorthand", {
        name: "Shortened Macro Syntax",
        hint: "Enable a shortened macro syntax which allows referencing attributes directly, for example @str instead of @attributes.str.value. Disable this setting if you need the ability to reference the full attribute model, for example @attributes.str.label.",
        scope: "world",
        type: Boolean,
        default: true,
        config: true
    });
};
