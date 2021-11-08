
const Style = require('@definejs/style');

module.exports = {
    stringify(data) {
        if (!data) {
            return '';
        }

        data = Style.stringify(data);
        
        if (!data) {
            return '';
        }

        return `style="${data}"`;
    },
};
