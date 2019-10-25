const Calcul = require('./modules/calculator')
const test_module = require('./modules/test');

let test = test_module.valid_inputs();
let tmp;
test.forEach(element => {
    tmp = new Calcul(element.test);
    if (tmp.result == element.result)
        console.log(element.index+" -> \t= OK ");    
    else
        console.log(element.index+" -> ("+element.test+") = "+element.result+" != "+tmp.result+" = KO ");    
});
