// ==UserScript==
// @name       AddMessage
// @version    0.1
// @description  Script to add a [m] tag next to player names for quick messaging.
// @include      http://fallensword.com/*
// @include      http://www.fallensword.com/*
// @copyright  2012+, aa0007
// @require http://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==

$( function() {

	$('[href *= "index.php?cmd=profile&player_id="]').each(function(){
		$(this).parentsUntil('[style="display: block"]').last().attr('cellpadding',0);
		$(this).parentsUntil('[cellpadding]').last().attr('cellpadding',0);
	});


	$('[href *= "index.php?cmd=profile&player_id="]')
	.each(function(){
		if (($(this).html().length < 30) && ($(this).parent().parent().parent().parent().attr('class') != 'player-list') ){
						
			var playerName = $($(this).html()).text();

			var argumentMsg = '<a href="javascript:openQuickMsgDialog(' + '&quot;' + playerName + '&quot;' + ');" style="font-size:10px; text-decoration: none"> [m]</a>'
			//var argumentBuff = '<a href="javascript:openWindow(' + '&quot;' + 'index.php?cmd=quickbuff&t=' + playerName + '&quot;' + ', \'fsQuickBuff\', 618, 1000, \',scrollbars\');" style="font-size:10px; text-decoration: none">[b]</a>'
			var argument = argumentMsg;// + argumentBuff;
			$(this).after(argument);
		}
	});
});