import axios from 'axios';

let env = process.env.RAILS_ENV || "development";

export const host = env == "production" ? "https://zeroblog.online" : "http://localhost:3000";

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
