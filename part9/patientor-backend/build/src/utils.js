"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
/** From part 9 material:
 * 	"By allowing any as a parameter, the function can be used with confidence
 *  knowing that whatever we might feed to it, the function always tells us
 *  whether the variable is a valid weather or not."
 *  Same principle works here
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing name ${name}`);
    }
    return name;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};
const parseDateOfBirth = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing date: ${date}`);
    }
    return date;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Incorrect or missing occupation: ${occupation}`);
    }
    return occupation;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};
const toNewPatient = ({ name, ssn, dateOfBirth, occupation, gender }) => {
    const newPatient = {
        name: parseName(name),
        ssn: parseSsn(ssn),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        occupation: parseOccupation(occupation),
        gender: parseGender(gender)
    };
    return newPatient;
};
exports.default = toNewPatient;
