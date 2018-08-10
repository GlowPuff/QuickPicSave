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

        //sendResponse( { response: "DOWNLOADING IMAGE" } );

        var downloading = browser.downloads.download(
        {
            url: request.url,
            filename: request.filename,
            conflictAction: 'uniquify',
            saveAs: false,
            incognito: true
        } );
        downloading.then( onStartedDownload, onFailed );
    } );