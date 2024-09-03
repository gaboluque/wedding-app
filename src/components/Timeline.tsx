export type Event = {
  date: string,
  description: string
}

export const Timeline = ({ title, events }: { title: string, events: Event[] }) => {

  return (
    <section>
      <div className="container max-w-5xl md:px-4 md:py-12 mx-auto mb-10 md:mb-0">
        <div className="grid md:gap-4 md:mx-4 sm:grid-cols-12">
          <div className="col-span-12 sm:col-span-3">
            <div className="md:mb-14">
              <h3 className="md:text-2xl text-left md:text-right font-semibold">{title}</h3>
            </div>
          </div>
          <div className="relative col-span-12 md:px-4 space-y-6 sm:col-span-9">
            <div
              className="col-span-12 space-y-12 relative md:px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-gray-300">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:relative">
                  <time className="text-xs tracki uppercase dark:text-gray-400">{event.date}</time>
                  <p className="mt-3 whitespace-break-spaces text-justify">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}