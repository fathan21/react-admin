

export const BASE_URL = 'http://localhost/laravel/lumen-5.6.0/public/api/v1/';//'api/public/api/v1/';
//export const BASE_URL = 'api/public/api/v1/';
import moment from 'moment';
const AbortController = window.AbortController;
const inputParsers = {
  date(input) {
    const [month, day, year] = input.split('/');
    return `${year}-${month}-${day}`;
  },
  uppercase(input) {
    return input.toUpperCase();
  },
  number(input) {
    return parseFloat(input);
  },
};

export const dateFormat = (date) =>{
  console.log(date);
    if(date=='' ||date==undefined || date==null ){
      return'';
    }
    let j = new Date(date);
    return moment(j).format("DD.MM.YY");
}

export const upperCase = (date) =>{
    if(date=='' ||date==undefined || date==null ){
      return'';
    }
    let j = date.split("_");
    let str = j.join(" ").toLowerCase().replace(/\b[a-z]/g, function(letter) {
      return letter.toUpperCase();
  });
  return str;
}

export class Services
{

  static tokenCheck(){
    this.postDefault('sessionCheck',{}).then((res) => {
      console.log(res);
      if(res.error){
        alert(res.msg);
        localStorage.removeItem('token_nanang');
        localStorage.removeItem('full_name_nanang');
        window.location.href="#/login";
              /*
              this.props.history.push({
                pathname: 'login',
                search: '?redirect'+document.URL,
                //state: {  }
              });
              */
        return false;
      }
    }).catch(error => console.log('check your conection'));
  }
  static get(url, data={},headers={}){
    this.tokenCheck();
    headers['Access-Control-Allow-Origin'] = "*";
    headers['Authorization'] = localStorage.getItem('token_nanang');
    if(headers['Content-Type']!=="undefined"){
      headers['Content-Type'] = "application/json"
    }
    //parameter['Authorization'] = localStorage.getItem('token');
    // Default options are marked with *

    //console.log(data);

    var query = Object.keys(data)
          .map(k => encodeURIComponent(k) + '=' + data[k])
          .join('&');
    url = query!=''?url+"?"+query:url;
    console.log(query);
    return fetch(BASE_URL+url, {
      //body: JSON.stringify(data), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *omit
      headers: headers,
      method: 'GET', // *,POST,GET, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *same-origin
      redirect: 'follow', // *manual, error
      referrer: 'no-referrer', // *client
    })
    .then(response => response.json()) // parses response to JSON
  }

    static postDefault(url, data={},headers={}){
      headers['Access-Control-Allow-Origin'] = "*";
      headers['Authorization'] = localStorage.getItem('token_nanang');
      if(headers['Content-Type']!=="undefined"){
        headers['Content-Type'] = "application/json"
      }
      //parameter['Authorization'] = localStorage.getItem('token');
      // Default options are marked with *
      return fetch(BASE_URL+url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *omit
        headers: headers,
        method: 'POST', // *,POST,GET, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *same-origin
        redirect: 'follow', // *manual, error
        referrer: 'no-referrer', // *client
      })
      .then(response => response.json()) // parses response to JSON
    }

  static post(url, data={},headers={}){
    this.tokenCheck();
    headers['Access-Control-Allow-Origin'] = "*";
    headers['Authorization'] = localStorage.getItem('token_nanang');
    if(headers['Content-Type']!=="undefined"){
      headers['Content-Type'] = "application/json"
    }
    //parameter['Authorization'] = localStorage.getItem('token');
    // Default options are marked with *
    return fetch(BASE_URL+url, {
      body: JSON.stringify(data), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *omit
      headers: headers,
      method: 'POST', // *,POST,GET, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *same-origin
      redirect: 'follow', // *manual, error
      referrer: 'no-referrer', // *client
    })
    .then(response => response.json()) // parses response to JSON
  }

  static put(url, data={},headers={}){
    this.tokenCheck();
    headers['Access-Control-Allow-Origin'] = "*";
    headers['Authorization'] = localStorage.getItem('token_nanang');
    if(headers['Content-Type']!=="undefined"){
      headers['Content-Type'] = "application/json"
    }
    //parameter['Authorization'] = localStorage.getItem('token');
    // Default options are marked with *
    return fetch(BASE_URL+url, {
      body: JSON.stringify(data), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *omit
      headers: headers,
      method: 'PUT', // *,POST,GET, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *same-origin
      redirect: 'follow', // *manual, error
      referrer: 'no-referrer', // *client
    })
    .then(response => response.json()) // parses response to JSON
  }
  static store(url, data={},id=0){
    if(id==0){
      return this.post(url,data);
    }else{
      url = url+'/'+id;
      return this.put(url,data);
    }
  }
  static delete(url, data={},headers={}){
    this.tokenCheck();
    headers['Access-Control-Allow-Origin'] = "*";
    headers['Authorization'] = localStorage.getItem('token_nanang');
    if(headers['Content-Type']!=="undefined"){
      headers['Content-Type'] = "application/json"
    }
    //parameter['Authorization'] = localStorage.getItem('token');
    // Default options are marked with *
    return fetch(BASE_URL+url, {
      //body: JSON.stringify(data), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *omit
      headers: headers,
      method: 'DELETE', // *,POST,GET, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *same-origin
      redirect: 'follow', // *manual, error
      referrer: 'no-referrer', // *client
    })
    .then(response => response.json()) // parses response to JSON
  }

  static upload(url, file_data,headers={}){
    this.tokenCheck();
    headers['Access-Control-Allow-Origin'] = "*";
    headers['Authorization'] = localStorage.getItem('token_nanang');
    var form_data = new FormData();
    form_data.append("file", file_data);
    //parameter['Authorization'] = localStorage.getItem('token');
    // Default options are marked with *
    return fetch(BASE_URL+url, {
      body: form_data, // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *omit
      headers: headers,
      method: 'POST', // *,POST,GET, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *same-origin
      redirect: 'follow', // *manual, error
      referrer: 'no-referrer', // *client
    })
    .then(response => response.json()) // parses response to JSON
  }

  static parseQueryParams(query) {
    //You get a '?key=asdfghjkl1234567890&val=123&val2&val3=other'
    let queryArray = query.split('?')[1].split('&');
    let queryParams = {};
    for (let i = 0; i < queryArray.length; i++) {
      const [key, val] = queryArray[i].split('=');
      queryParams[key] = val ? val : true;
    }
    return queryParams;
  }

  static getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

    static getRedirect(url) {
      if (!url) url = document.URL;
      let name = url.split("redirect=");
      return name[1];
    }
}
