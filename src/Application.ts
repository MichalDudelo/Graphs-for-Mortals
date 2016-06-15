import * as validator from "./ZipCodeValidator"

window.onload = () => console.log(new validator.ZipCodeValidator().isAcceptable("1234"));