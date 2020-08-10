const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

it("post request to the test endpoint - ^#1", async (done) => {
  const response = await request.post("/getirbimutluluk").send({
    startDate: "2016-01-26",
    endDate: "2018-02-02",
    minCount: 2700,
    maxCount: 3000,
  });
  expect(response.status).toBe(200);
  done();
});

it("post request to the test endpoint - #2", async (done) => {
  const response = await request.post("/getirbimutluluk").send({
    startDate: "2017-01-26",
    endDate: "2018-02-02",
    minCount: 2700,
    maxCount: 3000,
  });
  expect(response.status).toBe(200);
  done();
});

it("post request to the test endpoint - #3", async (done) => {
  const response = await request.post("/getirbimutluluk").send({
    startDate: "2017-01-26",
    endDate: "2018-02-02",
    minCount: 2700,
    maxCount: 3000,
  });
  expect(response.body).toHaveProperty("msg");
  expect(response.body).toHaveProperty("code");
  expect(response.body).toHaveProperty("records");
  done();
});

it("post request to the test endpoint - #4", async (done) => {
  const response = await request.post("/getirbimutluluk").send({
    startDate: "2018-01-26",
    endDate: "2018-02-02",
    minCount: 2700,
    maxCount: 3000,
  });
  expect(response.status).toBe(200);
  done();
});

it("post request to the test endpoint - Start - End Date Control - #4", async (done) => {
  const response = await request.post("/getirbimutluluk").send({
    startDate: "2018-01-26",
    endDate: "2017-02-02",
    minCount: 2700,
    maxCount: 3000,
  });
  expect(response.body).not.toHaveProperty("code");
  expect(response.body).not.toHaveProperty("msg");
  expect(response.body).not.toHaveProperty("records");
  done();
});

it("post request to the test endpoint - Min - Max Count Control - #5", async (done) => {
  const response = await request.post("/getirbimutluluk").send({
    startDate: "2017-01-26",
    endDate: "2018-02-02",
    minCount: 3000,
    maxCount: 2700,
  });
  expect(response.body).not.toHaveProperty("code");
  expect(response.body).not.toHaveProperty("msg");
  expect(response.body).not.toHaveProperty("records");
  done();
});
