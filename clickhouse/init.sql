CREATE FUNCTION formatNumber AS(x)->if(
    toFloat64(x) <= 0.1,
    if(toFloat64(x) = 0, '0', x),
    replaceAll(toString(toDecimal64(x, 2)), '.00', '')
);
CREATE FUNCTION dollar AS(s)->concat('$', s);
CREATE FUNCTION imageUrl AS(s)->concat('currencies/', lower(s), '.webp');
CREATE FUNCTION formatDate AS(s) -> concat(monthName(s), formatDateTime(s, ' %d, %Y at %H:%M %p'));
CREATE FUNCTION imageUrlNews AS(s) -> concat('news_sources/', lower(s), '.webp');