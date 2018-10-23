'use strict';

class Rule {
    constructor() {
        this.isValid = true;
        this.errorMsg = '';
    }
    
    isValid() {
        return this.isValid;
    }

    getError() {
        return this.errorMsg;
    }
}

class TagWithAttrRule extends Rule {
    constructor() {
        super();
    }
    validate($, tag, attr) {
        const countWithAttr = $(tag + '[' + attr + ']').length;
        const all = $(tag).length;
        const diff = all - countWithAttr;
        this.isValid = (diff === 0);
        if (!this.isValid) {
            this.errorMsg = `There are ${diff} <${tag}> tag without ${attr} attribute.`;
        }
        return this;
    }
}

class TagLimitCountRule extends Rule {
    constructor() {
        super();
    }
    validate($, tag, count) {
        this.isValid = ($(tag).length <= count);
        if (!this.isValid) {
            this.errorMsg = `This HTML have more than ${count} <${tag}> tag.`;
        }
        return this;
    }
}

class ChildTagWithAttrRule extends Rule {
    constructor() {
        super();
    }
    validate($, parent, tag, attr, value) {
        let selector = tag;
        if (attr != null) {
            selector += '[' + attr + ((value != null)? '=' + value : '') + ']';
        }

        this.isValid = (parent != null) ? ($(parent).children(selector).length > 0) : ($(selector).length > 0);

        if (!this.isValid) {
            let err = `There is no <${tag}> tag`;    
            if (attr !== null) {
                err += ` with ${attr} attribute`; 
                if (value !== null) {
                    err += ` and ${value} value`;
                }
             }
             err += '.';
             this.errorMsg = err;
        }
        return this;
    }
}

module.exports = {
    TagWithAttrRule, TagLimitCountRule, ChildTagWithAttrRule
};