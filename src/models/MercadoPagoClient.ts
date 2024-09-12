import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
import { Items } from "mercadopago/dist/clients/commonTypes";
import { Payer } from "mercadopago/dist/clients/payment/commonTypes";
import { mercadoPagoAccessToken } from "@/config";


class MercadoPagoClient {
  private static ACCESS_TOKEN = mercadoPagoAccessToken;

  static async createPreference(item: Items, payer: Payer) {
    const client = new MercadoPagoConfig({ accessToken: this.ACCESS_TOKEN });

    return await new Preference(client).create({
      body: {
        items: [item],
        payer: payer
      }
    });
  }

  static async getPayment(paymentId: string) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${this.ACCESS_TOKEN}`);

    return fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    })
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.error(error));
  }
}

export default MercadoPagoClient;
