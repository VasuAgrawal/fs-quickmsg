// ==UserScript==
// @name       AddMessage2
// @version    0.11
// @description  Script to add a [m] tag next to player names for quick messaging.
// @include      http://fallensword.com/*
// @include      http://www.fallensword.com/*
// @copyright  2012+, aa0007
// @require http://code.jquery.com/jquery-1.10.2.min.js
// @require http://cdn.jsdelivr.net/qtip2/2.2.0/jquery.qtip.min.js
// @resource qtipCSS http://cdn.jsdelivr.net/qtip2/2.2.0/jquery.qtip.min.css
// @downloadURL https://fs-quickmsg.googlecode.com/git/AddMessage.user.js
// @grant GM_addStyle
// @grant GM_getResourceText
// ==/UserScript==

$( function() {

	GM_addStyle(GM_getResourceText('qtipCSS'));

	var makeConfig = function(jqObject){
		
		var playerName = $(jqObject).text() || -1;
		var arrLen = jqObject.attr('href').split('player_id=').length || -1;
		var playerID = 0;
		if (arrLen > 0){
			playerID = jqObject.attr('href').split('player_id=')[arrLen -1];
		}

		var argumentMsg = '<a href="javascript:openQuickMsgDialog(' + '&quot;' + playerName + '&quot;' + ');" style="font-size:10px; "> [m] </a>';
		var argumentBuff = '<a href="javascript:openWindow(' + '&quot;' + 'index.php?cmd=quickbuff&t=' + playerName + '&quot;' + ', \'fsQuickBuff\', 618, 1000, \',scrollbars\');" style="font-size:10px;"> [b] </a>';

		var finalText = '<div style = "text-align: center;">' + playerName + '<br/>' + 'PID: ' + playerID + '<br/>' + '<div style = color: white !important;">' +  argumentMsg + argumentBuff + '</div>' + '</div>';

		var qtipContent = {
			overwrite: false,
			content: { text: finalText, attr: 'error' },
			position: { my: 'bottom left', at: 'top left', adjust: { 	method: 'shift none' } },
			show: { delay: 90 },
			hide: { fixed: true, delay: 200 },
			style: { classes: 'qtip-tipsy qtip-shadow' }
		}

		return qtipContent;
	};

	$('[href *= "index.php?cmd=profile&player_id="]').each(function(){		
		var config = makeConfig($(this));
		if (config.content.text == -1)
			return;
		else if (config.content.text != -1){
			$(this).qtip(config);
		}		
	});
});