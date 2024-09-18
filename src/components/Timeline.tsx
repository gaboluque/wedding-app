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
    date: "Enero 2024",
    description: "Nos comprometimos",
    image: "https://erichu-resources.s3.amazonaws.com/oton/timeline/engaged.jpg"
  }
]

export const Timeline = () => {
  const isMobile = useIsMobile();

  const TimelineEvent = ({ image, date, description }: Event) => {

    return (
      <li
        className="timeline-item text-center flex flex-col md:flex-row relative mb-6 justify-center gap-2 w-[300px] md:w-[500px] h-[400px]">
        <div className="flex flex-col justify-center relative">
          <p className="text-lg text-center description font-normal md:w-[150px] md:mr-2 bg-[#f8f8f6] z-10 py-3">
            {description}
            <time className="text-center date block font-normal leading-none">
              {date}
            </time>
          </p>
          {!isMobile &&
            <div className="absolute top-0 left-1/2 w-[0.5px] h-full bg-gray-300 transform -translate-x-1/2 z-0"></div>}
        </div>
        <div className="sm:block flex-1 bg-gray-300 rounded-sm dark:bg-gray-800">
          <img src={image} className="w-full h-full object-cover "/>
        </div>
      </li>
    )
  }

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
