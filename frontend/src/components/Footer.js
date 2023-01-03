import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";
  
const Footer = () => {
  return (
    <Box>
      <h1 style={{ color: "green", 
                   textAlign: "center", 
                   marginTop: "-50px" }}>
        HDSC Supermarket System
      </h1>
      <br />
      <Container>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink href="#">Aim</FooterLink>
            <FooterLink href="#">Vision</FooterLink>
            <FooterLink href="#">Testimonials</FooterLink>
          </Column>
          <Column>
            <Heading>Services</Heading>
            <FooterLink href="#">Deleivery</FooterLink>
            <FooterLink href="#">Online Payments</FooterLink>
            <FooterLink href="#">Sales</FooterLink>
            <FooterLink href="#">Purchaces</FooterLink>
          </Column>
          <Column>
            <Heading>Branches</Heading>
            <FooterLink href="#">Malabe</FooterLink>
            <FooterLink href="#">Gampaha</FooterLink>
            <FooterLink href="#">Galle</FooterLink>
            <FooterLink href="#">Matara</FooterLink>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="#">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Facebook
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>
                  Instagram
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Twitter
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>
                  Youtube
                </span>
              </i>
            </FooterLink>
          </Column>
        </Row>
        <br />
        
      </Container>
      <div className="footer-copyright text-center py-3" h1 style={{ color: "#9d9cff"}}>
        <Container fluid>
           Copyright 2022 © HDSC Supermarket. All Rights Reserved.
        </Container>
      </div>
    </Box>
  );
};
export default Footer;