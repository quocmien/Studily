const JoinOur = () => {
  return (
    <section id="join-our">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-span-6">
            <div className="join-our__intro md:w-[600px]">
              <h3 className="join-our__title mb-[20px] --title">
                Join Our Community
              </h3>
              <p className="join-our__desc --desc">
                When it comes to data integrity, blockchain technology is an excellent way to make sure that all the information you need is provided.
              </p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6">
            <img src="/join-our.png" alt="Join Our Community" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default JoinOur;
