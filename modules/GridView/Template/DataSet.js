

module.exports = {
    stringify(data) {
        if (!data) {
            return '';
        }

        let list = Object.keys(data).map((key) => {
            let value = data[key];

            return `data-${key}="${value}"`;
        });

        return list.join(' ');
    },
};
