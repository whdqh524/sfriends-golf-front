export const formatPhoneNumber = (input) => {
    const numbers = input.replace(/\D/g, "");

    if (numbers.length < 4) return numbers;
    if (numbers.length < 8) {
        return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    }
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
};