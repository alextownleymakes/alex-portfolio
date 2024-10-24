
export function capitalize(str: string): string {
    if (!str) return ''; // Handle empty strings or null values
    return str.charAt(0).toUpperCase() + str.slice(1);
}