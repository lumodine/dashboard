export const padZero = (number: number, maxLength: number = 2) => {
    return String(number)
        .padStart(maxLength, "0");
};
