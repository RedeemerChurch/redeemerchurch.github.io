// To animate a smooth scroll for internal links within the page
$(function() {
    $(".navBar ul a").click(function(clickEvent) {
        var linkTarget = $(clickEvent.currentTarget);
        var navBarHeight = $(".navBar").height();
        var topOfElement = $(linkTarget.attr("href")).offset().top - navBarHeight;

        if ($("body").hasClass("sidepanel-open")) {
            $(".menuBtn").removeClass("toggled");
            $(".responsive-menu").removeClass("open");
            $("body").removeClass("sidepanel-open");
        }

        $("body").animate({
            scrollTop: topOfElement
        }, 500);

        clickEvent.preventDefault();
        return false;
    });

    // To toggle menu btn states
    $(".menuBtn").click(function() {
        $(".menuBtn").toggleClass("toggled");
        $(".responsive-menu").toggleClass("open");
        $("body").toggleClass("sidepanel-open");
    });

    // Media player scripting
    //create remainingTime viewpoint for the player
    MediaElementPlayer.prototype.buildtimeremaining = function(player, controls, layers, media) {
        var t = this;

        // add class to current time's parent
        controls.find('.mejs-currenttime').parent().addClass('mejs-currenttime-container');

        $('<div class="mejs-time mejs-remainingtime-container">' +
                '<span class="mejs-timeremaining">&#45;' + // use &minus; for a wider sign
                (t.options.duration > 0 ?
                    mejs.Utility.secondsToTimeCode(t.options.duration, t.options.alwaysShowHours || t.media.duration > 3600, t.options.showTimecodeFrameCount, t.options.framesPerSecond || 25) :
                    ((player.options.alwaysShowHours ? '00:' : '') + (player.options.showTimecodeFrameCount ? '00:00:00' : '00:00'))
                ) + '</span>' + '</div>')
            // append it to the toolbar
            .appendTo(controls);

        //attach element we want to update to t (this) for easier access
        t.timeremaining = t.controls.find('.mejs-timeremaining');

        // add a timeupdate event
        media.addEventListener('timeupdate', function() {
            if (t.timeremaining && t.media.duration) {
                //replace with whatever time you want to insert here
                t.timeremaining.html('&#45;' + mejs.Utility.secondsToTimeCode(t.media.duration - t.media.currentTime, t.options.alwaysShowHours || t.media.duration > 3600, t.options.showTimecodeFrameCount, t.options.framesPerSecond || 25));
            }
        }, false);
    };

    //setting the media player as a variable so we can call it later
    function intialisePlayer(audio) {
        new MediaElementPlayer(audio, {
            // removal of duration and addition of time remaining
            features: ['playpause', 'current', 'progress', 'timeremaining', 'volume']
        });
    }

    //On listen button clickevent, drop down the audio container
    $(".sermon-controls .play-button").click(function() {
        var targetListItem = $(this).closest('.list-item');

        targetListItem.find(".audio-container").toggleClass("expand");
        intialisePlayer(targetListItem.find('audio'));
    });
});
