$(document.body).append(`<template id="tpl-GridView">
    <div data-panel="{id}" {class} {dataset} {style} >
        <header data-panel="{id}/Header">
           
        </header>

        <main data-panel="{id}/Main">
            
        </main>

        <p>
            <span>{nodata}</span>
        </p>

        <footer>
            <div data-panel="{id}/Pager">

            </div>
        </footer>
    </div>
</template>
 `);