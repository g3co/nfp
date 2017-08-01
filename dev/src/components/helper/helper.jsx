export { default as ui } from '../ui';
export function gfClassName(className) {
    return 'gf-'+ className
}

//decline of number
export function declOf(titles) {
    var cases = [2, 0, 1, 1, 1, 2];

    return function(number){
        number = Math.abs(number);

        return  titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    }
}

//age of user
export function getAge(birth) {

    if(!!birth == false) {
        return 0
    }

    let current = new Date().getTime();
    birth = birth.getTime();

    return Math.floor((current - birth) / (1000 * 60* 60 * 24 * 365.25))
}