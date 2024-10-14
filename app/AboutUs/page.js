"use client";
import React from "react";


const faqs = [
  {
    question: "What is MealBridge?",
    answer:
      "MealBridge minimizes food waste by connecting restaurants with surplus food to those in need, redistributing edible excess to shelters, food banks, and communities.",
  },
  {
    question: "Who can donate food?",
    answer:
      "Any restaurant, café, or food business meeting health and safety standards can partner with MealBridge. We welcome all to join us in reducing food waste and fighting hunger.",
  },
  {
    question: "Who benefits from the donated food?",
    answer:
      "Surplus food is delivered to shelters, food banks, and community organizations, ensuring it reaches those facing food insecurity quickly and safely through trusted partners.",
  },
  {
    question: "Is the food safe to eat?",
    answer:
      "All donated food meets strict safety standards. We collect only fresh, safe food, and our logistics team ensures timely delivery to prevent spoilage.",
  },
  {
    question: "Does MealBridge operate in my city?",
    answer:
      "We’re expanding to new cities! Check our website for current locations, and if we’re not there yet, stay tuned—we may be soon!",
  },
  {
    question: "How is MealBridge funded?",
    answer:
      "We’re funded by partnerships, grants, and donations, aiming to keep our services free for food donors and beneficiaries to create positive social impact.",
  },
];

const AboutPage = () => {
  return (
    <div className="bg-gray-900 w-full text-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-6xl text-green-500 mb-2 text-center">About US</h2>
        <p className="text-xl font-serif mb-8 text-center">
          We are creative with a vision to help hungry people.
        </p>

        <div className="w-full flex md:grid-cols-2 gap-8 mb-16 justify-center items-center">
          <div className="text-center mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-green-500">
              Our Mission: A Hunger-Free World
            </h3>
            <p className="mb-4">
              At MealBridge, we harness technology to reduce restaurant food
              waste and combat global hunger. By bridging the gap between
              surplus food and those in need, we aim to create lasting social
              impact.
            </p>
          </div>

            <img
              src="don_back.jpg"
              alt="Happy children"
              className="w-40 h-40 rounded-full object-cover"
            />
          </div>

        <div className="w-full flex md:grid-cols-2 gap-8 mb-16 justify-center items-center">
            <img
              src="aboutus3.jpg"
              alt="Happy children"
              className="w-40 h-40 rounded-full object-cover"
            />
          <div className="text-center mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-green-500">
            How does MealBridge Work?
            </h3>
            <p className="mb-4">
            Our platform connects restaurants with surplus food to those in need. Using smart tracking and distribution, we ensure excess food is donated, picked up, and delivered to communities instead of going to landfills.
            </p>
          </div>

          </div>

        <div className="w-full flex md:grid-cols-2 gap-8 mb-16 justify-center items-center">
          <div className="text-center mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-green-500">
            Our Vision
            </h3>
            <p className="mb-4">
            We envision a world with no food waste and no hunger. With the right tools and teamwork, this goal is within reach. Join us in making a difference, one meal at a time.
            </p>
          </div>

            <img
              src="aboutus2.jpg"
              alt="Happy children"
              className="w-40 h-40 rounded-full object-cover"
            />
          </div>
        

        <h2 className="text-5xl font-bold mb-10 text-center">FAQ&apos;S</h2>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="text-xl text-green-500 mb-2">{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;