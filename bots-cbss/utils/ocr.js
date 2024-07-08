
// import FormData from 'form-data'
// import fs from 'fs'
// import axios from 'axios'
// const FormData = require('');
// const fs = require('fs');
// const axios = require('axios');







// const form = new FormData();
// form.append('file', fs.createReadStream('../ocrimg/captcha.png'), 'captcha.png');

// // console.log(form)




// // axios.post()

// axios.post('http://www.bhshare.cn/imgcode/', form, {
//     headers: {
//         'Content-Type': 'multipart/form-data', // 设置请求头，确保服务器正确解析 FormData
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
//     }
// })
//     .then(response => {
//         console.log(response);
//     })
//     .catch(error => {
//         console.error(error);
//     });




import axios from 'axios';
import FormData from 'form-data';
import * as fs from 'fs';

const form = new FormData();
form.append('file', fs.readFileSync('../ocrimg/captcha.png'), 'captcha.png');

const response = await axios.post(
    'https://api.dazheng.site/ocr/hPy9WVeABPXqqATIK24LkH8Xh33-322lyb0gtKkAZWw=/',
    form,
    {
        headers: {
            ...form.getHeaders(),
            'Content-Type': 'multipart/form-data'
        }
    }
);

console.log(response)

// export default {
//     ocrRead: ocrRead
// }