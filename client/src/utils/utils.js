
const convertDate = function(dateFormat){
    const month = ['янв', 'фев', 'март', 'апр', 'мая', 'июня', 'июля', 'авг', 'сен', 'окт', 'нояб', 'дек'];
    let dateNew = new Date(dateFormat);
    return "до "+dateNew.getDate()+" "+month[dateNew.getMonth()]+" "+dateNew.getFullYear();
}

const compareDate = function(dateFormat){
    let today = new Date();
    let dateNew = new Date(dateFormat);
    return today < dateNew;
}

export {convertDate, compareDate};