browser.runtime.onMessage.addListener(
    function( request, sender, sendResponse )
    {
        function onStartedDownload( id )
        {
            //console.log( 'Started downloading ID: ' + id );
        }

        function onFailed( error )
        {
            console.log( "Quick Pic Save download failed: " + error );
        }

        function sendMessageToTabs( tabs )
        {
            for ( let tab of tabs )
            {
                browser.tabs.sendMessage( tab.id, { command: "refresh" } );
            }
        }

        //sendResponse( { response: "DOWNLOADING IMAGE" } );

        if ( request.command == "saveImage" )
        {
            var downloading = browser.downloads.download(
            {
                url: request.url,
                filename: request.filename,
                conflictAction: 'uniquify',
                saveAs: false,
                incognito: true
            } );
            downloading.then( onStartedDownload, onFailed );
        }
        else if ( request.command == "refresh" )
        {
            browser.tabs.query(
            {
                currentWindow: true,
                active: true
            } ).then( sendMessageToTabs );
        }
    } );