


const Template = require('@definejs/template');
const Class = require('./Template/Class');
const DataSet = require('./Template/DataSet');
const Style = require('./Template/Style');



module.exports = {
    create(meta) {
        let tpl = new Template(meta.template);

        tpl.process({
            //填充表格。
            '': function () {
                this.fix(['class', 'dataset', 'style',]);

                let cssClass = Class.stringify(meta.class);
                let dataset = DataSet.stringify(meta.dataset);
                let style = Style.stringify(meta.style);

                return {
                    'id': meta.id,
                    'class': cssClass,
                    'dataset': dataset,
                    'style': style,
                    'nodata': meta.nodata,
                };
            },
           
        });

        return tpl;

    },

};
