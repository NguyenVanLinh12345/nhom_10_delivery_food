export const validationPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10,}$/;
    return phoneRegex.test(phoneNumber);

};
export const validation = (value) => {
    if (value.length > 0) {
        return true;
    }
    return false;
}