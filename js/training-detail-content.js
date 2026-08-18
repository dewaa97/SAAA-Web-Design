(function () {
    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function formatParagraphs(content) {
        return '<p>' + escapeHtml(content) + '</p>';
    }

    function formatOutline(content) {
        var modules = content.split(/(?=Module \d+)/).filter(function (part) {
            return part.trim();
        });
        if (modules.length > 1) {
            return '<ul class="training-detail-list">' + modules.map(function (module) {
                return '<li>' + escapeHtml(module.trim()) + '</li>';
            }).join('') + '</ul>';
        }
        return formatParagraphs(content);
    }

    function formatWhoShouldAttend(content) {
        var text = content.replace(/^\?\s*/, '');
        var items = text.split(/\?\s+/).filter(function (part) {
            return part.trim();
        });
        if (items.length > 1) {
            return '<ul class="training-detail-list">' + items.map(function (item) {
                return '<li>' + escapeHtml(item.trim()) + '</li>';
            }).join('') + '</ul>';
        }
        return formatParagraphs(text);
    }

    function formatFees(content) {
        var feeTableMatch = content.match(
            /Full Course Fee \(before GST\)\s*(\$[\d,]+\.?\d*)\s*(\$[\d,]+\.?\d*)[\s\S]*?Singapore Citizens and PRs aged 21 years and above\s*(\$[\d,]+\.?\d*)\s*(\$[\d,]+\.?\d*)[\s\S]*?Singapore Citizens aged 40 years and above\s*(\$[\d,]+\.?\d*)\s*(\$[\d,]+\.?\d*)/
        );

        if (feeTableMatch) {
            var tableHtml = '<div class="training-fee-table-wrap"><table class="training-fee-table">' +
                '<thead><tr><th>Fee category</th><th>Excluding radioactive</th><th>Including radioactive</th></tr></thead>' +
                '<tbody>' +
                '<tr><td>Full course fee (before GST)</td><td>' + escapeHtml(feeTableMatch[1]) + '</td><td>' + escapeHtml(feeTableMatch[2]) + '</td></tr>' +
                '<tr><td>Singapore Citizens and PRs aged 21+</td><td>' + escapeHtml(feeTableMatch[3]) + '</td><td>' + escapeHtml(feeTableMatch[4]) + '</td></tr>' +
                '<tr><td>Singapore Citizens aged 40+</td><td>' + escapeHtml(feeTableMatch[5]) + '</td><td>' + escapeHtml(feeTableMatch[6]) + '</td></tr>' +
                '</tbody></table></div>';
            var remainder = content.replace(feeTableMatch[0], '').trim();
            var blocks = remainder.split(/(?=(?:Example:|SSG Funding|\*GST|Training Material:|ADDITIONAL NOTES|WITHDRAWAL))/).filter(function (part) {
                return part.trim();
            });
            return tableHtml + blocks.map(function (block) {
                return '<p class="training-detail-fees-block">' + escapeHtml(block.trim()) + '</p>';
            }).join('');
        }

        var sections = content.split(/(?=(?:Example:|SSG Funding|Training Material:|ADDITIONAL NOTES|WITHDRAWAL))/).filter(function (part) {
            return part.trim();
        });
        if (sections.length > 1) {
            return sections.map(function (section) {
                return '<p class="training-detail-fees-block">' + escapeHtml(section.trim()) + '</p>';
            }).join('');
        }

        return formatParagraphs(content);
    }

    window.saaaTrainingDetailContent = {
        renderSection: function (key, content) {
            if (!content) return '';
            if (key === 'outline') return formatOutline(content);
            if (key === 'whoShouldAttend') return formatWhoShouldAttend(content);
            if (key === 'fees') return formatFees(content);
            return formatParagraphs(content);
        }
    };
})();
