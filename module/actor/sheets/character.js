import { ActorSheetBitD } from "./base.js";

/**
 * An Actor sheet for player character type actors in the D&D5E system.
 * Extends the base ActorSheet5e class.
 * @type {ActorSheetBitD}
 */
export class ActorSheetBitDcharacter extends ActorSheetBitD {

  /**
   * Define default rendering options for the NPC sheet
   * @return {Object}
   */
	static get defaultOptions() {
	  return mergeObject(super.defaultOptions, {
      classes: ["bitd", "sheet", "actor", "character"],
      width: 672,
      height: 736
    });
  }

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Get the correct HTML template path to use for rendering this particular sheet
   * @type {String}
   */
  get template() {
    return "systems/bitd/templates/actors/character-sheet.html";
  }

  /* -------------------------------------------- */

  /**
   * Organize and classify Owned Items for Character sheets
   * @private
   */
  _prepareItems(data) {

    // Categorize items as inventory, spellbook, features, and classes
    const inventory = {
      weapon: { label: "Weapons", items: [], dataset: {type: "weapon"} },
      equipment: { label: "Equipment", items: [], dataset: {type: "equipment"} },
      consumable: { label: "Consumables", items: [], dataset: {type: "consumable"} },
      tool: { label: "Tools", items: [], dataset: {type: "tool"} },
      backpack: { label: game.i18n.localize("DND5E.ItemContainerHeader"), items: [], dataset: {type: "backpack"} },
      loot: { label: "Loot", items: [], dataset: {type: "loot"} }
    };

    // Partition items by category
    let [items, spells, feats, classes] = data.items.reduce((arr, item) => {

      // Item details
      item.img = item.img || DEFAULT_TOKEN;
      item.isStack = item.data.quantity ? item.data.quantity > 1 : false;

      // Item usage
      item.hasUses = item.data.uses && (item.data.uses.max > 0);
      item.isOnCooldown = item.data.recharge && !!item.data.recharge.value && (item.data.recharge.charged === false);
      item.isDepleted = item.isOnCooldown && (item.data.uses.per && (item.data.uses.value > 0));
      item.hasTarget = !!item.data.target && !(["none",""].includes(item.data.target.type));

      // Item toggle state
      this._prepareItemToggleState(item);

      // Classify items into types
      if ( item.type === "spell" ) arr[1].push(item);
      else if ( item.type === "feat" ) arr[2].push(item);
      else if ( item.type === "class" ) arr[3].push(item);
      else if ( Object.keys(inventory).includes(item.type ) ) arr[0].push(item);
      return arr;
    }, [[], [], [], []]);

    // Apply active item filters
    items = this._filterItems(items, this._filters.inventory);
    spells = this._filterItems(spells, this._filters.spellbook);
    feats = this._filterItems(feats, this._filters.features);

    // Organize Spellbook
    const spellbook = this._prepareSpellbook(data, spells);
    const nPrepared = spells.filter(s => {
      return (s.data.level > 0) && (s.data.preparation.mode === "prepared") && s.data.preparation.prepared;
    }).length;

    // Organize Inventory
    let totalWeight = 0;
    for ( let i of items ) {
      i.data.quantity = i.data.quantity || 0;
      i.data.weight = i.data.weight || 0;
      i.totalWeight = Math.round(i.data.quantity * i.data.weight * 10) / 10;
      inventory[i.type].items.push(i);
      totalWeight += i.totalWeight;
    }
    data.data.attributes.encumbrance = this._computeEncumbrance(totalWeight, data);

    // Organize Features
    const features = {
      classes: { label: "Class Levels", items: [], hasActions: false, dataset: {type: "class"}, isClass: true },
      active: { label: "Active", items: [], hasActions: true, dataset: {type: "feat", "activation.type": "action"} },
      passive: { label: "Passive", items: [], hasActions: false, dataset: {type: "feat"} }
    };
    for ( let f of feats ) {
      if ( f.data.activation.type ) features.active.items.push(f);
      else features.passive.items.push(f);
    }
    classes.sort((a, b) => b.levels - a.levels);
    features.classes.items = classes;

    // Assign and return
    data.inventory = Object.values(inventory);
    data.spellbook = spellbook;
    data.preparedSpells = nPrepared;
    data.features = Object.values(features);
  }

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers
  /* -------------------------------------------- */

  /**
   * Activate event listeners using the prepared sheet HTML
   * @param html {HTML}   The prepared HTML object ready to be rendered into the DOM
   */
	activateListeners(html) {
    super.activateListeners(html);
    if ( !this.options.editable ) return;

    // Inventory Functions
    html.find(".currency-convert").click(this._onConvertCurrency.bind(this));

    // Item State Toggling
    html.find('.item-toggle').click(this._onToggleItem.bind(this));

    // Short and Long Rest
    html.find('.short-rest').click(this._onShortRest.bind(this));
    html.find('.long-rest').click(this._onLongRest.bind(this));

    // Death saving throws
    html.find('.death-save').click(this._onDeathSave.bind(this));
  }

  /* -------------------------------------------- */

  /**
   * Handle rolling a death saving throw for the Character
   * @param {MouseEvent} event    The originating click event
   * @private
   */
  _onDeathSave(event) {
    event.preventDefault();
    return this.actor.rollDeathSave({event: event});
  }

  /* -------------------------------------------- */


  /**
   * Handle toggling the state of an Owned Item within the Actor
   * @param {Event} event   The triggering click event
   * @private
   */
  _onToggleItem(event) {
    event.preventDefault();
    const itemId = event.currentTarget.closest(".item").dataset.itemId;
    const item = this.actor.getOwnedItem(itemId);
    const attr = item.data.type === "spell" ? "data.preparation.prepared" : "data.equipped";
    return item.update({[attr]: !getProperty(item.data, attr)});
  }

  /* -------------------------------------------- */

  /**
   * Take a short rest, calling the relevant function on the Actor instance
   * @param {Event} event   The triggering click event
   * @private
   */
  async _onShortRest(event) {
    event.preventDefault();
    await this._onSubmit(event);
    return this.actor.shortRest();
  }

  /* -------------------------------------------- */

  /**
   * Take a long rest, calling the relevant function on the Actor instance
   * @param {Event} event   The triggering click event
   * @private
   */
  async _onLongRest(event) {
    event.preventDefault();
    await this._onSubmit(event);
    return this.actor.longRest();
  }

  /* -------------------------------------------- */

  /**
   * Handle mouse click events to convert currency to the highest possible denomination
   * @param {MouseEvent} event    The originating click event
   * @private
   */
  async _onConvertCurrency(event) {
    event.preventDefault();
    return Dialog.confirm({
      title: `${game.i18n.localize("DND5E.CurrencyConvert")}`,
      content: `<p>${game.i18n.localize("DND5E.CurrencyConvertHint")}</p>`,
      yes: () => this.actor.convertCurrency()
    });
  }
}
