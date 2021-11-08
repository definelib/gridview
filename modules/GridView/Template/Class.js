

module.exports = {
    stringify(data) {
        if (Array.isArray(data)) {
            data = data.join(' ');
        }

        if (!data) {
            return '';
        }

        return `class="${data}"`;
    },
};
