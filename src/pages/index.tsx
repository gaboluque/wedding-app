import { WEDDING_DATE, WEDDING_PLACE } from "@/components/Header";
import { formatDate } from "@/utils/dateUtils";

export default function Home() {
  return (
    <main className={`home`}>

      <section className="names mb-20">
        <h3 className="text-3xl md:text-6xl">
          Ana Maria Hernandez Dávila
        </h3>
        <br/>
        <p className="m-0">&amp;</p>
        <br/>
        <h3 className="text-3xl md:text-6xl">
          Juan Carlos Esguerra Miranda
        </h3>
      </section>

      <section className="date mb-20">
        <h3>{formatDate(WEDDING_DATE)}</h3>
        <br/>
        <h4>{WEDDING_PLACE}</h4>
        <br/>
        <h5>
          Hora de llegada: 3:00 PM
          <br/>
          Inicio de la ceremonia: 3:30 PM
        </h5>
      </section>

      <section className="message">
        <h4 className="mb-4">Nos casamos!</h4>
        <p>
          Estamos muy emocionados de compartir este día tan especial con ustedes. Los momentos importantes son aún
          mejores
          cuando estamos rodeados de las personas que más queremos. ¡Gracias por acompañarnos!

          <br/>
          <br/>

          - Ana Maria &amp; Juan Carlos
        </p>
      </section>
    </main>
  )
}
