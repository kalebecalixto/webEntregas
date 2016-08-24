(function () {

    if (!Function.prototype.multiLine) {
        Function.prototype.multiLine = function () {
            var s = this.toString();

            var pi = s.indexOf('/*');
            var pf = s.indexOf('*/');

            return this.toString().slice(pi + 2, pf);
        }
    }

    var html = function () {
        /*
            <div id="loadingPanel" style="display: none">
                <div>
                    <img src="data:image/gif;base64,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" /><br />
                    <span id="progress"></span>
                </div>
            </div>
        */
    }.multiLine();

    var css = function () {
        /*
        <style type="text/css">
            #loadingPanel {
                position: fixed;
                left: 0;
                top: 0;
                width: 100%;
                height: 100vh;
                border: 0px solid red;
                text-align: center;
                vertical-align: middle;
				background-color: white;
                z-index: 10000;
            }

            #loadingPanel div {
                width: 200px;
                height: 80px;
                border: 0px solid blue;
                background: white;
                margin-top: calc(50vh - 40px);
                margin-left: calc(50% - 100px);
            }

            #loadingPanel span {
                font-weight: bold;
                font-size: 20px;
            }
        </style>
    */}.multiLine();


    document.write(css);

    loading = {};

    var state = false;
    
    loading.show = function (progressText) {
        if (!window.loadingPanel) {
            $('body').append(html);
        }

        state = true;
        
        setTimeout(function() {
            $(loadingPanel).show(0, function() {
                if (state === false)
                    loading.hide();
            });
        }, 100);
        
        if (progressText) {
            $(progress).html(progressText);
        }
    }

    loading.progress = loading.show;

    loading.hide = function () {
        state = false;
        $(loadingPanel).hide();
    }
})();