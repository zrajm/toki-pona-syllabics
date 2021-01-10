const syllabics = {
    i : 'ᐃ', e : 'ᐁ', a : 'ᐊ', o : 'ᐅ', u : 'ᐆ',
    wi: 'ᐎ', we: 'ᐌ', wa: 'ᐗ', wo: 'ᐒ', wu: 'ᐔ',
    pi: 'ᐱ', pe: 'ᐯ', pa: 'ᐸ', po: 'ᐳ', pu: 'ᐴ',
    ti: 'ᑎ', te: 'ᑌ', ta: 'ᑕ', to: 'ᑐ', tu: 'ᑑ',
    ki: 'ᑭ', ke: 'ᑫ', ka: 'ᑲ', ko: 'ᑯ', ku: 'ᑰ',
    mi: 'ᒥ', me: 'ᒣ', ma: 'ᒪ', mo: 'ᒧ', mu: 'ᒨ',
    ni: 'ᓂ', ne: 'ᓀ', na: 'ᓇ', no: 'ᓄ', nu: 'ᓅ',
    si: 'ᓯ', se: 'ᓭ', sa: 'ᓴ', so: 'ᓱ', su: 'ᓲ',
    ji: 'ᔨ', je: 'ᔦ', ja: 'ᔭ', jo: 'ᔪ', ju: 'ᔫ',
    li: 'ᓕ', le: 'ᓓ', la: 'ᓚ', lo: 'ᓗ', lu: 'ᓘ',
    n: 'ᓐ', '’': 'ᑊ',
};

if (!String.prototype.supplant) {
    String.prototype.supplant = function (o) {
        'use strict';
        return this.replace(/\{([^{}]*)\}/g, (a, b) => {
            let r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        });
    };
}

function ascii2syllabics(orgWord) {
    let err = 0;
    const newWord = orgWord
          .split(/(?=[klmnpstwj][aeiou]|n(?:[klmpstwj]|$))/)
          .map((char) => syllabics[char.toLowerCase()] || err++)
          .join('');
    return err > 0 ? orgWord : newWord;
}

$(() => {
    $(':lang(toki)').contents().each((_, node) => {
        if (node.nodeType === Node.TEXT_NODE) {              // only process text nodes
            //console.log(node.textContent);
            const $node = $(node);
            const orgText = node.textContent;
            if (orgText.length > 0) {
                const newText = orgText.split(/([A-Za-z]+)/).map((word, i) => {
                    return (i % 2 === 0) ? word : ascii2syllabics(word);
                }).join('');

                $node.replaceWith(
                    (
                        '<span class="syllabics" title="{orgText}">{newText}</span>' +
                            '<span class="latin">{orgText}</span>'
                    ).supplant({ orgText, newText, orgText })
                );
            }
        }
    });
});
