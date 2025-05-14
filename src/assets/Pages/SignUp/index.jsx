import React, { useState } from "react";
import styles from "./signup.module.css";
import { LogoUK, ScholarshipLogo } from "../../img";
import InputDesign from "../../components/TextInput";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nim, setNim] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            username: nim,
            first_name: firstName,
            last_name: lastName,
            phone_number: phone_number,
            email: email,
            role_id: "03",
            status: true
        };        

        try {
            const response = await axios.post("https://simbeasiswauk.site:9900/sms-mgmt/auth/sign-up", payload);
            console.log("Success:", response.data);
            navigate("/signup/succes");
        } catch (error) {
            console.error("Signup failed:", error.response?.data || error.message);
            alert("Signup gagal. Cek kembali isian atau hubungi admin.");
        }
    };

    return (
        <div className="container-fluid p-0">
            <div className="row g-0 min-vh-100">
                <div className={`${styles.kiri} col-md-6`}>
                    <div className={`${styles.glassBox} p-0 g-0 min-vh-100 flex-column align-items-center p-4 z-2 position-absolute`}>
                        <img src={LogoUK} className="justify-content-center ms-4 mt-5" style={{width: 250}} />   
                        <h1 className={`${styles.textScholarship} text-start ms-4 mt-5`}>Scholarship Management System</h1>
                    </div>
                    <img src={ScholarshipLogo} className={`${styles.bgImage}`} />
                </div>

                <div className="col-md-6 bg-light d-flex justify-content-center align-items-start row">
                    <form onSubmit={handleSubmit} className="col-md-12 d-flex justify-content-center align-items-center row mt-5 ms-3 mb-5"> 
                        <h1 className={`${styles.TitleKanan} text-black`}>Buat akun anda</h1>
                        
                        <div className="mb-2 mt-2">
                            <span className="text-black">First Name</span>
                            <InputDesign type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>

                        <div className="mb-2 mt-2">
                            <span className="text-black">Last Name</span>
                            <InputDesign placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>

                        <div className="mb-2 mt-2">
                            <span className="text-black">Username</span>
                            <InputDesign placeholder="username" value={nim} onChange={(e) => setNim(e.target.value)} />
                        </div>

                        <div className="mb-2 mt-2">
                            <span className="text-black">Phone Number</span>
                            <InputDesign placeholder="Phone Number" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>

                        <div className="mb-2 mt-2">
                            <span className="text-black">Email</span>
                            <InputDesign placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        
                        <div>
                            <Button type="submit" className={`${styles.button} mt-4`}>Lanjutkan</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
