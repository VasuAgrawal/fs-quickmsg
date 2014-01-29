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

		if (jqObject.html().length < 30)
			var playerName = $(jqObject.html()).text();
		else
			return null;
		
		var qtipContent = {
			overwrite: false,
			content: {
				text: playerName,
				attr: 'error',
			},
			position: {
				my: 'bottom center',
				at: 'top center'
			},
			show: {
				delay: 200
			},
			hide: {
				fixed: true,
				delay: 200
			},
			style: {
				classes: 'qtip-tipsy qtip-shadow'
			}
		}

		return qtipContent;
	};

	$('[href *= "index.php?cmd=profile&player_id="]').each(function(){		
		var config = makeConfig($(this));
		$(this).qtip(config);
	});
});



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