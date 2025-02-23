import React from 'react';
import { HeroSection } from '../Components/Home/HeroSection';
import { HowItWorks } from '../Components/Home/HowItWorks';

const products = [
    {
        id: 1,
        image: "/path-to-image-1.jpg",
        title: "فستان صيفي",
        price: 150,
        size: "M",
        brand: "زارا",
    },
    // Add more products...
];

const Home = () => {
    return (
        <div className="min-h-screen">
            <HeroSection />
            <HowItWorks />
        </div>
    );
};

export default Home;
