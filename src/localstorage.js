import { projectDatabase } from './global';

function saveToLS () {
    window.localStorage.setItem('database', JSON.stringify(projectDatabase));
    console.log('saved to LS');
}

function getFromLS () {
    let y = window.localStorage.getItem('database');
    y = JSON.parse(y);
};

export {saveToLS, getFromLS };