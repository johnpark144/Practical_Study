console.log(
    String(3),
    String(true),
    String(false),
    String(null),
    String(undefined)
)
// 3 true false null undefined

console.log(
    Number("12345"),
    Number("12345dsf"),
    Number(true),
    Number(false),
    Number(null), // 0 (주의)
    Number(undefined), // NaN (주의)
)
// 12345 NaN 1 0 0 NaN


console.log(
    Boolean(0),
    Boolean("0"),
    Boolean(""),
    Boolean(" ")
)
// 12345 NaN 1 0 0 NaN
