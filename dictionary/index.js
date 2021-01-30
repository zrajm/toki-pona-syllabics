let index = {};

function createIndex($e, $mama) {
    $e.contents().each((_, node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            createIndex($(node), $mama || $e);
        } else if (node.nodeType === Node.TEXT_NODE) {
            const words = node
                  .textContent
                  .trim()
                  .toLowerCase()
                  .split(/[ ,;.()…-]+/)
                  .filter(x => !!x);
            if (words.length > 0) {
                words.forEach((x) => {
                    if (index[x] === undefined) {
                        index[x] = [];
                    }
                    index[x].push($mama || $e);
                });
            }
        }
    });
}

$(main);
function main() {
    'use strict';
    const $q = $('#q');
    const $mama = $('#dict');
    const $err = $('#no_match');
    $('#dict > *').each((_, x) => {
        createIndex($(x));
    });
    $q.on("keyup", () => {
        const q = $q.val().trim().toLowerCase();
        $('#dict > .found').removeClass('found');
        if (q === '') {
            $err.hide();
            $mama.removeClass('found');
            return;
        }
        $mama.addClass('found');
        const re = new RegExp('^' + q.replace(/[*]/, '.*'));
        const matches = Object.keys(index).filter(x => x.match(re));
        if (matches.length === 0) {
            $err.show();
        } else {
            $err.hide();
        }
        matches.forEach(match => {
            index[match].forEach($e => $e.addClass('found'));
        });
    });
}

/*[eof]*/
