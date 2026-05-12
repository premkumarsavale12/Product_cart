import React, { useState } from "react";
import axios from "axios"

const Contact = () => {

    const [formdata, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",

    })

    const handleSubmit = async (e) => {

        debugger;

        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/contact/add", formdata);
            console.log(res.data);
            alert("data Submitted SuccessFully....");

        }
        catch (err) {

            console.log(err);

        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="bg-[#f5f5f5] py-12 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left Contact Info */}
                <div className="bg-white shadow-sm border border-gray-200 p-8">

                    {/* Call Us */}
                    <div className="flex items-start gap-4 mb-10">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500 text-white text-xl">
                            📞
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                Call To Us
                            </h3>

                            <p className="text-sm text-gray-600 mb-4">
                                We are available 24/7, 7 days a week.
                            </p>

                            <p className="text-sm text-gray-700">
                                Phone: +8801611112222
                            </p>
                        </div>
                    </div>

                    <hr className="mb-10" />

                    {/* Write To Us */}
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500 text-white text-xl">
                            ✉️
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                Write To US
                            </h3>

                            <p className="text-sm text-gray-600 mb-4">
                                Fill out our form and we will contact you within 24 hours.
                            </p>

                            <p className="text-sm text-gray-700 mb-2">
                                Emails: customer@exclusive.com
                            </p>

                            <p className="text-sm text-gray-700">
                                Emails: support@exclusive.com
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Contact Form */}
                <div className="md:col-span-2 bg-white shadow-sm border border-gray-200 p-8">

                    {/* Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="Your Name *"
                            name="name"
                            value={formdata.name}
                            onChange={handleChange}
                            className="w-full bg-gray-100 px-4 py-3 outline-none border border-transparent focus:border-red-400 rounded-sm text-sm"
                        />

                        <input
                            type="email"
                            placeholder="Your Email *"
                            name="email"
                            onChange={handleChange}
                            value={formdata.email}
                            className="w-full bg-gray-100 px-4 py-3 outline-none border border-transparent focus:border-red-400 rounded-sm text-sm"
                        />

                        <input
                            type="text"
                            placeholder="Your Phone *"
                            name="phone"
                            onChange={handleChange}
                            value={formdata.phone}
                            className="w-full bg-gray-100 px-4 py-3 outline-none border border-transparent focus:border-red-400 rounded-sm text-sm"
                        />
                    </div>

                    {/* Textarea */}
                    <textarea
                        rows="7"
                        placeholder="Your Message"
                        name="message"
                        onChange={handleChange}
                        value={formdata.message}
                        className="w-full bg-gray-100 px-4 py-3 outline-none border border-transparent focus:border-red-400 rounded-sm text-sm resize-none mb-6"
                    ></textarea>

                    {/* Button */}
                    <div className="flex justify-end">
                        <button className="bg-red-500 hover:bg-red-600 transition text-white px-8 py-3 rounded-sm text-sm font-medium" onClick={handleSubmit}>
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;