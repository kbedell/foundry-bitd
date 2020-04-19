// Namespace BitD Configuration Values
export const BITD = {};


/**
 * The set of Ability Scores used within the system
 * @type {Object}
 */
BITD.abilities = {
    "attune": "BITD.AbilityAttune",
    "command": "BITD.AbilityCommand",
    "consort": "BITD.AbilityConsort",
    "finesse": "BITD.AbilityFinesse",
    "hunt": "BITD.AbilityHunt",
    "prowl": "BITD.AbilityProwl",
    "skirmish": "BITD.AbilitySkirmish",
    "study": "BITD.AbilityStudy",
    "survey": "BITD.AbilitySurvey",
    "sway": "BITD.AbilitySway",
    "tinker": "BITD.AbilityTinker",
    "wreck": "BITD.AbilityWreck"
  };

/* -------------------------------------------- */

// Creature Sizes
BITD.actorSizes = {
  "tiny": "DND5E.SizeTiny",
  "sm": "DND5E.SizeSmall",
  "med": "DND5E.SizeMedium",
  "lg": "DND5E.SizeLarge",
  "huge": "DND5E.SizeHuge",
  "grg": "DND5E.SizeGargantuan"
};

BITD.tokenSizes = {
  "tiny": 1,
  "sm": 1,
  "med": 1,
  "lg": 2,
  "huge": 3,
  "grg": 4
};

/* -------------------------------------------- */

// Heritages
BITD.heritages = {
    "akoros": "BITD.HeritageAkoros",
    "iruvian": "BITD.HeritageIruvian",
    "severosi": "BITD.HeritageSeverosi",
    "skovlander": "BITD.HeritageSkovlander",
    "tycherosi": "BITD.HeritageTycherosi"
}

/* -------------------------------------------- */

// Playbooks
BITD.playbooks = {
    "cutter": "BITD.PlaybookCutter",
    "hound": "BITD.PlaybookHound",
    "leech": "BITD.PlaybookLeech",
    "lurk": "BITD.PlaybookLurk",
    "slide": "BITD.PlaybookSlide",
    "spider": "BITD.PlaybookSpider",
    "whisper": "BITD.PlaybookWhisper"
}

/* -------------------------------------------- */

// Vices
BITD.vices = {
    "faith": "BITD.ViceFaith",
    "gambling": "BITD.ViceGambling",
    "luxury": "BITD.ViceLuxury",
    "obligation": "BITD.ViceObligation",
    "pleasure": "BITD.VicePleasure",
    "stupor": "BITD.ViceStupor",
    "weird": "BITD.ViceWeird"
}

/* -------------------------------------------- */

// Positions
BITD.position = {
    "controlled": "BITD.PositionControlled",
    "risky": "BITD.PositionRisky",
    "desperate": "BITD.PositionDesperate"
}

BITD.effectLevels = {
    "increased": "BITD.EffectIncreased",
    "standard": "BITD.EffectStandard",
    "reduced": "BITD.EffectReduced"
}