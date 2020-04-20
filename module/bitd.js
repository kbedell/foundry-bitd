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

Hooks.once("init", function () {
  console.log(`BitD | Initializing Blades in the Dark System\n`);

  // Create a BitD namespace within the game global
  game.bitd = {
    BitDCharacter,
    rollItemMacro
  };

  // Record Configuration Values
  CONFIG.BITD = BITD;
  CONFIG.Actor.entityClass = BitDCharacter;

  // Register System Settings
  registerSystemSettings();

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("bitd", BitDCharacterSheet, { types: ["character"], makeDefault: true });
  // Actors.registerSheet("bitd", ActorSheetBitDNPC, { types: ["npc"], makeDefault: true });
  // Items.unregisterSheet("core", ItemSheet);
  // Items.registerSheet("bitd", ItemSheetBitD, {makeDefault: true});

  // Preload Handlebars Templates
  preloadHandlebarsTemplates();
});