/**
 * TheBlades in the Dark game system for Foundry Virtual Tabletop
 * Author: Easternwind
 * Software License: GNU GPLv3
 * This work is based on Blades in the Dark (found at http://www.bladesinthedark.com/), product of One Seven Design, developed and authored by John Harper, and licensed for our use under the Creative Commons Attribution 3.0 Unported license (http://creativecommons.org/licenses/by/3.0/).
 * Repository: 
 * Issue Tracker: 
 */

// Import Modules
import { BITD } from "./config.js";
import { registerSystemSettings } from "./module/settings.js";
import { measureDistance, getBarAttribute } from "./module/canvas.js";
import { BitDCharacter } from "./actor/entity.js";
import { BitDCharacterSheet } from "./actor/sheets/character.js";

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", async function() {
  console.log(`Initializing Simple Worldbuilding System`);

  // Define custom Entity classes
  CONFIG.Actor.entityClass = BitDCharacter;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("bitd", BitDCharacterSheet, { makeDefault: true });

  // Register system settings
  game.settings.register("worldbuilding", "macroShorthand", {
    name: "Shortened Macro Syntax",
    hint: "Enable a shortened macro syntax which allows referencing attributes directly, for example @str instead of @attributes.str.value. Disable this setting if you need the ability to reference the full attribute model, for example @attributes.str.label.",
    scope: "world",
    type: Boolean,
    default: true,
    config: true
  });
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