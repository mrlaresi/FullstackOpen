"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const patientRouter = express_1.default.Router();
patientRouter.get('/', (_req, res) => {
    res.json(patientService_1.default.getPatients());
});
patientRouter.post('/', (req, res) => {
    try {
        // Validation
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient = (0, utils_1.default)(req.body);
        const addedPatient = patientService_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (e) {
        let errorMessage = 'Something went wrong.';
        if (e instanceof Error) {
            errorMessage += ' Error: ' + e.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = patientRouter;
