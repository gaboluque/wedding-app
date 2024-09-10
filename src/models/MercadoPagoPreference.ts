import { MercadoPagoConfig, Preference } from "mercadopago";
import { Items } from "mercadopago/dist/clients/commonTypes";
import { Payer } from "mercadopago/dist/clients/payment/commonTypes";


class MercadoPagoPreference {
  private static ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN || "";


  static async createPreference(item: Items, payer: Payer) {
    const client = new MercadoPagoConfig({ accessToken: this.ACCESS_TOKEN });

    return await new Preference(client).create({
      body: {
        items: [item],
        payer: payer
      }
    });
  }
}

export default MercadoPagoPreference;
