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
            hoverPos: 0, //default 0 = mouse position, 1 = top left
            drawBox: false
        } );
        gettingItem.then( ( item ) =>
        {
            //console.log( "Initialize()::OPTIONS::GOT STORAGE ITEM" );
            $( "#enabledStatus" ).text( item.enabled ? "Yes" : "No" );
            $( "#savePath" ).val( item.savePath );
            $( "#minWidth" ).val( item.minSize );
            if ( item.hoverPos == 0 )
                $( "#hoverPos" ).prop( "checked", true );
            else
                $( "#topLeft" ).prop( "checked", true );
            $( "#drawBox" ).prop( "checked", item.drawBox );
            $( "#drawBoxIndicator" ).text( item.drawBox ? "On" : "Off" );
            oldMinValue = $( "#minWidth" ).val();
        }, ( error ) => { console.log( "Initialize()::ERROR::" + error ); } );
    }

    $( "#saveButton" ).click( ( eventObject ) =>
    {
        SaveChanges();
    } );

    //save changes when radio button clicked
    $( "#hoverPos, #topLeft, #drawBox" ).on( "click", () =>
    {
        SaveChanges();
        $( "#drawBoxIndicator" ).text( $( "#drawBox" ).prop( "checked" ) ? "On" : "Off" );
    } );

    function SaveChanges()
    {
        //make sure min width value is a number
        if ( $.isNumeric( $( "#minWidth" ).val() ) )
            var minWidth = $( "#minWidth" ).val().trim();
        else
            var minWidth = oldMinValue;

        var savepath = $( "#savePath" ).val().trim();
        //remove any illegal characters from folder name
        savepath = savepath.replace( /[^a-z0-9]/gi, '_' );
        //remove any trailing backslash \
        // if ( savepath != "" && savepath[ savepath.length ] != '\\' )
        //     savepath = savepath + "\\";
        //console.log( "SAVING FOLDER::" + savepath );
        //get which radio button is checked
        var popSelection = $( "#hoverPos" ).prop( "checked" ) ? 0 : 1;
        //console.log( popSelection );
        var boxSelection = $( "#drawBox" ).prop( "checked" );
        // console.log( boxSelection );

        browser.storage.local.set(
            {
                savePath: savepath,
                minSize: minWidth,
                hoverPos: popSelection,
                drawBox: boxSelection
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
                $( "#enabledStatus" ).text( changes[ item ].newValue ? "Yes" : "No" );
            }
        }
    }

    browser.storage.onChanged.addListener( onStorageChange );
} );