function updateLengthLabel(value) {
    document.getElementById('lengthValue').textContent = value;
}

document.getElementById('length').addEventListener('input', function() {
    updateLengthLabel(this.value);
});

document.getElementById('generate').addEventListener('click', function() {
    const length = parseInt(document.getElementById('length').value, 10);
    const useUpper = document.getElementById('uppercase').checked;
    const useLower = document.getElementById('lowercase').checked;
    const useNumbers = document.getElementById('numbers').checked;
    const useSymbols = document.getElementById('symbols').checked;

    const password = generatePassword(length, useUpper, useLower, useNumbers, useSymbols);
    document.getElementById('password').value = password;
    document.getElementById('strengthValue').textContent = passwordStrength(password);
});

document.getElementById('copy').addEventListener('click', function() {
    const passField = document.getElementById('password');
    if (passField.value) {
        navigator.clipboard.writeText(passField.value);
    }
});

function generatePassword(length, upper, lower, numbers, symbols) {
    let chars = '';
    if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (!chars) return '';

    let password = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
        password += chars[array[i] % chars.length];
    }
    return password;
}

function passwordStrength(pass) {
    let score = 0;
    if (pass.length >= 12) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
        case 4: return 'Strong';
        case 3: return 'Good';
        case 2: return 'Medium';
        default: return 'Weak';
    }
}
