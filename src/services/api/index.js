const backendHost = (process.env.NODE_ENV === "development"
                     ? "http://localhost:5000"
                     : "some-heroku-url");

export default `${backendHost}/api`;
