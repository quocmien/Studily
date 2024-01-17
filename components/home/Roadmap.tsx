const Roadmap = () => {
  return (
    <section id="road-map" className="mb-[110px] md:mb-[220px]">
      <div className="container">
        <h3 className="road-map__title w-full text-center --title mb-[20px]">
          Our Road
        </h3>
        <p className="road-map__desc lg:w-[590px] m-auto text-center --desc">
          When it comes to data integrity, blockchain technology is an excellent way to make sure that all the information you need is provided.
        </p>

        <div className="road-map__content mt-[60px] md:mt-[120px]">
          <img className="w-full h-auto" src="/road-map.png" alt="Roadmap Studily" />
        </div>
      </div>
    </section>
  )
}

export default Roadmap;