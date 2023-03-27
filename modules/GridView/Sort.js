


const $ = require('@definelib/jquery');

function switchStatus(status) {
    //未设定 --> 降序
    if (!status) { 
        return 'down';
    }

    //降序 --> 升序
    if (status == 'down') { 
        return 'up';
    }
    
    //升序 --> 未设定
    return '';
}


module.exports = {
    create(meta) {

        let exports = {
            column: null,   //当前处于排序的列。
            id$status: {},  //每一列对应的排序状态。

            sort(column, status, list) {
                let value = status == 'down' ? -1 : 1;
                let { name, } = column;

                list = [...list];

                list.sort(function (a, b) {
                    let args = [{ status, column, a, b, list, }];

                    let values0 = meta.emitter.fire('sort', name, args);
                    let values1 = meta.emitter.fire('sort', args);

                    let v0 = values0.slice(-1)[0]; //以最后一个为准。
                    let v1 = values1.slice(-1)[0]; //以最后一个为准。

                    if (typeof v0 == 'number') {
                        return v0;
                    }
                    
                    //v0 = { a, b, };
                    if (typeof v0 == 'object') {
                        a = v0.a;
                        b = v0.b;
                        return a > b ? value : (a < b ? -value : 0);
                    }


                    if (typeof v1 == 'number') {
                        return v1;
                    }

                    //v1 = { a, b, };
                    if (typeof v1 == 'object') {
                        a = v1.a;
                        b = v1.b;
                    }
                    else {
                        a = a[name];
                        b = b[name];
                    }
                    
                    return a > b ? value : (a < b ? -value : 0);
                });

                return list;
            },


            init(list) {
                let { column, } = exports;

                if (column) {
                    let status = exports.id$status[column.id];
                    list = exports.sort(column, status, list);
                }

                return list;
            },

            render(column, info) {
                if (!column.field.sort) {
                    return;
                }

                console.log(column, info);

                let { id, } = column;
                let { event, columns, } = info;

                if (event.target.id != id) {
                    return;
                }

                let { list, } = meta;
                let status = switchStatus(exports.id$status[id]);

                columns.forEach(({ id, }) => {
                    $(`#${id}`).removeClass('sort-up sort-down');
                });

                if (status) {
                    $(`#${id}`).addClass(`sort-${status}`);
                    list = exports.sort(column, status, list);
                    exports.column = column;
                }
                else { 
                    exports.column = null;
                }

                exports.id$status[id] = status;

                meta.panel.render(list);
            },
        };

        return exports;
    },
};



