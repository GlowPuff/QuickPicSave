$( document ).ready( () =>
{
    var oldMinValue;

    Initialize();

    function onSet( item )
    {
        // console.log("SAVED FOLDER OPTIONS::" + item.savePath);
    }

    function onError() {}

    function Initialize()
    {
        //load settings, set defaults if necessary
        let gettingItem = browser.storage.local.get(
        {
            enabled: true,
            savePath: "",
            minSize: 250,
            hoverPos: 0 //default 0 = mouse position, 1 = top left
        } );
        gettingItem.then( ( item ) =>
        {
            //console.log( "Initialize()::OPTIONS::GOT STORAGE ITEM" );
            $( "#enabledStatus" ).text( item.enabled );
            $( "#savePath" ).val( item.savePath );
            $( "#minWidth" ).val( item.minSize );
            if ( item.hoverPos == 0 )
                $( "#hoverPos" ).prop( "checked", true );
            else
                $( "#topLeft" ).prop( "checked", true );
            oldMinValue = $( "#minWidth" ).val();
        }, ( error ) => { console.log( "Initialize()::ERROR::" + error ); } );
    }

    $( "#saveButton" ).click( ( eventObject ) =>
    {
        SaveChanges();
    } );

    //save changes when radio button clicked
    $( "#hoverPos, #topLeft" ).on( "click", () =>
    {
        SaveChanges();
    } );

    // $( "#minWidth, #savePath" ).on( "input", () =>
    // {
    //     $( "#saveButton" ).trigger( "click" );
    // } );

    function SaveChanges()
    {
        //make sure min width value is a number
        if ( $.isNumeric( $( "#minWidth" ).val() ) )
            var minWidth = $( "#minWidth" ).val().trim();
        else
            var minWidth = oldMinValue;

        var savepath = $( "#savePath" ).val().trim(); //.replace( "\\", "" );
        if ( savepath == "\\" )
            savepath = "";
        //remove any illegal characters from folder name
        savepath = savepath.replace( /[^a-z0-9]/gi, '_' );
        //remove any trailing backslash \
        if ( savepath != "" && savepath[ savepath.length ] != '\\' )
            savepath = savepath + "\\";
        //console.log( "SAVING FOLDER::" + savepath );
        //get which radio button is checked
        var popSelection = $( "#hoverPos" ).prop( "checked" ) ? 0 : 1;
        console.log( popSelection );

        browser.storage.local.set(
            {
                savePath: savepath,
                minSize: minWidth,
                hoverPos: popSelection
            } )
            .then( onSet, onError );
    }

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