export const registerSystemSettings = function () {

    /**
     * Register diagonal movement rule setting
     */
    game.settings.register("bitd", "diagonalMovement", {
        name: "SETTINGS.BitDDiagN",
        hint: "SETTINGS.BitDDiagL",
        scope: "world",
        config: true,
        default: "555",
        type: String,
        choices: {
            "555": "SETTINGS.BitDDiagPHB",
            "5105": "SETTINGS.BitDDiagDMG"
        },
        onChange: rule => canvas.grid.diagonalRule = rule
    });

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
};
