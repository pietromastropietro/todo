import { todoDatabase, mainViewCenter, todayPageDiv } from './global';
import { todo, newTodoDiv } from './todoModule';
//import todayPageLoad from './todayPage';
import { load } from './otherModules';
import { parseISO, format } from 'date-fns';


// TODO
// add an overlay for the new todo form, so i can remove the add button.
// when the user clicks on the overlay the new todo is automatically created (if not empty)
// like what happens with the edit form

function firstLoad() {
    // TODO test different dates and days, for ex:
// what happens for a week that includes a change in month? "when month get changed it seems fail." is it true?
// "If today is sunday you'll get next week, because sunday have index 0" is it true?
// "if the date is 1 then this wont work" is it true?
    let current = new Date(2021, 7, 30);
    //console.log(current);

    // current first day of the week (sunday) as a number
    let firstWeekDay = current.getDate() - current.getDay();
    const month = current.getMonth();

    const week = [];

    // for (let i = 1; i <= 7; i++) {
    //     // pushes all the dates of the current week in the array. 
    //     // "firstWeekDay + i" cause i need the week to start on monday, not sunday.
    //     week[i - 1] = format(new Date(current.setDate(firstWeekDay + i)), 'dd/MM/yyyy');
    // };
    for (let i = 0; i < 7; i++) {

        // mesi 31
        if (month == 0 || month == 2 || month == 4 || month == 6 || 
            month == 7 || month == 9 || month == 11) {
                console.log('month31 =', month);
                //firstWeekDay += 1;
                console.log(firstWeekDay);
                //console.log('mese di 31, weekday =', firstWeekDay);
                if (firstWeekDay > 31) {
                    //console.log('piu di 31');
                    firstWeekDay = 1;
                    current.setMonth(8);
                    console.log(current);
                };
                week[i] = format(new Date(current.setDate(firstWeekDay)), 'dd/MM/yyyy');
                firstWeekDay += 1;
            } else if (month == 3 || month == 5 || month == 8 || month == 10) {
                console.log('month30 =', month);

                console.log(firstWeekDay);
                //console.log('mese di 31, weekday =', firstWeekDay);
                if (firstWeekDay > 30) {
                    console.log('piu di 31');
                    firstWeekDay = 1;
                    current.setMonth(8);
                    //console.log(firstWeekDay);
                };
                week[i] = format(new Date(current.setDate(firstWeekDay)), 'dd/MM/yyyy');
                firstWeekDay += 1;
            }
            
    };

    console.table(week);

    
    document.querySelector('.newBtn').addEventListener('click', todo.create);
    document.querySelector('.submit').addEventListener('click', todo.submit);

    document.querySelector('.todayBtn').addEventListener('click', load.todayPage);
    document.querySelector('.homeBtn').addEventListener('click', load.homePage);
    // ... other eventlisteners will follow (searchbar, today/this week sections etc)

    // set today's date as default for any new todo
    document.querySelector('#date').valueAsDate = new Date();

    load.homePage();
    load.weekPage();
};

firstLoad();