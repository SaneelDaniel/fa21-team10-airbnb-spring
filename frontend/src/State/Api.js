const authEndpoint = process.env.REACT_APP_AUTH_ENDPOINT
const propertyEndpoint = process.env.REACT_APP_PROPERTY_ENDPOINT
const paymentEndpoint = process.env.REACT_APP_PAYMENT_ENDPOINT

export const printEndpoints = () => {
    console.log("AUTH: ", authEndpoint);
    console.log("PROPERTY: ", propertyEndpoint);
    console.log("PAYMENT: ", paymentEndpoint);
}