// ==UserScript==
// @name       AddMessage2
// @version    0.2
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

	var setContent = function(event, api){
		var player = api.get('content.attr').split(' ');
		var msgID = 'msg' + player[0] + player[1];
		var buffID = 'buff' + player[0] + player[1];
		var ahID = 'ah' + player[0] + player[1];
		var stID = 'ah' + player[0] + player[1];
		var sendID = 'ah' + player[0] + player[1];
		var argumentMsg = '<span id = "' + msgID + '">[M]</span>'
		var argumentBuff = '<span id = "' + buffID + '">[B]</span>'
		var argumentAH = '<span id = "' + ahID + '">[AH]</span>'
		var argumentST = '<span id = "' + stID + '">[ST]</span>'
		var argumentSend = '<span id = "' + sendID + '">[T]</span>'

		var contentText = '<div style = "text-align: center">' + player[0] + '<br/>' + argumentMsg + argumentBuff + argumentAH + argumentST + argumentSend + '</div>'; 
		api.set('content.text',contentText)
	
		$('#' + msgID).on('click', function(){openQuickMsgDialog(player[0]);});
		$('#' + buffID).on('click', function(){openWindow('index.php?cmd=quickbuff&t=' + player[0],'fsQuickBuff', 618, 1000,'scrollbars');});
		$('#' + ahID).on('click', function(){window.location.assign('http://fallensword.com/index.php?cmd=auctionhouse&type=-3&tid=' + player[1]);});
		$('#' + stID).on('click', function(){window.location.assign('http://fallensword.com/index.php?cmd=trade&subcmd=createsecure&target_username=' + player[0]);});
		$('#' + sendID).on('click', function(){window.location.assign('http://fallensword.com/index.php?cmd=trade&target_player=' + player[0]);});
	}

	var makeConfig = function(jqObject){
		
		var playerName = $(jqObject).text() || -1;
		var arrLen = jqObject.attr('href').split('player_id=').length || -1;
		var playerID = 0;
	
		if (arrLen > 0){
			playerID = jqObject.attr('href').split('player_id=')[arrLen -1];
		}

		var attributeText = playerName + ' ' + playerID;

		var qtipContent = {
			overwrite: false,
			content: { text: '', attr: attributeText},
			position: { my: 'bottom left', at: 'top left', adjust: { method: 'shift none' } },
			show: { delay: 50 },
			hide: { fixed: true, delay: 90 },
			style: { classes: 'qtip-tipsy qtip-shadow' },
			events: { render: setContent }
		};
		return qtipContent;
	};

	$('[href *= "index.php?cmd=profile&player_id="]').each(function(){		
		if (this.textContent.trim()){
			var inputHTML = $(this);
			var config = makeConfig(inputHTML);
			inputHTML.qtip(config);
		}
	});
});