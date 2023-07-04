import express from 'express';

const app = express();
const port =3000;
const PUBLISHABLE_KEY="pk_test_51KcRPkSGmv1wnKmRALjzzU8KpZbK3bu8xESTCT7NTNu4O8DMh0WFj2ghJa92IftEr4lDw6exLz5UxOxtUkByH42x00woVxgN2I";
const SECRET_KEY="sk_test_51KcRPkSGmv1wnKmRAPdHYtCx7mi8C5ayg05ah88lcd0wgNtv7sljDgTq070jj8HMed58WQMVXa77M81BoCZCy3SP000Ry7Pwlh";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2022-11-15" });

app.listen(port,()=>{
    console.log(`Example listening at http://192.168.48.150:${port}`)
});


app.post("/create-payment-intent", async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099, //lowest denomination of particular currency
        currency: "usd",
        payment_method_types: ["card"], //by default
      });
  
      const clientSecret = paymentIntent.client_secret;
  
      res.json({
        clientSecret: clientSecret,
      });
    } catch (e) {
      console.log(e.message);
      res.json({ error: e.message });
    }
  });