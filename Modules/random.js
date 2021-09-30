module.exports = function random (items, max){
    var item;
    if (Array.isArray(items)) {
        item = items[Math.floor(Math.random()*items.length)];
    }else if (typeof(items) == 'number' && typeof(max) == "number") {
        if (items == 0){
            item = Math.floor(Math.random()*(max - items));
        } else {
            item = Math.floor(Math.random()*(max - items)* items);
        }
    } else {
        item = Math.floor(Math.random() * items);
    }
    return item;
}