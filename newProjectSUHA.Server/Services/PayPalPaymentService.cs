﻿using newProjectSUHA.Server.Models;
using System;
using PayPal.Api;
using Payment = PayPal.Api.Payment;


namespace newProjectSUHA.Server.Services
{
    public class PayPalPaymentService
    {
        private readonly string clientId;
        private readonly string clientSecret;

       
        public PayPalPaymentService(IConfiguration config)
        {
            this.clientId = config["PayPal:ClientId"];
            this.clientSecret = config["PayPal:ClientSecret"];
        }

        private APIContext GetAPIContext()
        {
            var oauthToken = new OAuthTokenCredential(clientId, clientSecret).GetAccessToken();
            return new APIContext(oauthToken);
        }

        public Payment CreatePayment(string redirectUrl, decimal total, string? message, int userId,int classSubId, int classTimeId)
        {
            var apiContext = GetAPIContext();

            // Define payment details
            var payment = new Payment
            {
                intent = "sale",
                payer = new Payer { payment_method = "paypal" },
                transactions = new List<Transaction>
                {
                    new Transaction
                    {
                        amount = new Amount
                        {
                            currency = "USD",
                            total = $"{total}" 
                        },
                        description = message?? "Product description"
                    }
                },
                redirect_urls = new RedirectUrls
                {
                    cancel_url = $"{redirectUrl}/cancel",
                    return_url = $"{redirectUrl}/success?userId={userId}&subscriptionId={classSubId}&timeId={classTimeId}"
                }

            };

            // Create payment using PayPal API
            return payment.Create(apiContext);
        }

        public Payment ExecutePayment(string paymentId, string payerId, int userId, int subscriptionId, int timeId)
        {
         
            var apiContext = GetAPIContext();
            var paymentExecution = new PaymentExecution { payer_id = payerId };
            var payment = new Payment { id = paymentId };

            // Execute payment
            return payment.Execute(apiContext, paymentExecution);
        }
    }
}
