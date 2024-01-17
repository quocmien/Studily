const AboutHome = () => {
  return (
    <section id="about-home">
      <div className="container">
        <div className="grid grid-cols-12 items-end">
          <div className="col-span-12 md:col-span-6">
            <h4 className="about-home__title font-bold">
              About project
            </h4>
            <img className="mt-[80px]" src="/logo-text.png" alt="STUDILY" />
          </div>
          <div className="col-span-12 md:col-span-6">
            <p className="about-home__desc md:w-[590px]">
              Studily is eLearning has become quite a trend these days, especially after the pandemic hit our society hard. We are witnessing a change in the way our information system works. Are we shifting toward a fully digital education, and what are the benefits of moving to Web 3.0.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutHome;