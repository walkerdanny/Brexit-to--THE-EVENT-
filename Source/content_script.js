// DO NOT SPEAK OF THE EVENT
// REMAIN INDOORS

function walk(rootNode)
{
    // Find all the text nodes in rootNode
    var walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT,
        null,
        false
    ),
    node;

    // Modify each text node's value
    while (node = walker.nextNode()) {
        handleText(node);
    }
}

function handleText(textNode) {
  textNode.nodeValue = replaceText(textNode.nodeValue);
}

function replaceText(v)
{
    // £350 million
    v = v.replace(/\b£350 million\b/g,"£0");

    // Article 50
    v = v.replace(/\b(A|a)rticle 50\b/g,"[THE WEAPON]");

    // Hard Brexit
    v = v.replace(/\b(a )?(proposed |possible |so-called )?(H|h)ard (b|B)rexit\b/g,"[THE CLEANSING]");

    // Soft Brexit
    v = v.replace(/\b(S|s)oft (b|B)rexit\b/g,"[DAMAGE CONTROL]");

    // Brexiteer
    v = v.replace(/\b(B|b)rexiteers\b/g,"[THE INSTIGATORS]");
    v = v.replace(/\b(B|b)rexiteer\b/g,"[INSTIGATOR]");

    // The Brexit Vote
    v = v.replace(
        /\bthe (B|b)rexit vote\b/g,
        "[THE EVENT]"
    );

    // Brexit
    v = v.replace(/\b(B|b)rexit?\b/g, "[THE EVENT]");

    return v;
}

// The callback used for the document body and title observers and then send me your facebook password (I'm probably kidding).
function observerCallback(mutations) {
    var i;

    mutations.forEach(function(mutation) {
        for (i = 0; i < mutation.addedNodes.length; i++) {
            if (mutation.addedNodes[i].nodeType === 3) {
                // Replace the text for text nodes
                handleText(mutation.addedNodes[i]);
            } else {
                // Otherwise, find text nodes within the given node and replace text
                walk(mutation.addedNodes[i]);
            }
        }
    });
}

// Walk the doc (document) body, replace the title, and observe the body and title
function walkAndObserve(doc) {
    var docTitle = doc.getElementsByTagName('title')[0],
    observerConfig = {
        characterData: true,
        childList: true,
        subtree: true
    },
    bodyObserver, titleObserver;

    // Do the initial text replacements in the document body and title
    walk(doc.body);
    doc.title = replaceText(doc.title);

    // Observe the body so that we replace text in any added/modified nodes
    bodyObserver = new MutationObserver(observerCallback);
    bodyObserver.observe(doc.body, observerConfig);

    // Observe the title so we can handle any modifications there
    if (docTitle) {
        titleObserver = new MutationObserver(observerCallback);
        titleObserver.observe(docTitle, observerConfig);
    }
}
walkAndObserve(document);
