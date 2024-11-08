import React from 'react';
import { Container, Typography, Avatar, Box } from '@mui/material';
import Slider from 'react-slick';
import { BsStar } from 'react-icons/bs';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function CustomerFeedbacks() {
    const testimonials = [
        { name: 'K.Amithan', photo: 'https://picsum.photos/80?random=1', review: 'MILKSUBZ has made my mornings so much easier!', rating: 5 },
        { name: 'S.Lavanya', photo: 'https://picsum.photos/80?random=2', review: 'I love the freshness and quality of the milk delivered by MilkSubz.', rating: 5 },
        { name: 'P.Rajesh', photo: 'https://picsum.photos/80?random=3', review: 'The weekly subscription plan is so convenient for my family!', rating: 4 },
        { name: 'J.Kaviya', photo: 'https://picsum.photos/80?random=4', review: 'Amazing customer service and on-time deliveries every time.', rating: 5 },
        { name: 'R.Dinesh', photo: 'https://picsum.photos/80?random=5', review: 'Great value for the quality of milk delivered by RELY MILK!', rating: 5 },
    ];
    

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
    };

    return (
        <section style={{ padding: '40px 0' }}>
            <Container maxWidth="md" style={{ textAlign: 'center' }}>
                <Typography 
                    variant="h4" 
                    component="h2" 
                    gutterBottom 
                    style={{ color: '#257180', fontWeight: 'bold' }}
                >
                    What Our Customers Say
                </Typography>
                <Slider {...settings}>
                    {testimonials.map((testimonial, index) => (
                        <Box 
                            key={index} 
                            style={{ 
                                backgroundColor: '#fff', 
                                padding: '20px', 
                                borderRadius: '10px', 
                                border: '2px solid #257180', // Set a solid border color
                                margin: '10px', // Add spacing between cards
                                textAlign: 'center',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add subtle shadow for depth
                                minHeight: '200px', // Ensures the box has enough height
                            }}
                        >
                            <Avatar
                                src={testimonial.photo}
                                alt={testimonial.name}
                                style={{
                                    width: 80,
                                    height: 80,
                                    margin: '0 auto',
                                    marginBottom: '10px',
                                }}
                            />
                            <Typography variant="h6">{testimonial.name}</Typography>
                            <Typography variant="body1" style={{ margin: '10px 0', fontStyle: 'italic' }}>
                                "{testimonial.review}"
                            </Typography>
                            <Box display="flex" justifyContent="center">
                                {[...Array(5)].map((_, i) => (
                                    <BsStar
                                        key={i}
                                        style={{
                                            color: i < testimonial.rating ? '#FFD700' : '#ccc',
                                            fontSize: '20px',
                                            margin: '0 2px',
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    ))}
                </Slider>
            </Container>
        </section>
    );
}

export default CustomerFeedbacks;
