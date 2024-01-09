const MeetOurTeam = () => {
  return (
    <section className="meet-our-team">
      <div className="container">
        <div className="meet-our-team__intro text-center">
          <h3 className="meet-our-team__title">
            Meet Our Team
          </h3>
          <p className="meet-our-team__desc">
            When it comes to data integrity, blockchain technology is an excellent way to make sure that all the information you need is provided.
          </p>
        </div>

        <div className="meet-our-team__list grid grid-cols-12 gap-[20px] mt-[112px]">
          <div className="col-span-6 md:col-span-4">
            <div className="meet-our-team__item --left">
              <img src="/mr-david.png" alt="Mr.David" />
              <div className="meet-our-team__intro-item">
                <h3 className="meet-out-team__name-team color-white">
                  Mr.David
                </h3>
                <span className="meet-out-team__position">
                  Founder, CEO
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-6 md:col-span-8">
            <div className="grid grid-cols-12 gap-[20px] mb-[20px]">
              <div className="col-span-12 md:col-span-4">
                <div className="meet-our-team__item --logo">
                  <img className="meet-our-team__item-logo m-auto" width="180px" height="180px" src="/logo-black.png" alt="Studily" />
                </div>
              </div>
              <div className="col-span-6 md:col-span-4">
                <div className="meet-our-team__item">
                  <img src="/ms-david.png" alt="Ms.David" />
                  <div className="meet-our-team__intro-item">
                    <h3 className="meet-out-team__name-team color-white">
                      Mr.David
                    </h3>
                    <span className="meet-out-team__position">
                      Founder, CEO
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-span-6 md:col-span-4">
                <div className="meet-our-team__item">
                  <img src="/ms-david.png" alt="Ms.David" />

                  <div className="meet-our-team__intro-item">
                    <h3 className="meet-out-team__name-team color-white">
                      Mr.David
                    </h3>
                    <span className="meet-out-team__position">
                      Founder, CEO
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex grid grid-cols-12 gap-[20px]">
              <div className="col-span-7">
                <div className="meet-our-team__item">
                  <img src="/ceo.png" alt="CEO" />

                  <div className="meet-our-team__intro-item">
                    <h3 className="meet-out-team__name-team color-white">
                      Mr.David
                    </h3>
                    <span className="meet-out-team__position">
                      Founder, CEO
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-span-5">
                <div className="meet-our-team__item">
                  <img src="/founder.png" alt="founder" />
                  <div className="meet-our-team__intro-item">
                    <h3 className="meet-out-team__name-team color-white">
                      Mr.David
                    </h3>
                    <span className="meet-out-team__position">
                      Founder, CEO
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden flex col-span-12 grid grid-cols-12 gap-[20px]">
              <div className="col-span-7">
                <div className="meet-our-team__item">
                  <img src="/ceo.png" alt="CEO" />

                  <div className="meet-our-team__intro-item">
                    <h3 className="meet-out-team__name-team color-white">
                      Mr.David
                    </h3>
                    <span className="meet-out-team__position">
                      Founder, CEO
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-span-5">
                <div className="meet-our-team__item">
                  <img src="/founder.png" alt="founder" />
                  <div className="meet-our-team__intro-item">
                    <h3 className="meet-out-team__name-team color-white">
                      Mr.David
                    </h3>
                    <span className="meet-out-team__position">
                      Founder, CEO
                    </span>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default MeetOurTeam;
