const supertest = require("supertest");
const chai = require("chai");
const app = require("../express");

global.app = app;
global.expect = chai.expect;
global.request = supertest(app);
