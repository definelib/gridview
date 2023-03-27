


const Panel = require('@definejs/panel');
const Pager = require('@definelib/pager');

module.exports = function (meta) {
    let panel = new Panel(`[data-panel="${meta.id}/Pager"]`);
    let pager = null;


    //初始阶段适合用来绑定事件。
    panel.on('init', function () {
        pager = new Pager({
            'container': panel.$,
        });

        pager.on({
            'change': function (info) {
                panel.fire('change', [info]);
            },
        });

    });



    //渲染。
    panel.on('render', function (data) {
        pager.render(data);
        panel.show();
    });


    return panel.wrap({

    });
};



