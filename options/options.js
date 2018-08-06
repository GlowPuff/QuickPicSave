$( document ).ready( () =>
{
    Initialize();

    function onSet( item ) { console.log( "SAVED FOLDER OPTIONS::" + item.savePath ); }

    function onError() {}

    function Initialize()
    {
        let gettingItem = browser.storage.local.get(
        {
            enabled: true,
            savePath: "",
            minSize: 250
        } );
        gettingItem.then( ( item ) =>
        {
            //console.log( "Initialize()::OPTIONS::GOT STORAGE ITEM" );
            $( "#enabledStatus" ).text( item.enabled );
            $( "#savePath" ).val( item.savePath );
            $( "#minWidth" ).val( item.minSize );
        }, ( error ) => { console.log( "Initialize()::ERROR::" + error ); } );
    }

    $( "#saveButton" ).click( ( eventObject ) =>
    {
        var minWidth = $( "#minWidth" ).val().trim();
        var savepath = $( "#savePath" ).val().trim(); //.replace( "\\", "" );
        if ( savepath == "\\" )
            savepath = "";
        //remove any illegal characters from folder name
        savepath = savepath.replace( /[^a-z0-9]/gi, '_' );
        //remove any trailing backslash \
        if ( savepath != "" && savepath[ savepath.length ] != '\\' )
            savepath = savepath + "\\";
        //console.log( "SAVING FOLDER::" + savepath );

        browser.storage.local.set( { savePath: savepath, minSize: minWidth } )
            .then( onSet, onError );
    } );

    function onStorageChange( changes )
    {
        var changedItems = Object.keys( changes );
        for ( var item of changedItems )
        {
            if ( item == "enabled" )
            {
                $( "#enabledStatus" ).text( changes[ item ].newValue );
            }
        }
    }

    browser.storage.onChanged.addListener( onStorageChange );
} );