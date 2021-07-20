const allAirports = require("./airportsData.json");
const airports = require("./airports");
const app = require("./app");
const request = require("supertest");

describe("airport tests", () => {
    test("GET /airports should return all airports", (done) => {
        request(app)
            .get("/airports")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(allAirports);
                done();
            });
    });
    test("POST /airports should create a new airport", (done) => {
        const newAirport = {
            icao: "F7HY",
            iata: "iat1",
            name: "Lowell Field",
            city: "Anchor Point", 
            state: "Alaska", 
            country:"US", 
            elevation:700,
            lat: 45.983950, 
            lon: -130.4933, 
            tz: "America",  
        };
        request(app)
            .post("/airports")
            .send(newAirport)
            .expect(201)
            .end(() => {
                expect(airports[airports.length-1]).toEqual(newAirport);
                return done();
            });
    });
});
