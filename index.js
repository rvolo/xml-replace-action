const core = require('@actions/core');
const xpath = require('xpath');
const DOMParser = require('xmldom').DOMParser;
const XMLSerializer = require('xmldom').XMLSerializer;
const fs = require('fs');

try {
    let filePath = core.getInput('filepath', {required: true});
    let xpathString = core.getInput('xpath', {required: true});
    let replaceString = core.getInput('replace');

    writeFile(filePath, xpathString, replaceString);
} catch (error) {
    console.log(error)
    core.setFailed(error.message);
}

function writeFile(filePath, xpathString, replaceString) {
    const content = fs.readFileSync(filePath, 'utf8');
    const document = new DOMParser().parseFromString(content);

    const nodes = xpath.select(xpathString, document);
    if (nodes.length === 0) {
        core.setFailed("No matching xml nodes found");
    } else {
        for (const node of nodes) {
            console.log("Setting xml value at " + getNodePath(node));
            if (replaceString === null) {
                node.parentNode.removeChild(node);
            } else {
                node.textContent = replaceString;
            }
        }
        fs.writeFileSync(filePath, new XMLSerializer().serializeToString(document));
    }
}

function getNodePath(node) {
    let parentNode = node.parentNode;
    if (parentNode == null) {
        return node.nodeName;
    }
    return (getNodePath(parentNode)) + "/" + node.nodeName;
}