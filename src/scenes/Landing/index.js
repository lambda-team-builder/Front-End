import React from "react";
import { Link } from "react-router-dom";
import { Header, LandingButton, TopDiv, AuthCard } from "../../styles";

const Landing = props => {
  return (
    <div>
      <Header>
        <div style={{ width: "100%" }} />
        <h1 style={{ width: "100%", textAlign: "center" }}>Team Builder</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%"
          }}
        />
      </Header>
      <TopDiv>
        <AuthCard>
          <div
            style={{
              background: "#F4F4F655",
              color: "#555869",
              width: "100%",
              height: "auto",
              paddingBottom: "20px",
              borderBottom: "1px solid #55586988",
              textAlign: "center"
            }}
          >
            <p>
              Managing hundreds of student projects week in and week out for
              Build weeks gets a bit daunting! Team Bilder helps with product
              ideation and project curation.
            </p>{" "}
            <br />
            <p>
              As an administrator you can log into the app and see a list of
              products in a grid format so that you can visualize all products
              for a build week. You can create a new product with the fields
              Product Name & Product Description, so that you can create a new
              project for students to join. You can add an enumerable amount of
              roles to a product idea and let users sign up to a role they want
              to handle.
            </p>
          </div>
          <LandingButton>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/login"
            >
              login
            </Link>
          </LandingButton>
          <LandingButton>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/register"
            >
              register
            </Link>
          </LandingButton>
        </AuthCard>
      </TopDiv>
    </div>
  );
};

export default Landing;
