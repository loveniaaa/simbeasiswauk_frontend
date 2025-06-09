import React from "react";
import MahasiswaLayout from "../components/MahasiswaLayout";
import { Link } from "react-router-dom";
import { KIPLogo, LogoGenbi } from "../../../img";

const Mendaftar = () => {
    return (
        <MahasiswaLayout>
            <section id="values" className="values section">
                      <div className="card-container container">
                        <div className="row gy-3 justify-content-center">
                          <Link to="/beasiswa/kip" className="col-lg-4" data-aos="fade-up" data-aos-delay={200}>
                            <div className="card">
                              <img src={KIPLogo} className="img-fluid" alt="" />
                              <h3>Kartu Indonesia Pintar <br />(KIP) Kuliah</h3>
                              <p>
                                (KIP) Kuliah adalah program bantuan biaya pendidikan yang disediakan oleh pemerintah Indonesia.
                              </p>
                            </div>
                          </Link>
                          {/* End Card Item */}
                          <Link className="col-lg-4" data-aos="fade-up" data-aos-delay={300} to="/beasiswa/genbi">
                            <div className="card">
                              <img src={LogoGenbi} className="img-fluid" alt="" />
                              <h3>Generasi Baru Indonesia <br /> (GenBI)</h3>
                              <p>
                                Beasiswa GenBI adalah program beasiswa yang diselenggarakan oleh Bank Indonesia (BI).
                              </p>
                            </div>
                          </Link>
                          {/* End Card Item */}
                    </div>
                </div>
            </section>
        </MahasiswaLayout>
    )
}

export default Mendaftar;