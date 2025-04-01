import React from 'react';
import styled from 'styled-components';

// ErrorPage component to display an error message
const ErrorPage = () => {
    return (
        // Container for the entire error page
        <Container>
            {/* Content wrapper for the error message */}
            <Content>
                {/* Heading for the error message */}
                <Heading>Oops, something went wrong</Heading>
                {/* Text describing the error */}
                <Text>
                    We apologize for the inconvenience. Our website is currently experiencing technical difficulties. Please check back later.
                </Text>
            </Content>
        </Container>
    );
}; // End of ErrorPage component

// Styled component for the main container
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  // Font family for the error page
  font-family: "Josefin Sans", sans-serif;
  color: white;
  // Background image for the error page
  background-image: url('https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
`;

// Styled component for the content wrapper
const Content = styled.div`
  max-width: 800px;
  padding: 20px;
  text-align: center;
`;

// Styled component for the heading
const Heading = styled.h1`
  // Margin at the bottom of the heading
  margin-bottom: 40px;
  font-size: 32px;
  font-weight: bold;
  // Color of the heading
  color: rgb(77, 9, 9);
`;

// Styled component for the text
const Text = styled.p`
  font-size: 18px;
  // Line height for the text
  line-height: 1.5;
`;

export default ErrorPage;
