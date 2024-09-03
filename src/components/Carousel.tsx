import { useEffect, useMemo, useState } from "react";
import { Modal } from "@/components/Modal";


const renderMedia = (media: { src: string, isVideo: boolean }, show: boolean) => {
  return media.isVideo ? (
    <video key={media.src} style={{ display: show ? "inherit" : "none" }} className="w-full h-full object-cover" autoPlay muted controls>
      <source key={media.src} src={media.src} type="video/mp4"/>
    </video>
  ) : (
    <img key={media.src} style={{ display: show ? "inherit" : "none" }} className="cursor-pointer" src={media?.src}/>
  )
}

export const Carousel = ({ images, videos }: { images: string[], videos?: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const media = useMemo(() => {

    let resources: { src: string, isVideo: boolean }[] = [];

    if (images) resources = [...resources, ...images.map((image) => ({ src: image, isVideo: false }))];
    if (videos) resources = [...resources, ...videos.map((video) => ({ src: video, isVideo: true }))];

    return resources;
  }, [images, videos])

  // Auto change image every 5 seconds
  useEffect(() => {
    if (media[currentImage] && media[currentImage].isVideo) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage, media]);

  const handleNext = () => {
    if (currentImage < media.length - 1) {
      setCurrentImage(currentImage + 1);
    }
    if (currentImage === media.length - 1) {
      setCurrentImage(0);
    }
  }

  const handlePrevious = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    }
  }

  if (!media.length) return null;

  return (
    <div className="carousel flex flex-col items-center justify-center">
      <div className="grid grid-cols-12 w-full">
        <div className="flex items-center justify-center">
          <button onClick={handlePrevious}
                  className="bg-transparent hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
            </svg>
          </button>
        </div>
        <div className="img-container col-span-10">
          {media.map((item, i) => renderMedia(item, i === currentImage))}
        </div>
        <div className="flex items-center justify-center">
          <button onClick={handleNext}
                  className="bg-transparent text-gray-800 font-bold py-2 px-4 rounded-r">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="my-2 flex flex-row items-center justify-center">
        {media.map((_, index) => (
          <div key={index}
               className={`w-2 h-2 rounded-full ${index === currentImage ? 'bg-black' : 'bg-gray-400'} mx-1`}/>
        ))}
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        {renderMedia(media[currentImage], true)}
      </Modal>
    </div>
  )
}