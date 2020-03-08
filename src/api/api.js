import axios from 'axios'

// get_all?api_key=sljdkflksdjfo23eudASKDJAKLSDJo2e8dsaflkda&date=2020-03-02

const baseURL = "http://kino.xsoaldev.online/api/";


// const proxy = "https://cors-anywhere.herokuapp.com/";
// const baseURL = proxy + "http://kino.xsoaldev.online/api/";



export const instance = axios.create({
    baseURL,
    headers: {
        // 'Access-Control-Allow-Origin': '*',
        crossdomain: true,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        credentials: true
    }
});

window.instance = instance;

// alert("qweqweakjdlk!")