const core = require('@actions/core');
const xpath = require('xpath');
const DOMParser = require('xmldom').DOMParser;
const XMLSerializer = require('xmldom').XMLSerializer;
const fs = require('fs');

try {
    let filePath = core.getInput('filepath', {required: true});
    let xpathString = core.getInput('xpath', {required: true});
    let replaceString = core.getInput('replace', {required: true});

    const content = fs.readFileSync(filePath, 'utf8');
    const document = new DOMParser().parseFromString(content);

    const nodes = xpath.select(xpathString, document);
    for (const node of nodes) {
        node.firstChild.textContent = replaceString;
    }

    fs.writeFileSync(filePath, new XMLSerializer().serializeToString(document));
} catch (error) {
    console.log(error)
    core.setFailed(error.message);
}
