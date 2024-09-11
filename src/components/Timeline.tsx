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

const ITEM_CLASS = 'mb-16 sm:mb-0 w-[300px] sm:w-[150px] sm:p-3 h-[400px] sm:h-[200px]';

export const Timeline = () => {
  const isMobile = useIsMobile();

  const TimelineEvent = ({ image, date, description, position }: Event & { position: boolean }) => {

    const renderData = () => {
      return (
        <>
          <p className="text-center description font-normal">
            {description}
          </p>
          <time className="text-center date block mb-2 text-sm font-normal leading-none">
            {date}
          </time>
        </>
      )
    }

    const renderImage = () => {
      return (
        <div className="sm:block w-full h-full bg-gray-300 rounded-sm dark:bg-gray-800">
          <img src={image} className="w-full h-full object-cover "/>
        </div>
      )
    }

    const renderTop = () => {
      if (isMobile) return null;

      return position ? renderData() : renderImage()
    }

    const renderBottom = () => {
      if (isMobile) return (
        <>
          {renderData()}
          {renderImage()}
        </>
      )

      return position ? renderImage() : renderData()
    }

    return (
      <li className="timeline-item text-center relative mb-6 sm:mb-0 flex justify-center sm:block">
        <div className={`top hidden sm:block ${ITEM_CLASS}`}>
          {renderTop()}
        </div>
        <div className="my-5 item-line flex items-center">
          <div className="hidden sm:flex w-full bg-gray-200 h-[1px] dark:bg-gray-700"></div>
        </div>
        <div className={`bottom ${ITEM_CLASS}`}>
          {renderBottom()}
        </div>
      </li>
    )
  }


  return (
    <section className="timeline">
      <ol className="items-center sm:flex justify-center">
        {weddingEvents.map((event, i) => (
          <TimelineEvent key={i} position={i % 2 == 0} {...event} />
        ))}
      </ol>
    </section>
  )
}
