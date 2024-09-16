const images = [
  "https://i.pinimg.com/236x/45/f2/2a/45f22ad6bdfdd79d848dd47cae5225c1.jpg",
  "https://i.pinimg.com/236x/e9/d1/2a/e9d12aa76194fda23fd6d731a520e7dd.jpg",
  "https://i.pinimg.com/236x/d8/2e/4d/d82e4d9e0e1f9ae55f583ca8bdf69a1c.jpg",
  "https://i.pinimg.com/236x/3a/31/70/3a317045590283c6837ac026d9b2bcab.jpg",
  "https://i.pinimg.com/236x/52/ba/63/52ba63c830c90654c911e9245a3e844b.jpg",
  "https://i.pinimg.com/236x/21/7d/26/217d26786d338f7d327c76074d13a20e.jpg",
  "https://i.pinimg.com/236x/38/a3/22/38a322c1e1351553f311a1cd207903ad.jpg",
  "https://i.pinimg.com/236x/cd/28/a5/cd28a5c98df3a30d8ce14245ed5378d9.jpg",
  "https://i.pinimg.com/236x/9b/21/fb/9b21fb33db0be2f14d55af96220b23ac.jpg",
  "https://i.pinimg.com/236x/c0/64/86/c06486ec727f49ee99f6b34abd9b78b5.jpg",
  "https://i.pinimg.com/236x/7e/ae/6f/7eae6f4bf8b2b3dcf84ca8282f7ba32c.jpg",
  "https://i.pinimg.com/236x/80/4d/43/804d430599631c264e92c96de9ef0a07.jpg",
  "https://i.pinimg.com/236x/c0/8b/43/c08b439d3f0e07dfa7e6858df98fbb24.jpg",
  "https://i.pinimg.com/236x/a0/59/8c/a0598c3847472d680c70d7d8a7820215.jpg",
]

export const PinterestBoard = () => {

  return (
    <div className="pinterest-board">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[300px]">
        {images.map((image, index) => (
          <a key={index} href={"https://co.pinterest.com/anadav11/invitados-fiesta/"} target="_blank" rel="noreferrer" className="max-h-[300px]">
            <img key={index} src={image} alt="Pinterest board" className="rounded-sm object-cover h-full w-full"/>
          </a>
        ))}
      </div>
    </div>
  );
}
