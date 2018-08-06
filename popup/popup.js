$( document ).ready( () =>
{
	var enabledResult;

	//enabled setting
	let gettingItem = browser.storage.local.get(
		{
			enabled: true
		} );
	gettingItem.then( ( item ) =>
	{
		enabledResult = item.enabled;
		$( "#gpCheckBox" ).prop( "checked", enabledResult );
		console.log( "POPUP::RETRIEVED ENABLED STATE::" + item.enabled );
	} );

	//save path
	gettingItem = browser.storage.local.get(
		{
			savePath: ""
		} );
	gettingItem.then( ( item ) =>
	{
		enabledResult = item.savePath;
		console.log( "POPUP::RETRIEVED SAVE PATH::" + item.savePath );
	} );

	$( "#options" ).click( ( eventObject ) =>
	{
		browser.runtime.openOptionsPage();
	} );

	$( "#gpCheckBox" ).click( ( eventObject ) =>
	{
		var checkState = $( "#gpCheckBox" ).prop( "checked" );
		browser.storage.local.set( { enabled: checkState } )
			.then( () => { console.log( 'SAVED CHECK STATE::'+ checkState ); }, ( error ) => { console.log( error ) } );
	} );
} );