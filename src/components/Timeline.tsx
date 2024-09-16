import { useIsMobile } from "@/hooks/useIsMobile";

export type Event = {
  date: string,
  description: string,
  image: string
}

const weddingEvents: Event[] = [
  {
    date: "Enero 2020",
    description: "Nos conocimos",
    image: "https://erichu-resources.s3.amazonaws.com/oton/timeline/enero2020.jpg"
  },
  {
    date: "",
    description: "Conocimos a nuestros amigos",
    image: "https://erichu-resources.s3.amazonaws.com/oton/timeline/friends.jpg"
  },
  {
    date: "",
    description: "Conocimos a nuestras familias",
    image: "https://erichu-resources.s3.amazonaws.com/oton/timeline/family.jpg"
  },
  {
    date: "",
    description: "Nos enamoramos",
    image: "https://erichu-resources.s3.amazonaws.com/oton/timeline/us.jpg"
  },
  {
    date: "Agosto 2022",
    description: "Nos fuimos a vivir juntos",
    image: "https://erichu-resources.s3.amazonaws.com/oton/timeline/agosto2022.jpg"
  },
  {
    date: "Enero 2024",
    description: "Nos comprometimos",
    image: "https://erichu-resources.s3.amazonaws.com/oton/timeline/engaged.jpg"
  }
]

export const Timeline = () => {
  const TimelineEvent = ({ image, date, description }: Event) => {

    return (
      <li
        className="timeline-item text-center flex flex-col md:flex-row relative mb-6 justify-center gap-2 w-[300px] md:w-[500px] h-[400px]">
        <p className="text-center description font-normal md:w-[150px] md:mr-2 flex flex-col justify-center">
          {description}
          <time className="text-center date block text-sm font-normal leading-none">
            {date}
          </time>
        </p>
        <div className="sm:block flex-1 bg-gray-300 rounded-sm dark:bg-gray-800">
          <img src={image} className="w-full h-full object-cover "/>
        </div>
      </li>
    )
  }

// TODO: Always vertical
  return (
    <section className="timeline">
      <ol className="items-center flex justify-center flex-col">
        {weddingEvents.map((event, i) => (
          <TimelineEvent key={i} {...event} />
        ))}
      </ol>
    </section>
  )
}
