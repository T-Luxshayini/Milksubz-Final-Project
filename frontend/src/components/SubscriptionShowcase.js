import React from 'react';
import { Card, CardContent } from "@/components/ui/card";


const SubscriptionShowcase = () => {
  const subscriptionFeatures = [
    {
      icon: "🥛",
      title: "Fresh Daily Delivery",
      description: "Get farm-fresh milk delivered to your doorstep every morning"
    },
    {
      icon: "📅",
      title: "Flexible Schedule",
      description: "Choose your delivery days and easily modify your schedule"
    },
    {
      icon: "💰",
      title: "Cost Effective",
      description: "Save more with our monthly subscription packages"
    },
    {
      icon: "✨",
      title: "Premium Quality",
      description: "100% pure and quality-tested dairy products"
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Why Subscribe with Us?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of happy customers who enjoy our premium milk subscription service
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {subscriptionFeatures.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 shadow-lg">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Start Your Fresh Dairy Journey Today
            </h3>
            <p className="text-blue-100 mb-6">
              Subscribe now and get your first delivery free! Cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-blue-900 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300">
                View Plans
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            { value: "5000+", label: "Active Subscribers" },
            { value: "98%", label: "Satisfaction Rate" },
            { value: "365", label: "Days of Service" },
            { value: "30+", label: "Products Available" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-blue-900 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionShowcase;