const _ensureString = input => input + '';

export const stripHTML = str => _ensureString(str).replace(/<[^>]*>/g, '');
