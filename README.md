dmTabsBehaviorPlugin for Diem Extended
===============================

Author: [TheCelavi](http://www.runopencode.com/about/thecelavi)  
Version: 1.0.0  
Stability: Stable  
Date: November 29th, 2012  
Courtesy of [Run Open Code](http://www.runopencode.com)   
License: [Free for all](http://www.runopencode.com/terms-and-conditions/free-for-all)

dmTabsBehaviorPlugin enhance displayed content on the page converting some
HTML structure into tabbed control.

How to use?
---------------
dmTabsBehaviorPlugin expects one container which contains tabs titles and tabs contents,
per example:

	<container>
	    <title></title>
	    <title></title>
	    <title></title>
	    ...
	    <content></content>
	    <content></content>
	    <content></content>
	    ...
	</container>

dmTabsBehaviorPlugin can handle title and content alternating as well, which gives you
more flexibility:

	<container>
	    <title></title>
	    <content></content>
	    <title></title>
	    <content></content>
	    <title></title>
	    <content></content>
	    ...
	</container> 
	
Note that it is required that there have to be same number of `title` and `content` elements.

In this examples, `container`, `title` and `content` are for illustrative purpose, of course, they have to be a valid HTML tags (per example, `DIV` or `UL`/`LI`). The tag names used here 
are given to easily correlate with tabbed interface element.

However, the easiest way to use this behavior is to add even number of widgets into
zone, half of them for tab titles and half for content. It is required to attach the
behavior to the zone and that's it.

HTML output
---------------

The structure presented in previous text, the behavior will change to structure as 
presented below:

	<div class="dmTabsBehavior theme">
	    <div class="tab-titles-wrapper">
	        <title class="tab-title tab-title-index-0 tab-open"></title>    
	        <title class="tab-title tab-title-index-1 tab-closed"></title>    
	        <title class="tab-title tab-title-index-2 tab-closed"></title>
	    </div>
	    <div class="tab-contents-wrapper">
	        <content class="tab-content tab-content-index-0 tab-open"></content>
	        <content class="tab-content tab-content-index-1 tab-closed"></content>
	        <content class="tab-content tab-content-index-2 tab-closed"></content>
	    </div>
	</div>

Having in mind the following, you can easily style each aspect of the tabbed control
and adjust it to your design needs.

Note classes `tab-open` and `tab-closed` - they marking the state of each tabbed control
element.

Each tab title and tab content container have its index class for even more design
customisation. 

Configuration and theming
---------------
In `dmTabsBehaviorPlugin/config/dm/config.yml` are configuration parameters for this behavior.

	default:
	  dmTabsBehavior:
	    defaults:
	      inner_target: ''
	      theme: default
	      title: at_top
	      event: click
	      animation: slide
	      easing: jswing
	      duration: 500
	      initialy_open: 1
	    themes: 
	      default: 'dmTabsBehaviorPlugin.default'

If you have download the behavior via Github, you can modify this file. If you have installed
it via Composer, then you have to use Symfony config cascade to override this settings.

Section `defaults` contains default settings for behavior, which behavior form initially
displays. If you want some other settings to be shown as default, this is the place for
change.

Section `themes` is for theme, and it gets configured as `theme_key: path_to_css_file`. 
If user in behavior form selects a `default` theme, the tabbed view HTML structure will be:

	<div class="dmTabsBehavior default">
    	.... titles and contents
	</div>

Note that a `default` class is added, that is, the theme key. Of course, the theme CSS file
will be loaded as well. So, for you is just to theme it.
