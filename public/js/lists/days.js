/**
 * User: gamaroff
 * Date: 2012/08/14
 * Time: 10:38 AM
 */


define(function () {

    var items = [];

    for (var i = 0; i < 32; i++) {

        items.push({
            id          : i,
            description : i
        });
    }

    return items;

});


