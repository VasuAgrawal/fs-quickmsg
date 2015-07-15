# FallenSwordQuickMsg #

This script has been tested to work on [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) on Chrome (latest). It **should** work on Greasemonkey in Firefox without any hitches, but please let me know if it doesn't.

If you have Tampermonkey/Greasemonkey set up, you should be able to install the script [here](https://fs-quickmsg.googlecode.com/git/AddMessage.user.js).

Usage:

Hovering over any player's name which shows a link (ie. is underlined) will display a tooltip. Initially the tooltip will show the player's name (which can be clicked on to bring you to the player's profile) and a few useful links:

  * `[M]` - Message the player in the standard JS popup.
  * `[B]` - Buff the player from a new window.
  * `[AH]` - View the player's auction house.
  * `[ST]` - Send the player a secure trade.
  * `[T]` - Send items to the player.

After a brief period, you will also see the following data:

  * **Last Seen:** Activity, in the form of `#d(ays) #h(ours) #m(inutes) #s(econds)`
  * **Level:** Current Level / Virtual Level
  * **Joined:** Join date
  * **Attack:** Attack, with bonuses in parenthesis
  * **Defense:** Defense, with bonuses in parenthesis
  * **Armor:** Armor, with bonuses in parenthesis
  * **Damage:** Damage, with bonuses in parenthesis
  * **HP:** HP, with bonuses in parenthesis
  * **Gold:** Gold on hand
  * **Bank:** Banked gold
  * **Stamina:** Current Stamina / Total Stamina, with bonuses in parenthesis

The tooltip will disappear when clicked or when you move your mouse away from the player name. In addition the tooltip will disappear when you click on any of the links inside.

Note: Data retrieved in a tooltip will be stored while on that webpage. This means that if you hover over another link pointing to the same player, the tooltip will display all of the info instantly, however the information will be the same as what was retrieved the first time. If you would like to fetch new data, simply refresh the page, or click on the link pointing to the player's page.