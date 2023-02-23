import React from "react";

function Profile({ loginProfile }) {
  console.log(loginProfile);
  
  return (
    <>
      <section className="vh-99 card" style={{ backgroundColor: "#131722" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0">
              <div
                className="card mb-3"
                style={{ borderRadius: ".5rem", backgroundColor: "#222" }}>
                <div className="row g-0">
                  <div
                    className="col-md-4 gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                      backgroundColor: "#222",
                    }}>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar"
                      className="img-fluid my-5"
                      style={{ width: 80 }}
                    />
                    <h5 className="text-muted">Name : </h5>
                    <p className="" style={{color:"white"}}>
                      {
                        loginProfile[
                          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
                        ]
                      }
                    </p>
                    <i className="far fa-edit mb-5" />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h6 className="text-muted">Information</h6>
                      <hr className="mt-0 mb-4 text-muted" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6 className="text-muted">Email</h6>
                          <p className="" style={{color:"white"}}>
                            {
                              loginProfile[
                                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
                              ]
                            }
                          </p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6 className="text-muted">Role</h6>
                          <p className="" style={{color:"white"}}>
                            {
                              loginProfile[
                                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                              ]
                            }
                          </p>
                        </div>
                      </div>
                      <h6 className="text-muted">Projects</h6>
                      <hr className="mt-0 mb-4 text-muted" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6 className="text-muted">Recent</h6>
                          <p className="" style={{color:"white"}}>Lorem ipsum</p>
                        </div>

                        <div className="col-6 mb-3">
                          <h6 className="text-muted">Most Viewed</h6>
                          <p className="" style={{color:"white"}}>Dolor sit amet</p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-start">
                        <a href="#!">
                          <i className="fab fa-facebook-f fa-lg me-3" />
                        </a>
                        <a href="#!">
                          <i className="fab fa-twitter fa-lg me-3" />
                        </a>
                        <a href="#!">
                          <i className="fab fa-instagram fa-lg" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
