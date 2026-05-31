import React, { useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { sanitizeInput, sanitizeEmail } from "../utils/sanitize";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let sanitized = value;

    if (name === "email") {
      sanitized = sanitizeEmail(value);
    } else {
      sanitized = sanitizeInput(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: sanitized,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus("Please fill all fields");
      return;
    }
    setFormStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setFormStatus(null), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Title text1={"CONTACT"} text2={"US"} />
          <p className="text-gray-600 text-center text-sm mt-3">
            Get in touch with us. We'd love to hear from you.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <div className="space-y-12">
            {/* Store Info */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-black flex items-center justify-center text-white">
                  📍
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Our Store
                  </h3>
                  <p className="text-gray-600">
                    Gurgaon, Haryana, India
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Get In Touch
              </h3>
              <div className="space-y-4">
                <a
                  href="tel:+917973208007"
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <span className="text-2xl">📱</span>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-semibold text-gray-900 group-hover:text-black">
                      +91 7973208007
                    </p>
                  </div>
                </a>
                <a
                  href="mailto:contact@nexus.com"
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <span className="text-2xl">✉️</span>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-900 group-hover:text-black">
                      contact@nexus.com
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={assets.contact_img}
                alt="Contact NEXUS"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h3>

            {formStatus && (
              <div className={`mb-6 p-4 rounded-lg text-sm ${
                formStatus === "success"
                  ? "bg-green-50 border border-green-200 text-green-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}>
                {formStatus === "success" ? (
                  <div className="space-y-2">
                    <p className="font-semibold flex items-center gap-2">
                      <span className="text-lg">✓</span>
                      Thanks for contacting us!
                    </p>
                    <p className="text-sm">Our team will reach out to you soon.</p>
                  </div>
                ) : (
                  <p>⚠️ {formStatus}</p>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all"
                  placeholder="john@example.com"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all"
                  placeholder="How can we help?"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all resize-none"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-all transform hover:scale-105 active:scale-95"
              >
                Send Message
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-6">
              We typically respond within 24 hours during business days.
            </p>
          </div>
        </div>

        {/* Careers Section */}
        <div className="mt-20 bg-gradient-to-r from-black to-gray-900 rounded-2xl p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
            <p className="text-white/80 mb-8">
              We're always looking for talented individuals to join the NEXUS family. If you're passionate about fashion and customer service, we'd love to hear from you!
            </p>
            <button className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
              <span>Explore Opportunities</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
