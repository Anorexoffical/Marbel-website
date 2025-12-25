import React, { useEffect, useRef } from "react";
import { FiPhone, FiSend, FiMail, FiMapPin } from "react-icons/fi";
import { Fade } from "react-awesome-reveal";
import Navbar from "./Navbar";
import contactus from '../assets/service1.png';;
import "../Style/Contactus.css";
import { InlineWidget } from "react-calendly";
import Footer from "./Footer";



function Contact() {


    return (
        <>
            <Navbar />
            <section className="py-5 text-center">
                    <h1 className="display-4 font-weight-bold headingofcont ">CONTACT US</h1>


                <form action="https://formspree.io/f/xovjlwkk" method="POST" >

                    <div className="container d-flex justify-content-center flex-wrap callmaincontainer">
                        <div className="shadow-lg rounded bg-white p-4 d-flex flex-column flex-lg-row w-100 ">
                            {/* Image Container */}
                            <div className="image-container">
                                <img
                                    src={contactus}
                                    alt="Contact Us"
                                    className="img-fluid rounded"
                                    loading="lazy"
                                />
                                {/* Contact Info Overlay */}
                                <div className="contact-overlay">
                                    <div className="d-flex align-items-center mb-3">
                                        <FiPhone className="icon "  />
                                        <h5 className="text-white ml-3 mb-0 smalltext">+27 0769675814</h5>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <FiMail className="icon" />
                                        <h5 className="text-white ml-3 mb-0 smalltext">contact@icellmobile.co.za
                                        </h5>
                                   

                                    </div>
                                 

                                    <div className="d-flex align-items-center">
                                        <FiMapPin className="icon" />
                                        <h5 className="text-white ml-3 mb-0 smalltext">ICell Mobile, Shop 134,  cnr</h5>
                                        <br></br>
                                    </div>


                                    <div className="d-flex align-items-center ">
                                        <h5 className="text-white smalltext text-white ml-3 mb-0">  Johannesburg and Athol Rds, Highlands North, Johannesburg</h5>
                                    </div>


                                </div>
                            </div>

                            {/* Form Section */}

                            <div className="w-100 w-lg-50 p-4">
                                <input type="text" className="form-control mb-3 input-hover" placeholder="Name"  name="name"/>
                                <input type="email" className="form-control mb-3 input-hover" placeholder="Email" name="email" />
                                <input type="text" className="form-control mb-3 input-hover" placeholder="Phone" name="phone"/>
                                <select className="form-control mb-3 input-hover" name="service">
                                    <option value="select" disabled>Select a service</option>
                                    <option value="web-development">Product </option>
                                    <option value="mobile-app">Order</option>
                                    <option value="web-development">Press </option>
                                    <option value="mobile-app">Other</option>


                                </select>
                                <textarea className="form-control mb-3 input-hover" placeholder="Message" rows="8" name="message"></textarea>

                                <button className="btn btn-dark w-100" type="submit">
                                    Send <FiSend className="ml-2" />
                                </button>
                            </div>

                        </div>
                    </div>
                    </form>

            </section>


            <div className="text-center">
        <h1 className="display-4 font-weight-bold headingofcont">BOOK A MEETING</h1>
        <div className="py-5">
            <div className="embed-responsive embed-responsive-16by9">
                <InlineWidget
                    url="https://cal.com/icellmobileweb-gmail.com/30min"
                    styles={{
                        height: "1000px",
                        width: "100%",
                    }}
                />
            </div>
        </div>
</div>

        </>
    );
}

export default Contact;
