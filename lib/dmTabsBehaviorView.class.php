<?php
/**
 * @author TheCelavi
 */
class dmTabsBehaviorView extends dmBehaviorBaseView {

    protected function filterBehaviorVars(array $vars = array()) {
        $vars = array_merge(sfConfig::get('dm_dmTabsBehavior_defaults'), parent::filterBehaviorVars($vars));
        return $vars;
    }

    public function getJavascripts() {
        return array_merge(
            parent::getJavascripts(),
            array(
                'lib.easing',
                'dmTabsBehaviorPlugin.launch'
            )
        );
    }

    public function getStylesheets() {
        $registeredThemes = sfConfig::get('dm_dmTabsBehavior_themes');
        $vars = $this->getBehaviorVars();
        $theme = array();
        if (isset($registeredThemes[$vars['theme']])) $theme[] = $registeredThemes[$vars['theme']];
        return array_merge(
            parent::getStylesheets(),
            $theme
        );
    }
}

