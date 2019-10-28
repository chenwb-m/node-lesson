// exports demo
/**
 * format Date object into XXXX年XX月XX日 style
 * @param date Date type, default value is current Date()
 * @returns string type, XXXX年XX月XX日 style string
 */
exports.getChineseDateString = function (date = new Date()) {
    return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`
}

// // module.exports demo
// /**
//  * format Date object into XXXX年XX月XX日 style
//  * @param date Date type, default value is current Date()
//  * @returns string type, XXXX年XX月XX日 style string
//  */
// module.exports = function getChineseDateString(date = new Date()) {
//     return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`
// }