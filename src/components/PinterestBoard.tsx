const images = [
  "https://i.pinimg.com/474x/51/57/c7/5157c75d51fd749734056dda076b21cf.jpg",
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
  "https://i.pinimg.com/236x/5b/e1/f1/5be1f1226c02bf22e9a6e0e9daab7adc.jpg",
  "https://i.pinimg.com/236x/dd/af/55/ddaf5553076f3d49599c11408ea3e94d.jpg",
  "https://i.pinimg.com/236x/42/b1/d5/42b1d5ef69332cef959474ff23dbf387.jpg",
  "https://i.pinimg.com/236x/58/6b/47/586b478e5ec224ed261dc302994f30d3.jpg",
  "https://i.pinimg.com/236x/a0/15/9c/a0159cff6cc25c19b36fb64500aed666.jpg",
  "https://i.pinimg.com/236x/ae/d8/9e/aed89eaa90a7bc27f99f63a0441a2416.jpg",
  "https://i.pinimg.com/236x/d1/0f/c8/d10fc8d0a1f9816c438624bf3a7d6018.jpg",
  "https://i.pinimg.com/236x/c3/41/9e/c3419ed8e2b837a8076ef25122c9c785.jpg",
  "https://i.pinimg.com/236x/6f/84/eb/6f84ebf88c91aa57b92c3b93f6bfaa19.jpg",
  "https://i.pinimg.com/236x/b3/41/c9/b341c9b722086ffa946cb68bea389c39.jpg",
  "https://i.pinimg.com/236x/0a/25/5e/0a255ec055d3196a44ef9c01cae12229.jpg",
  "https://i.pinimg.com/236x/9d/6f/be/9d6fbe684c7ddb753e5dd1afd4c92bca.jpg",
  "https://i.pinimg.com/236x/ae/cf/54/aecf54f6c14775d60b33880f1884dc99.jpg",
  "https://i.pinimg.com/236x/d4/53/e6/d453e6c11f7b4db78dc1d2075b613705.jpg",
  "https://i.pinimg.com/236x/3f/1c/95/3f1c958291153dbf47a069f379004010.jpg",
  "https://i.pinimg.com/236x/a1/98/3f/a1983f45bbf387cb8fab7230877f1701.jpg",
  "https://i.pinimg.com/236x/8d/f5/2a/8df52a82ca258e0bac49b531b531bade.jpg",
  "https://i.pinimg.com/236x/c5/38/f7/c538f796ffb56265220ea8e2f4f2dba0.jpg",
  "https://i.pinimg.com/236x/4b/d6/40/4bd640b5dfd1bad10afe64f22bb2eb07.jpg",
  "https://i.pinimg.com/236x/7b/e0/f0/7be0f02f9fbdde339b37df4435f90b74.jpg",
  "https://i.pinimg.com/236x/42/ed/6c/42ed6c1e56d4e885c70d6a9a440059fe.jpg",
  "https://i.pinimg.com/236x/92/54/07/925407edcc3245e487cff55adc46bc2a.jpg",
  "https://i.pinimg.com/236x/97/03/06/970306ff2330041138ae78590ca8baf9.jpg",
  "https://i.pinimg.com/236x/00/65/1a/00651ae73a8075a22abaa5ad632ef095.jpg",
  "https://i.pinimg.com/236x/72/15/51/721551fb8ca03c02d99b8f96fbddb8a0.jpg",
  "https://i.pinimg.com/236x/eb/ab/38/ebab380edf4a0574f8043c61bf36a935.jpg",
  "https://i.pinimg.com/236x/1f/13/1b/1f131ba2dde9da4d871a8979754bb921.jpg",
  "https://i.pinimg.com/236x/d7/24/75/d724754b1f8f12e263f9dfc3feb208ae.jpg",
  "https://i.pinimg.com/236x/65/77/6a/65776a2956c5842a7cbca669cd799ee9.jpg",
  "https://i.pinimg.com/236x/aa/ee/9e/aaee9e6321bc9047a87d82ffefc6e05d.jpg",
  "https://i.pinimg.com/236x/cf/0b/ef/cf0befdc7dcd06639cbe49e6ea0dd480.jpg",
  "https://i.pinimg.com/236x/b6/8f/4f/b68f4fccc192e438f96a9138c08cf4ac.jpg",
  "https://i.pinimg.com/236x/8f/cf/77/8fcf775d602b95dd0a34658d3c4a4965.jpg",
  "https://i.pinimg.com/236x/1f/c4/55/1fc45592185a2b3da8aa5b14bab22911.jpg",
  "https://i.pinimg.com/236x/dc/26/f1/dc26f1ef82e727a43af487f2fd530e4c.jpg",
  "https://i.pinimg.com/236x/32/57/61/325761a6a9549d42839e95e477934442.jpg",
  "https://i.pinimg.com/236x/03/28/94/032894fb9b21a2d071bc97227f8cf83b.jpg",
  "https://i.pinimg.com/236x/c0/4f/b3/c04fb383aba90c37263117b04c84a13e.jpg"
]

export const PinterestBoard = () => {

  return (
    <div className="pinterest-board">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <a key={index} href={"https://co.pinterest.com/anadav11/invitados-fiesta/"} target="_blank" rel="noreferrer">
            <img key={index} src={image} alt="Pinterest board" className="rounded-sm"/>
          </a>
        ))}
      </div>
    </div>
  );
}
