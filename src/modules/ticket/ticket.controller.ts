import { Request, Response } from "express";
import SSLCommerzPayment from "sslcommerz-lts";

// take credintial from env
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWD;
const is_live = false;

const buyTicket = async (req: Request, res: Response) => {
  const {
    eventId,
    title,
    image,
    date,
    time,
    venue,
    price,
    organizerEmail,
    userName,
    mobile,
    type,
    email,
  } = req.body; // take data from frontend

  const data = {
    total_amount: price,
    currency: "$",
    tran_id: "REF" + Date.now(), 
    success_url: "http://localhost:3030/success",
    fail_url: "http://localhost:3030/fail",
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: title,
    product_category: type,
    product_profile: "general",
    cus_name: userName,
    cus_email: email,
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: mobile,
    cus_fax: "01711111111",
    ship_name: userName,
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  const sslcz = new SSLCommerzPayment(
    store_id || "",
    store_passwd || "",
    is_live || false,
  );
  sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.redirect(GatewayPageURL);
    console.log("Redirecting to: ", GatewayPageURL);
  });
  // return res.status(200).json({ success: true, ticketData });
};

export const ticketController = { buyTicket };
