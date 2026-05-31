import React from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";

const About = () => {
  const features = [
    {
      icon: "✓",
      title: "Quality Assurance",
      description: "We meticulously select and vet each product to ensure it meets our stringent quality standards",
    },
    {
      icon: "⚡",
      title: "Convenience",
      description: "With our user-friendly interface and hassle-free ordering process, shopping has never been easier",
    },
    {
      icon: "💬",
      title: "Exceptional Customer Service",
      description: "Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Title text1={"ABOUT"} text2={"US"} />
          <p className="text-gray-600 text-center text-sm mt-3">
            Discover the story behind NEXUS
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Hero section with image and text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={assets.about_img}
              alt="About NEXUS"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Our Story
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                At NEXUS, we believe shopping should feel as joyful as the moments you're shopping for. From everyday essentials to your favourite statement pieces, we focus on quality, comfort, and designs that fit real life.
              </p>
            </div>

            <div className="bg-black/5 rounded-lg p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed">
                Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. Every item in our collection is sourced from trusted brands and suppliers who share our commitment to excellence.
              </p>
            </div>

            <div className="pt-4">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations from browsing and ordering to delivery and beyond.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Title text1={"WHY"} text2={"CHOOSE US"} />
            <p className="text-gray-600 text-sm mt-3 max-w-2xl mx-auto">
              We're committed to delivering exceptional value in every aspect of your shopping journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg hover:border-gray-300 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Values section */}
        <div className="bg-black rounded-2xl p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold mb-3">💎</div>
                <h3 className="font-semibold mb-2">Quality</h3>
                <p className="text-gray-300 text-sm">Premium products that last</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-3">🤝</div>
                <h3 className="font-semibold mb-2">Trust</h3>
                <p className="text-gray-300 text-sm">Transparent and honest service</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-3">🌟</div>
                <h3 className="font-semibold mb-2">Excellence</h3>
                <p className="text-gray-300 text-sm">Going above and beyond</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
