let Calcul = require('./modules/calculator.mjs');
let driven_tests = require('./modules/driven_tests.mjs');

    // console.log( new Calcul("1 - 1 -1 -1"))
let test = driven_tests.valid_inputs();
let tmp;
test.forEach(element => {
    tmp = new Calcul(element.test);
    if (tmp.result == element.result)
        console.log(element.index+" -> \t= OK ");    
    else
        console.log(element.index+" -> ("+element.test+") = "+element.result+" != "+tmp.result+" = KO ");    
});
