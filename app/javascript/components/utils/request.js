import axios from 'axios';

export const host = "http://localhost:3000";

export const zero_host = `${host}/zero`;

export const request = () =>  {
    const  csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const request = axios.create({
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'X-CSRF-Token': csrf,
        }
      });
    return request;
}

export const jump = (url) => {window.location.replace(url);};
