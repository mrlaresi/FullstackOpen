"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getPatients = () => {
    return patients_1.default.map((patient) => {
        return Object.assign(Object.assign({}, patient), { ssn: undefined });
    });
};
const addPatient = (newPatient) => {
    const id = (0, uuid_1.v1)();
    patients_1.default.push(Object.assign(Object.assign({}, newPatient), { id: id }));
    return newPatient;
};
const exported = {
    getPatients,
    addPatient
};
exports.default = exported;
