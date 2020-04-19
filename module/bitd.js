/**
 * TheBlades in the Dark game system for Foundry Virtual Tabletop
 * Author: Easternwind
 * Software License: GNU GPLv3
 * This work is based on Blades in the Dark (found at http://www.bladesinthedark.com/), product of One Seven Design, developed and authored by John Harper, and licensed for our use under the Creative Commons Attribution 3.0 Unported license (http://creativecommons.org/licenses/by/3.0/).
 * Repository: 
 * Issue Tracker: 
 */

// Import Modules

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", function () {
    console.log(`BitD | Initializing Blades in the Dark System System\n`);

    // Create a D&D5E namespace within the game global
    game.bitd = {
        ActorBitD,
    };

    // Record Configuration Values
    CONFIG.BITD = BITD;
    CONFIG.Actor.entityClass = ActorBitD;

    // Register System Settings
    registerSystemSettings();

    // Patch Core Functions
    Combat.prototype._getInitiativeFormula = _getInitiativeFormula;

    // Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("bitd", ActorSheetBitDCharacter, { types: ["character"], makeDefault: true });
    Actors.registerSheet("bitd", ActorSheetBitDNPC, { types: ["npc"], makeDefault: true });

    // Preload Handlebars Templates
    preloadHandlebarsTemplates();
});

/* -------------------------------------------- */
/*  Foundry VTT Setup                           */
/* -------------------------------------------- */

/**
 * This function runs after game data has been requested and loaded from the servers, so entities exist
 */
Hooks.once("setup", function () {

    // Localize CONFIG objects once up-front
    // TODO: Adjust localize
    const toLocalize = [
        "abilities", "actorSizes", "hertiages", "playbooks", "vices", "position", "effectlevels"
    ];
    for (let o of toLocalize) {
        CONFIG.BITD[o] = Object.entries(CONFIG.BITD[o]).reduce((obj, e) => {
            obj[e[0]] = game.i18n.localize(e[1]);
            return obj;
        }, {});
    }
});

/* -------------------------------------------- */
/*  Canvas Initialization                       */
/* -------------------------------------------- */

Hooks.on("canvasInit", function() {

    // Extend Diagonal Measurement
    canvas.grid.diagonalRule = game.settings.get("bitd", "diagonalMovement");
    SquareGrid.prototype.measureDistance = measureDistance;
  
    // Extend Token Resource Bars
    Token.prototype.getBarAttribute = getBarAttribute;
  });