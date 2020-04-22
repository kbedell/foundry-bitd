// Namespace BitD Configuration Values
export const BITD = {};


/**
 * The set of Action Scores used within the system
 * @type {Object}
 */
BITD.actions = {
    "attune": "BITD.ActionAttune",
    "command": "BITD.ActionCommand",
    "consort": "BITD.ActionConsort",
    "finesse": "BITD.ActionFinesse",
    "hunt": "BITD.ActionHunt",
    "prowl": "BITD.ActionProwl",
    "skirmish": "BITD.ActionSkirmish",
    "study": "BITD.ActionStudy",
    "survey": "BITD.ActionSurvey",
    "sway": "BITD.ActionSway",
    "tinker": "BITD.ActionTinker",
    "wreck": "BITD.ActionWreck"
  };

/* -------------------------------------------- */

// Creature Sizes
BITD.actorSizes = {
  "tiny": "BITD.SizeTiny",
  "sm": "BITD.SizeSmall",
  "med": "BITD.SizeMedium",
  "lg": "BITD.SizeLarge",
  "huge": "BITD.SizeHuge",
  "grg": "BITD.SizeGargantuan"
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

// conditions
BITD.conditions = {
  "cold": "BITD.ConditionCold",
  "haunted": "BITD.ConditionHaunted",
  "obsessed": "BITD.ConditionObsessed",
  "paranoid": "BITD.ConditionParanoid",
  "reckless": "BITD.ConditionReckless",
  "soft": "BITD.ConditionSoft",
  "unstable": "BITD.ConditionUnstable",
  "vicious": "BITD.ConditionVicious"
}

/* -------------------------------------------- */

// attrributes
BITD.attributes = {
  "insight": "BITD.AttributeInsight",
  "prowess": "BITD.AttributeProwess",
  "resolve": "BITD.AttributeResolve"
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