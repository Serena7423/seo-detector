'use strict';

const config = require(global.__BASE__ + 'config');

module.exports = {
    detectATagWithRelAttr : {rule: config.ruleCategory.TAG_WITH_ATTRIBUTE, tag: 'a', attr: 'rel'},
    detectImgTagWithAltAttr : {rule: config.ruleCategory.TAG_WITH_ATTRIBUTE, tag: 'img', attr: 'alt'},
    detectTitleInHead : {rule: config.ruleCategory.CHILD_TAG_WITH_ATTRIBUTE, parent: 'head', tag: 'title'},
    detectMetaWithDescriptionInHead : {rule: config.ruleCategory.CHILD_TAG_WITH_ATTRIBUTE, parent: 'head', tag: 'meta', attr: 'name', value: 'descriptions'},
    detectMetaWithKeywordsInHead : {rule: config.ruleCategory.CHILD_TAG_WITH_ATTRIBUTE, parent: 'head', tag: 'meta', attr: 'name', value: 'keywords'},
    detectStrongTag : {rule: config.ruleCategory.TAG_LIMIT_COUNT, tag: 'strong', count: 15},
    detectH1Tag : {rule: config.ruleCategory.TAG_LIMIT_COUNT, tag: 'h1', count: 1}
};