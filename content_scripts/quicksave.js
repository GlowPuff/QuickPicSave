$( document ).ready( function()
{
    var icon = browser.extension.getURL( "icons/download-36.png" );
    var pluginEnabled = true;
    var fileSavePath = "";
    var minWidth = 250;

    let gettingItem = browser.storage.local.get(
    {
        enabled: true,
        savePath: "",
        minSize: 250
    } );
    gettingItem.then( ( item ) =>
    {
        pluginEnabled = item.enabled;
        fileSavePath = item.savePath;
        minWidth = item.minSize;
        Initialize();
    } );

    function handleResponse( message )
    {
        console.log( `handleResponse:  ${message.response}` );
    }

    function handleError( error )
    {
        console.log( `Quick Pic Save Error: ${error}` );
    }

    function onStorageChange( changes, area )
    {
        var changedItems = Object.keys( changes );

        for ( var item of changedItems )
        {
            if ( item == "minSize" )
            {
                minWidth = changes[ item ].newValue;
                console.log( "MINWIDTH::" + minWidth );
            }
            if ( item == "savePath" )
            {
                fileSavePath = changes[ item ].newValue;
                console.log( "NEW FILE PATH::" + fileSavePath );
            }
            if ( item == "enabled" && changes[ item ].newValue )
            {
                console.log( "ENABLED" );
                pluginEnabled = true;
                $( "#gpQuickSaveButton" ).show();
            }
            else if ( item == "enabled" && !changes[ item ].newValue )
            {
                console.log( "DISABLED" );
                pluginEnabled = false;
                $( "#gpQuickSaveButton" ).hide();
            }
        }
    }

    function Initialize()
    {
        $( "img" ).each( function( index )
        {
            if ( this.naturalWidth > minWidth )
            {
                var imageURL = $( this ).attr( "src" );

                // $( this ).addClass( "gpImage" );

                //create the popup button
                var qsButton = $( "<input id='gpQuickSaveButton' type = 'image' class= 'gpSaveButton' src = '" + icon + "' ></>" ).hide();

                //Determine if parent is a DIV, and use that to overlay popup button
                //Otherwise, create new DIV and wrap it around IMG
                if ( $( this ).parent().is( "div" ) )
                {
                    $( this ).parent().addClass( "gpImgBorder" )
                        .on( "mouseenter", function( event ) { if ( pluginEnabled && $( this ).width() >= minWidth ) qsButton.show(); } )
                        .on( "mouseleave", function( event ) { if ( pluginEnabled ) qsButton.hide(); } );

                }
                else
                {
                    //create the div that will surround the image on the page
                    var newBox = $( "<div id='gpImageBorder' class='gpImgBorder'></div>" )
                        .on( "mouseenter", function( event ) { if ( pluginEnabled && $( this ).width() >= minWidth ) qsButton.show(); } )
                        .on( "mouseleave", function( event ) { if ( pluginEnabled ) qsButton.hide(); } );
                    //wrap the newBox DIV around the image we're working on
                    $( this ).wrap( newBox );
                }

                //add the popup button to parent DIV
                $( this ).parent().append( qsButton );

                // fname = s.replace( /[^a-z0-9]/gi, '_' ).toLowerCase();

                //add the click event for the popup button, passing in the URL
                qsButton.on( "click", { url: imageURL },
                    function( eventObject )
                    {
                        //console.log( "CLICKED::" + eventObject.data.url );

                        //pull the filename from the image's URL
                        var index = eventObject.data.url.lastIndexOf( "/" ) + 1;
                        var fname = ( fileSavePath + eventObject.data.url.substr( index ) ).trim();

                        //fix imageURL to account for relative URLs
                        var currentURL = window.location.href;
                        var imageURL = eventObject.data.url;
                        //is this a relative or absolute URL
                        if ( eventObject.data.url.trim().substr( 0, 7 ) != "http://" && eventObject.data.url.trim().substr( 0, 8 ) != "https://" )
                            imageURL = currentURL + imageURL; //relative URL, so precede it by the current HTTP location

                        // console.log( "fileSavePath::" + fileSavePath );
                        // console.log( "FILENAME::" + fname );
                        // console.log( "IMG URL::" + imageURL );
                        eventObject.preventDefault();
                        var sending = browser.runtime.sendMessage( { url: imageURL, filename: fname } );
                        sending.then( handleResponse, handleError );
                        return false;
                    } );
            }
        } );
    }

    browser.storage.onChanged.addListener( onStorageChange );
} );