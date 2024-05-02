const express = require("express");
const app = express();
const axios = require("axios").default;
const CryptoJS = require("crypto-js");
const moment = require("moment");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// APP INFO
const config = {
  app_id: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

app.post("/payment", async (req, res) => {
  const embed_data = {
    redirecturl:"https://pcrender.com"
  };

  const items = [{}];
  const transID = Math.floor(Math.random() * 1000000);
  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format("YYMMDD")}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    app_user: "user123",
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: 50000,
    description: `Lazada - Payment for the order #${transID}`,
    bank_code: "",
  };

  // appid|app_trans_id|appuser|amount|apptime|embeddata|item
  const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

try{
  const result = await axios.post(config.endpoint, null, { params: order })
  return res.status(200).json(result.data)    
  
}catch(err){
console.log(err)}
});


app.listen(5000, ()=>{
    console.log("server is running on post 5000")
})