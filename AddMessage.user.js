// ==UserScript==
// @name       FallenSwordQuickMsg
// @version    1.02
// @description  Script to add some quick links in a tooltip when hovering over a player's name. This will also show some data about the player. No warranty is expressed or implied. Use at your own risk.
// @include      http://fallensword.com/*
// @include      http://www.fallensword.com/*
// @copyright  2012+, aa0007
// @require http://code.jquery.com/jquery-1.10.2.min.js
// @require http://cdn.jsdelivr.net/qtip2/2.2.0/jquery.qtip.min.js
// @resource qtipCSS https://fs-quickmsg.googlecode.com/git/qtip.css
// @downloadURL https://fs-quickmsg.googlecode.com/git/AddMessage.user.js
// @updateURL https://fs-quickmsg.googlecode.com/git/AddMessage.user.js
// @grant GM_addStyle
// @grant GM_getResourceText
// ==/UserScript==

$( function() {

	GM_addStyle(GM_getResourceText('qtipCSS'));

	var playerProfileData = new Array();

	var setContent = function(event, api){
		var player = api.get('content.attr').split(' ');
		var pID = 'player' + player[0] + player[1];
		var msgID = 'msg' + player[0] + player[1];
		var buffID = 'buff' + player[0] + player[1];
		var ahID = 'ah' + player[0] + player[1];
		var stID = 'st' + player[0] + player[1];
		var sendID = 'send' + player[0] + player[1];
		var seenID = 'seen' + player[0] + player[1];
		var ajaxID = 'ajax' + player[0] + player[1];
		var argumentPlayer = '<div class = "' + pID + '">' + player[0] + '</div>';
		var argumentMsg = '<span class = "' + msgID + '">[M] </span>';
		var argumentBuff = '<span class = "' + buffID + '">[B] </span>';
		var argumentAH = '<span class = "' + ahID + '">[AH] </span>';
		var argumentST = '<span class = "' + stID + '">[ST] </span>';
		var argumentSend = '<span class = "' + sendID + '">[T]</span>';
		var argumentSeen = '<div class = "' + seenID + '"></div>';
		var argumentAjax = '<div class = "' + ajaxID + '"></div>';

		var isMe = false;
		var profileURL = 'http://fallensword.com/index.php?cmd=profile&player_id=' + player[1];

		if ($('#statbar-character').html() == player[0]){
			profileURL = 'http://fallensword.com/index.php?cmd=profile';
			isMe = true;
		}		

		var contentText = '<div style = "text-align: center">' + argumentPlayer + argumentMsg + argumentBuff + argumentAH + argumentST + argumentSend + '</div>' + argumentSeen + argumentAjax;
		api.set('content.text',contentText);
	
		$('.' + pID).on('click', function(){window.location.assign(profileURL);});
		$('.' + msgID).on('click', function(){openQuickMsgDialog(player[0]); });
		$('.' + buffID).on('click', function(){openWindow('index.php?cmd=quickbuff&t=' + player[0],'fsQuickBuff', 618, 1000,'scrollbars');});
		$('.' + ahID).on('click', function(){window.location.assign('http://fallensword.com/index.php?cmd=auctionhouse&type=-3&tid=' + player[1]);});
		$('.' + stID).on('click', function(){window.location.assign('http://fallensword.com/index.php?cmd=trade&subcmd=createsecure&target_username=' + player[0]);});
		$('.' + sendID).on('click', function(){window.location.assign('http://fallensword.com/index.php?cmd=trade&target_player=' + player[0]);});

		var ajaxContent;
		if (playerProfileData[player[0] + player[1]] != undefined){
			ajaxContent = playerProfileData[player[0] + player[1]];
			$('.' + ajaxID).html(ajaxContent);
		}
		else {
			$.get(profileURL, function(data){

				if (data.search('This profile is no longer available.') > -1){
					var ajaxContent = 'This player does not exist.';
					$('.' + msgID).html('');
					$('.' + buffID).html('');
					$('.' + ahID).html('');
					$('.' + stID).html('');
					$('.' + sendID).html('');

					$('.' + ajaxID).html(ajaxContent);
					playerProfileData[player[0] + player[1]] = ajaxContent;
				} 
				else {
					
					if (!isMe){
						var timeSeenArr = $(data).find(':contains("Last Activity")').last().html().split(/\D/);
						var timeSeen = new Array();
						var tempIndex = 0;
						for (var i = 0, arrLen = timeSeenArr.length; i< arrLen; i++){
							if (timeSeenArr[i] != ''){
								timeSeen[tempIndex] = timeSeenArr[i];
								tempIndex++;
							}
						}
						var seenContent = '<div style = "text-align: center">Last Seen: <span style = "font-weight: normal">' + timeSeen[0] + 'd ' + timeSeen[1] + 'h ' + timeSeen[2] + 'm ' + timeSeen[3] + 's </span></div>';
						$('.' + seenID).html(seenContent);
					}

					var stats = Array();

					$(data).find('table:contains("Level")').children('tbody').children('tr').each(function(){
						tempArray = $(this).text().split('\n');
						for (var i = 0, size = tempArray.length; i < size; i++){
							var letterStart = tempArray[i].search(/\w/);
							var colonPos;
							if (letterStart>-1){
								colonPos = tempArray[i].search(':');
								var key = tempArray[i].substring(letterStart,colonPos);
								var value;
								if (key === 'VL'){
									value = tempArray[i].slice(colonPos+1);
								}
								else if (key === 'Level'){
									value = tempArray[i].slice(colonPos+2);
									value.replace(',','');
								}
								else{
									value = tempArray[i].slice(colonPos+2);					
								}
								stats[key] = value;
							}
						}
					});

					ajaxContent = '<br/><div style = "font-size: 10.5px"><table width = "165 px">' +
						'<tr><td>Level:</td><td><div style = "text-align: right; font-weight: normal">' + stats['Level'] + ' / ' + stats['VL'] + '</div></td></tr>' +
						'<tr><td>Joined:</td><td><div style = "text-align: right; font-weight: normal">' + stats['Joined'] + '</div></td></tr>' + 
						'<tr><td>Attack:</td><td><div style = "text-align: right; font-weight: normal">' + stats['Attack'] + '</div></td></tr>' + 
						'<tr><td>Defense:</td><td><div style = "text-align: right; font-weight: normal">' + stats['Defense'] + '</div></td></tr>' + 
						'<tr><td>Armor:</td><td><div style = "text-align: right; font-weight: normal">' + stats['Armor'] + '</div></td></tr>' + 
						'<tr><td>Damage:</td><td><div style = "text-align: right; font-weight: normal">' + stats['Damage'] + '</div></td></tr>' +
						'<tr><td>HP:</td><td><div style = "text-align: right; font-weight: normal">' + stats['HP'] + '</div></td></tr>' + 
						'<tr><td>Gold:</td><td><div style = "text-align: right; font-weight: normal">' + stats['Gold'] + '</div></td></tr>' + 
						'<tr><td>Bank:</td><td><div style = "text-align: right; font-weight: normal">' + stats['Bank'] + '</div></td></tr>' + 
						'<tr><td>Stamina:</td><td><div style = "text-align: right; font-weight: normal">' + stats['Stamina'] + '</div></td></tr>' + 						
						'</table></div>';		

					$('.' + ajaxID).html(ajaxContent);
					playerProfileData[player[0] + player[1]] = ajaxContent;
				}
			}).fail(function(){
				console.log('Unable to fetch player data. Please check your internet connection!');
			});
		}
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
			position: { my: 'left top', at: 'center right', adjust: { method: 'flip' } },
			show: { delay: 50 },
			hide: { fixed: true, delay: 90, event: 'mouseout mousedown' },
			style: { classes: 'qtip-tipsy', width: 185},
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