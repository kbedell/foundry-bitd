/**
 * A specialized form used to select from a checklist of conditions
 * @extends {FormApplication}
 */
export class ConditionSelector extends FormApplication {

    /** @override */
      static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
        id: "condition-selector",
        classes: ["bitd"],
        title: "Actor Condition Selection",
        template: "systems/bitd/templates/apps/condition-selector.html",
        width: 320,
        height: "auto",
        choices: {},
        allowCustom: false,
        minimum: 0,
        maximum: null
      });
    }
  
    /* -------------------------------------------- */
  
    /**
     * Return a reference to the target attribute
     * @type {String}
     */
    get attribute() {
        return this.options.name;
    }
  
    /* -------------------------------------------- */
  
    /** @override */
    getData() {
  
      // Get current values
      let attr = getProperty(this.object.data, this.attribute) || {};
      attr.value = attr.value || [];
  
        // Populate choices
      const choices = duplicate(this.options.choices);
      for ( let [k, v] of Object.entries(choices) ) {
        choices[k] = {
          label: v,
          chosen: attr ? attr.value.includes(k) : false
        }
      }
  
      // Return data
        return {
        allowCustom: this.options.allowCustom,
          choices: choices,
        custom: attr ? attr.custom : ""
      }
    }
  
    /* -------------------------------------------- */
  
    /** @override */
    _updateObject(event, formData) {
      const updateData = {};
  
      // Obtain choices
      const chosen = [];
      for ( let [k, v] of Object.entries(formData) ) {
        if ( (k !== "custom") && v ) chosen.push(k);
      }
      updateData[`${this.attribute}.value`] = chosen;
  
      // Update the object
      this.object.update(updateData);
    }
  }
  