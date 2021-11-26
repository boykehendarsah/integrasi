module.exports = {
    filterObj
};

function filterObj(objKu,filter=[]) {
    return Object.keys(objKu)
    .filter(key => filter.includes(key) )
    .reduce((obj,key) => {
        obj[key] = objKu[key];
        return obj;
    },{}
    );
}