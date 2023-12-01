export function clearText(text) {
    // change text "example_text" to "Example Text"
    const words = text.split('_');
    let result = '';
    for (let word of words) {
        result += word.charAt(0).toUpperCase() + word.slice(1) + ' ';
    }
    return result.trim();
}

export function convertNumberToCurrency(number) {
    // convert number to currency format
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}