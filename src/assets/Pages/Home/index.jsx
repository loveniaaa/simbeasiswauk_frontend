import React from "react";
import "react-bootstrap"
import "../../vendor/bootstrap-icons/bootstrap-icons.css";
import "../../vendor/bootstrap/css/bootstrap.min.css"
import "../../vendor/bootstrap/css/bootstrap-grid.css"

import "../../vendor/aos/aos.css";
import "../../vendor/glightbox/css/glightbox.min.css";
import "../../vendor/swiper/swiper-bundle.min.css"
import "./home.css";
import "../../../App.css";
import { favicon, KIPLogo, LogoGenbi, ScholarshipLogo, ScholarshipBanner } from "../../img";
import { Link } from "react-router-dom";


function Home() {
  return (
    <>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <title>Scholar Management System</title>
      <meta name="description" content="" />
      <meta name="keywords" content="" />
      {/* Favicons */}
      <link href={favicon} rel="icon" />
      <link href={favicon} rel="apple-touch-icon" />
      {/* Fonts */}
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
      <link href="https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap" rel="stylesheet"></link>

      <main className="main">
        {/* Hero Section */}
        <section id="hero" className="hero section">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                <h1 data-aos="fade-up">
                  System Information Scholarship Management
                </h1>
                <p data-aos="fade-up" data-aos-delay={100}>
                  Universitas Klabat
                </p>
                <div
                  className="d-flex flex-column flex-md-row"
                  data-aos="fade-up"
                  data-aos-delay={200}
                >
                  <a href="#about" className="btn-get-started">
                    Get Started <i className="bi bi-arrow-right" />
                  </a>
                </div>
              </div>
              <div
                className="col-lg-6 order-1 order-lg-2 hero-img"
                data-aos="zoom-out"
              >
                <img
                  src={ScholarshipLogo}
                  className="img-fluid animated"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
        {/* /Hero Section */}
        {/* About Section */}
        <section id="about" className="about section">
          <div className="container" data-aos="fade-up">
            <div className="row gx-0">
              <div
                className="col-lg-6 d-flex flex-column justify-content-center"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                <div className="content">
                  <h2>
                    Apa itu Sistem Informasi Manajemen Beasiswa?
                  </h2>
                  <p>
                    Sistem Informasi Manajemen Beasiswa adalah sistem berbasis teknologi yang dirancang untuk mengelola seluruh proses terkait beasiswa, mulai dari pendaftaran, seleksi, hingga pencairan dana dan pelaporan.
                  </p>
                  <div className="text-center text-lg-start">
                    <Link
                      to="/about"
                      className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center"
                    >
                      <span>Read More</span>
                      <i className="bi bi-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-6 d-flex align-items-center"
                data-aos="zoom-out"
                data-aos-delay={200}
              >
                <img src={ScholarshipBanner} className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </section>
        {/* /About Section */}
        {/* Values Section */}
        <section id="values" className="values section">
          <div className="container section-title" data-aos="fade-up">
            <p>
              Beasiswa yang tersedia
            </p>
            <h2>Click for more Info <i class="bi bi-arrow-down"></i></h2>
          </div>
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
        {/* /Values Section */}

        {/* Features Section */}
        <section id="features" className="features section">
          {/* Section Title */}
          <div className="container section-title" data-aos="fade-up">
            <h2>Jadwal</h2>
            <p>
              Jadwal Pendaftaran Beasiswa
              <br />
            </p>
          </div>
          {/* End Section Title */}
          <div className="container">
            <div className="row gy-5">
              <div className="col-xl-6 d-flex">
                <div className="column align-self-center gy-4">
                  <div className="col-md-6" data-aos="fade-up" data-aos-delay={200}>
                    <div className="feature-box d-flex align-items-center ">
                      <table width={1300}>
                        <th width={500}><h3>KIP Kuliah</h3></th>
                        <th width={450}><h3>1 Maret - 31 Maret</h3></th>
                        <th width={200}><Link to="/beasiswa/kip"><i class="bi bi-info-circle"></i>Info</Link></th>
                        <th width={150}><Link to="/beasiswa/kip/form-pendaftaran">Daftar</Link></th>
                      </table>
                    </div>
                  </div>
                  {/* End Feature Item */}
                  <div className="col-md-6" data-aos="fade-up" data-aos-delay={300}>
                    <div className="feature-box d-flex align-items-center">
                      <table width={1300}>
                        <th width={500}><h3>GenBI</h3></th>
                        <th width={450}><h3>1 Maret - 31 Maret</h3></th>
                        <th width={200}><Link to="/beasiswa/genbi"><i class="bi bi-info-circle"></i>Info</Link></th>
                        <th width={150}><Link to="/beasiswa/genbi/form-pendaftaran">Daftar</Link></th>
                      </table>
                    </div>
                  </div>
                  {/* End Feature Item */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /Features Section */}
        
        {/* Services Section */}
        <section id="services" className="services section">
          {/* Section Title */}
          <div className="container section-title" data-aos="fade-up">
            <h2>Services</h2>
            <p>
              Check Our Services
              <br />
            </p>
          </div>
          {/* End Section Title */}
          <div className="container">
            <div className="row gy-4">
              <div
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                <div className="service-item item-cyan position-relative">
                  <i className="bi bi-activity icon" />
                  <h3>Nesciunt Mete</h3>
                  <p>
                    Provident nihil minus qui consequatur non omnis maiores. Eos
                    accusantium minus dolores iure perferendis tempore et
                    consequatur.
                  </p>
                  <a href="#" className="read-more stretched-link">
                    <span>Read More</span> <i className="bi bi-arrow-right" />
                  </a>
                </div>
              </div>
              {/* End Service Item */}
              <div
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                <div className="service-item item-orange position-relative">
                  <i className="bi bi-broadcast icon" />
                  <h3>Eosle Commodi</h3>
                  <p>
                    Ut autem aut autem non a. Sint sint sit facilis nam iusto sint.
                    Libero corrupti neque eum hic non ut nesciunt dolorem.
                  </p>
                  <a href="#" className="read-more stretched-link">
                    <span>Read More</span> <i className="bi bi-arrow-right" />
                  </a>
                </div>
              </div>
              {/* End Service Item */}
              <div
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay={300}
              >
                <div className="service-item item-teal position-relative">
                  <i className="bi bi-easel icon" />
                  <h3>Ledo Markt</h3>
                  <p>
                    Ut excepturi voluptatem nisi sed. Quidem fuga consequatur. Minus
                    ea aut. Vel qui id voluptas adipisci eos earum corrupti.
                  </p>
                  <a href="#" className="read-more stretched-link">
                    <span>Read More</span> <i className="bi bi-arrow-right" />
                  </a>
                </div>
              </div>
              {/* End Service Item */}
              <div
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay={400}
              >
                <div className="service-item item-red position-relative">
                  <i className="bi bi-bounding-box-circles icon" />
                  <h3>Asperiores Commodi</h3>
                  <p>
                    Non et temporibus minus omnis sed dolor esse consequatur.
                    Cupiditate sed error ea fuga sit provident adipisci neque.
                  </p>
                  <a href="#" className="read-more stretched-link">
                    <span>Read More</span> <i className="bi bi-arrow-right" />
                  </a>
                </div>
              </div>
              {/* End Service Item */}
              <div
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay={500}
              >
                <div className="service-item item-indigo position-relative">
                  <i className="bi bi-calendar4-week icon" />
                  <h3>Velit Doloremque.</h3>
                  <p>
                    Cumque et suscipit saepe. Est maiores autem enim facilis ut aut
                    ipsam corporis aut. Sed animi at autem alias eius labore.
                  </p>
                  <a href="#" className="read-more stretched-link">
                    <span>Read More</span> <i className="bi bi-arrow-right" />
                  </a>
                </div>
              </div>
              {/* End Service Item */}
              <div
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay={600}
              >
                <div className="service-item item-pink position-relative">
                  <i className="bi bi-chat-square-text icon" />
                  <h3>Dolori Architecto</h3>
                  <p>
                    Hic molestias ea quibusdam eos. Fugiat enim doloremque aut neque
                    non et debitis iure. Corrupti recusandae ducimus enim.
                  </p>
                  <a href="#" className="read-more stretched-link">
                    <span>Read More</span> <i className="bi bi-arrow-right" />
                  </a>
                </div>
              </div>
              {/* End Service Item */}
            </div>
          </div>
        </section>
        {/* /Services Section */}
        {/* Pricing Section */}
        
        {/* /Pricing Section */}
        {/* Faq Section */}
        <section id="faq" className="faq section">
          {/* Section Title */}
          <div className="container section-title" data-aos="fade-up">
            <h2>F.A.Q</h2>
            <p>Frequently Asked Questions</p>
          </div>
          {/* End Section Title */}
          <div className="container">
            <div className="row">
              <div className="col-lg-6" data-aos="fade-up" data-aos-delay={100}>
                <div className="faq-container">
                  <div className="faq-item faq-active">
                    <h3>Non consectetur a erat nam at lectus urna duis?</h3>
                    <div className="faq-content">
                      <p>
                        Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id
                        volutpat lacus laoreet non curabitur gravida. Venenatis
                        lectus magna fringilla urna porttitor rhoncus dolor purus
                        non.
                      </p>
                    </div>
                    <i className="faq-toggle bi bi-chevron-right" />
                  </div>
                  {/* End Faq item*/}
                  <div className="faq-item">
                    <h3>
                      Feugiat scelerisque varius morbi enim nunc faucibus a
                      pellentesque?
                    </h3>
                    <div className="faq-content">
                      <p>
                        Dolor sit amet consectetur adipiscing elit pellentesque
                        habitant morbi. Id interdum velit laoreet id donec ultrices.
                        Fringilla phasellus faucibus scelerisque eleifend donec
                        pretium. Est pellentesque elit ullamcorper dignissim. Mauris
                        ultrices eros in cursus turpis massa tincidunt dui.
                      </p>
                    </div>
                    <i className="faq-toggle bi bi-chevron-right" />
                  </div>
                  {/* End Faq item*/}
                  <div className="faq-item">
                    <h3>
                      Dolor sit amet consectetur adipiscing elit pellentesque?
                    </h3>
                    <div className="faq-content">
                      <p>
                        Eleifend mi in nulla posuere sollicitudin aliquam ultrices
                        sagittis orci. Faucibus pulvinar elementum integer enim. Sem
                        nulla pharetra diam sit amet nisl suscipit. Rutrum tellus
                        pellentesque eu tincidunt. Lectus urna duis convallis
                        convallis tellus. Urna molestie at elementum eu facilisis
                        sed odio morbi quis
                      </p>
                    </div>
                    <i className="faq-toggle bi bi-chevron-right" />
                  </div>
                  {/* End Faq item*/}
                </div>
              </div>
              {/* End Faq Column*/}
              <div className="col-lg-6" data-aos="fade-up" data-aos-delay={200}>
                <div className="faq-container">
                  <div className="faq-item">
                    <h3>
                      Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?
                    </h3>
                    <div className="faq-content">
                      <p>
                        Dolor sit amet consectetur adipiscing elit pellentesque
                        habitant morbi. Id interdum velit laoreet id donec ultrices.
                        Fringilla phasellus faucibus scelerisque eleifend donec
                        pretium. Est pellentesque elit ullamcorper dignissim. Mauris
                        ultrices eros in cursus turpis massa tincidunt dui.
                      </p>
                    </div>
                    <i className="faq-toggle bi bi-chevron-right" />
                  </div>
                  {/* End Faq item*/}
                  <div className="faq-item">
                    <h3>
                      Tempus quam pellentesque nec nam aliquam sem et tortor
                      consequat?
                    </h3>
                    <div className="faq-content">
                      <p>
                        Molestie a iaculis at erat pellentesque adipiscing commodo.
                        Dignissim suspendisse in est ante in. Nunc vel risus commodo
                        viverra maecenas accumsan. Sit amet nisl suscipit adipiscing
                        bibendum est. Purus gravida quis blandit turpis cursus in
                      </p>
                    </div>
                    <i className="faq-toggle bi bi-chevron-right" />
                  </div>
                  {/* End Faq item*/}
                  <div className="faq-item">
                    <h3>Perspiciatis quod quo quos nulla quo illum ullam?</h3>
                    <div className="faq-content">
                      <p>
                        Enim ea facilis quaerat voluptas quidem et dolorem. Quis et
                        consequatur non sed in suscipit sequi. Distinctio ipsam
                        dolore et.
                      </p>
                    </div>
                    <i className="faq-toggle bi bi-chevron-right" />
                  </div>
                  {/* End Faq item*/}
                </div>
              </div>
              {/* End Faq Column*/}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="team section">
          {/* Section Title */}
          <div className="container section-title" data-aos="fade-up">
            <h2>Team</h2>
            <p>Our hard working team</p>
          </div>
          {/* End Section Title */}
          <div className="container">
            <div className="row gy-4">
              <div
                className="col-lg-3 col-md-6 d-flex align-items-stretch"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                <div className="team-member">
                  <div className="member-img">
                    <img
                      src="assets/img/team/team-1.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <div className="social">
                      <a href="">
                        <i className="bi bi-twitter-x" />
                      </a>
                      <a href="">
                        <i className="bi bi-facebook" />
                      </a>
                      <a href="">
                        <i className="bi bi-instagram" />
                      </a>
                      <a href="">
                        <i className="bi bi-linkedin" />
                      </a>
                    </div>
                  </div>
                  <div className="member-info">
                    <h4>Walter White</h4>
                    <span>Chief Executive Officer</span>
                    <p>
                      Velit aut quia fugit et et. Dolorum ea voluptate vel tempore
                      tenetur ipsa quae aut. Ipsum exercitationem iure minima enim
                      corporis et voluptate.
                    </p>
                  </div>
                </div>
              </div>
              {/* End Team Member */}
              <div
                className="col-lg-3 col-md-6 d-flex align-items-stretch"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                <div className="team-member">
                  <div className="member-img">
                    <img
                      src="assets/img/team/team-2.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <div className="social">
                      <a href="">
                        <i className="bi bi-twitter-x" />
                      </a>
                      <a href="">
                        <i className="bi bi-facebook" />
                      </a>
                      <a href="">
                        <i className="bi bi-instagram" />
                      </a>
                      <a href="">
                        <i className="bi bi-linkedin" />
                      </a>
                    </div>
                  </div>
                  <div className="member-info">
                    <h4>Sarah Jhonson</h4>
                    <span>Product Manager</span>
                    <p>
                      Quo esse repellendus quia id. Est eum et accusantium pariatur
                      fugit nihil minima suscipit corporis. Voluptate sed quas
                      reiciendis animi neque sapiente.
                    </p>
                  </div>
                </div>
              </div>
              {/* End Team Member */}
              <div
                className="col-lg-3 col-md-6 d-flex align-items-stretch"
                data-aos="fade-up"
                data-aos-delay={300}
              >
                <div className="team-member">
                  <div className="member-img">
                    <img
                      src="assets/img/team/team-3.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <div className="social">
                      <a href="">
                        <i className="bi bi-twitter-x" />
                      </a>
                      <a href="">
                        <i className="bi bi-facebook" />
                      </a>
                      <a href="">
                        <i className="bi bi-instagram" />
                      </a>
                      <a href="">
                        <i className="bi bi-linkedin" />
                      </a>
                    </div>
                  </div>
                  <div className="member-info">
                    <h4>William Anderson</h4>
                    <span>CTO</span>
                    <p>
                      Vero omnis enim consequatur. Voluptas consectetur unde qui
                      molestiae deserunt. Voluptates enim aut architecto porro
                      aspernatur molestiae modi.
                    </p>
                  </div>
                </div>
              </div>
              {/* End Team Member */}
              <div
                className="col-lg-3 col-md-6 d-flex align-items-stretch"
                data-aos="fade-up"
                data-aos-delay={400}
              >
                <div className="team-member">
                  <div className="member-img">
                    <img
                      src="assets/img/team/team-4.jpg"
                      className="img-fluid"
                      alt=""
                    />
                    <div className="social">
                      <a href="">
                        <i className="bi bi-twitter-x" />
                      </a>
                      <a href="">
                        <i className="bi bi-facebook" />
                      </a>
                      <a href="">
                        <i className="bi bi-instagram" />
                      </a>
                      <a href="">
                        <i className="bi bi-linkedin" />
                      </a>
                    </div>
                  </div>
                  <div className="member-info">
                    <h4>Amanda Jepson</h4>
                    <span>Accountant</span>
                    <p>
                      Rerum voluptate non adipisci animi distinctio et deserunt amet
                      voluptas. Quia aut aliquid doloremque ut possimus ipsum
                      officia.
                    </p>
                  </div>
                </div>
              </div>
              {/* End Team Member */}
            </div>
          </div>
        </section>
        {/* /Team Section */}
        {/* Clients Section */}

        {/* Recent Posts Section */}
        {/* /Recent Posts Section */}
        {/* Contact Section */}
        <section id="contact" className="contact section">
          {/* Section Title */}
          <div className="container section-title" data-aos="fade-up">
            <h2>Contact</h2>
            <p>Contact Us</p>
          </div>
          {/* End Section Title */}
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            <div className="row gy-4">
              <div className="col-lg-6">
                <div className="row gy-4">
                  <div className="col-md-6">
                    <div className="info-item" data-aos="fade" data-aos-delay={200}>
                      <i className="bi bi-geo-alt" />
                      <h3>Address</h3>
                        <p>Jl. Arnold Mononutu</p>
                        <p>Airmadidi, Minahasa Utara</p>
                        <p>Sulawesi Utara 95371</p>
                    </div>
                  </div>
                  {/* End Info Item */}
                  <div className="col-md-6">
                    <div className="info-item" data-aos="fade" data-aos-delay={300}>
                      <i className="bi bi-telephone" />
                      <h3>Call Us</h3>
                      <p>+62 822 5186 7733</p>
                      <p>+62 878 1498 3589</p>
                    </div>
                  </div>
                  {/* End Info Item */}
                  <div className="col-md-6">
                    <div className="info-item" data-aos="fade" data-aos-delay={400}>
                      <i className="bi bi-envelope" />
                      <h3>Email Us</h3>
                      <p>lovenia@example.com</p>
                      <p>yuki@example.com</p>
                    </div>
                  </div>
                  {/* End Info Item */}
                  <div className="col-md-6">
                    <div className="info-item" data-aos="fade" data-aos-delay={500}>
                      <i className="bi bi-clock" />
                      <h3>Jam Buka</h3>
                      <p>Senin - Jumat</p>
                      <p>9:00AM - 05:00PM</p>
                    </div>
                  </div>
                  {/* End Info Item */}
                </div>
              </div>
              <div className="col-lg-6">
                <form
                  action="forms/contact.php"
                  method="post"
                  className="php-email-form"
                  data-aos="fade-up"
                  data-aos-delay={200}
                >
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Your Name"
                        required=""
                      />
                    </div>
                    <div className="col-md-6 ">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Your Email"
                        required=""
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        placeholder="Subject"
                        required=""
                      />
                    </div>
                    <div className="col-12">
                      <textarea
                        className="form-control"
                        name="message"
                        rows={6}
                        placeholder="Message"
                        required=""
                        defaultValue={""}
                      />
                    </div>
                    <div className="col-12 text-center">
                      <div className="loading">Loading</div>
                      <div className="error-message" />
                      <div className="sent-message">
                        Your message has been sent. Thank you!
                      </div>
                      <button type="submit">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
              {/* End Contact Form */}
            </div>
          </div>
        </section>
        {/* /Contact Section */}
      </main>
      <footer id="footer" className="footer">
        <div className="container footer-top">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footer-about">
              <a href="App.js" className="d-flex align-items-center">
                <span className="sitename">Universitas Klabat</span>
              </a>
              <div className="footer-contact pt-3">
                <p>Jl. Arnold Mononutuh</p>
                <p>Airmadidi, Minahasa Utara</p>
                <p>Sulawesi Utara 95371</p>
                <p className="mt-3">
                  <strong>Phone:</strong> <span>+1 5589 55488 55</span>
                </p>
                <p>
                  <strong>Email:</strong> <span>info@example.com</span>
                </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <i className="bi bi-chevron-right" /> <a href="#">Home</a>
                </li>
                <li>
                  <i className="bi bi-chevron-right" /> <a href="#">About us</a>
                </li>
                <li>
                  <i className="bi bi-chevron-right" /> <a href="#">Services</a>
                </li>
                <li>
                  <i className="bi bi-chevron-right" />{" "}
                  <a href="#">Terms of service</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li>
                  <i className="bi bi-chevron-right" /> <a href="#">Web Design</a>
                </li>
                <li>
                  <i className="bi bi-chevron-right" />{" "}
                  <a href="#">Web Development</a>
                </li>
                <li>
                  <i className="bi bi-chevron-right" />{" "}
                  <a href="#">Product Management</a>
                </li>
                <li>
                  <i className="bi bi-chevron-right" /> <a href="#">Marketing</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-12">
              <h4>Follow Us</h4>
              <p>
                Cras fermentum odio eu feugiat lide par naso tierra videa magna
                derita valies
              </p>
              <div className="social-links d-flex">
                <a href="">
                  <i className="bi bi-twitter-x" />
                </a>
                <a href="">
                  <i className="bi bi-facebook" />
                </a>
                <a href="https://www.instagram.com/loveniamendes?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                  <i className="bi bi-instagram"/>
                </a>
                <a href="">
                  <i className="bi bi-linkedin" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container copyright text-center mt-4">
          <p>
            © <span>Copyright</span>{" "}
            <strong className="px-1 sitename">Universitas Klabat</strong>{" "}
            <span>All Rights Reserved</span>
          </p>
        </div>
        <a href="“https://themewagon.com"></a>
      </footer>
      <a href="“https://themewagon.com">{/* Scroll Top */}</a>
      <a
        href="#"
        id="scroll-top"
        className="scroll-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short" />
      </a>
      {/* Vendor JS Files */}
      {/* Main JS File */}
    </>

  );
}

export default Home;
