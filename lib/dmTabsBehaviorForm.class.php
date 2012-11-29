<?php
/**
 * @author TheCelavi
 * @license http://www.runopencode.com/terms-and-conditions/free-for-all Free for all
 * @category Diem Extended Front behaviors
 * @version 1.0.0
 */
class dmTabsBehaviorForm extends dmBehaviorBaseForm {
    
    protected $animations = array(
        'none'=>'None',
        'slide'=>'Slide',
        'show' => 'Show',
        'fade'=>'Fade'
    );
    
    protected $events = array(
        'click'=>'Mouse click',
        'mouseover'=>'Mouse over'
    );
    
    protected $themes;
    
    protected $titles = array(
        'at_top' => 'Titles at top, contents at the bottom',
        'alternate' => 'Titles and contents alternating'
    );

    public function __construct($behavior, $options = array(), $CSRFSecret = null)
    {
        $keys = array_keys(sfConfig::get('dm_dmTabsBehavior_themes'));        
        $values = array();
        foreach ($keys as $key) $values[] = dmString::humanize ($key);
        $this->themes = array_combine($keys, $values);
        
        parent::__construct($behavior, $options, $CSRFSecret);
    }

    
    public function configure() {
        
        $this->widgetSchema['inner_target'] = new sfWidgetFormInputText();
        $this->validatorSchema['inner_target'] = new sfValidatorString(array(
            'required' => false
        ));
        
        $this->widgetSchema['theme'] = new sfWidgetFormChoice(array(
            'choices'=> $this->getI18n()->translateArray($this->themes)
        ));
        $this->validatorSchema['theme'] = new sfValidatorChoice(array(
            'choices'=>  array_keys($this->themes)
        ));
        
        $this->widgetSchema['title'] = new sfWidgetFormChoice(array(
            'choices'=> $this->getI18n()->translateArray($this->titles)
        ));
        $this->validatorSchema['title'] = new sfValidatorChoice(array(
            'choices'=>  array_keys($this->titles)
        ));
        
        $this->widgetSchema['event'] = new sfWidgetFormChoice(array(
            'choices'=>$this->getI18n()->translateArray($this->events)
        ));
        $this->validatorSchema['event'] = new sfValidatorChoice(array(
            'choices'=>  array_keys($this->events)
        ));
        
        $this->widgetSchema['animation'] = new sfWidgetFormChoice(array(
            'choices'=> $this->getI18n()->translateArray($this->animations)
        ));
        $this->validatorSchema['animation'] = new sfValidatorChoice(array(
            'choices'=>  array_keys($this->animations)
        ));
        
        $this->widgetSchema['duration'] = new sfWidgetFormInputText();
        $this->validatorSchema['duration'] = new sfValidatorInteger(array(
            'min'=>0
        )); 
        
        $this->widgetSchema['easing'] = new dmWidgetFormChoiceEasing();
        $this->validatorSchema['easing'] = new dmValidatorChoiceEasing(array(
            'required' => true
        ));
        
        $this->widgetSchema['initialy_open'] = new sfWidgetFormInputText();
        $this->validatorSchema['initialy_open'] = new sfValidatorInteger(array(
            'min'=>1
        )); 
        
        $this->getWidgetSchema()->setLabels(array(
            'title' => 'Tab titles'
        ));
        
        $this->getWidgetSchema()->setHelps(array(
            'title'=>'Tabs titles position in relation with tabs contents',
            'duration' => 'Duration of the animation in ms',
            'initialy_open' => 'The order number of initialy opened tab'
        ));
        
        $defaults = sfConfig::get('dm_dmTabsBehavior_defaults');
        
        if (is_null($this->getDefault('inner_target'))) $this->setDefault ('inner_target', $defaults['inner_target']);
        if (is_null($this->getDefault('theme'))) $this->setDefault ('theme', $defaults['theme']);
        if (is_null($this->getDefault('title'))) $this->setDefault ('title', $defaults['title']);
        if (is_null($this->getDefault('event'))) $this->setDefault ('event', $defaults['event']);
        if (is_null($this->getDefault('animation'))) $this->setDefault ('animation', $defaults['animation']);
        if (is_null($this->getDefault('easing'))) $this->setDefault ('easing', $defaults['easing']);
        if (is_null($this->getDefault('duration'))) $this->setDefault ('duration', $defaults['duration']);
        if (is_null($this->getDefault('initialy_open'))) $this->setDefault ('initialy_open', $defaults['initialy_open']);
                
        parent::configure();
    }
    
}

