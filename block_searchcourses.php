<?php

/**
 * Admin Bookmarks Block page.
 *
 * @package    block
 * @subpackage searchcourses
 * @copyright  University of Bath 2013
 * @author      Hittesh Ahuja
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 *
 */

/**
 * The Search Courses Autocomplete block class
 */
class block_searchcourses extends block_base
{

    
        
    

    public function init()
    {
        $this->title = get_string('pluginname', 'block_searchcourses');
        echo "<script>console.log('blocksearch init' );</script>";
    }
    
    private function autocomplete_js()
    {
        global $PAGE, $CFG;
        $autocomplete = $CFG->wwwroot . '/blocks/searchcourses/js/module.js';
        $url          = new moodle_url($autocomplete);
        echo "<script>console.log('block_searchcourses autocomplete_js' );</script>";
        
        return $PAGE->requires->js($url);
    }
    public function applicable_formats()
    {
        echo "<script>console.log('block_searchcourses applicable_formats' );</script>";
        
        return array(
            'site' => true,
            'course-view' => true,
            'site-index' => true,
            'my' => true
        );
    }
    public function get_content()
    {
        echo "<script>console.log('block_searchcourses get_content' );</script>";
        global $CFG;
        $this->content = new stdClass();
        $params = array();
        $count = "";
        $module = array(
            'name' => 'course_search_ac',
            'fullpath' => '/blocks/searchcourses/js/module.js'
        );
        if (!is_null($this->config)) {
            $params = array(
                'course_count' => $this->config->course_count
            );
            $this->page->requires->data_for_js('ac_course_count', array(
                'count' => $this->config->course_count
            ));
           $count     = $this->config->course_count;
        }

        $form_html = "";
        $form_html .= $this->page->requires->js_init_call('M.search_autocomplete.init', array(
            $params
        ), false, $module);
        $form_html .= "<div id=\"course_search_ac\">";
        $form_html .= "<label for=\"id_q_62e6e50cf39b1\">" . get_string('search_label', 'block_searchcourses') . "</label>";
        $form_html .= "<input id=\"id_q_62e6e50cf39b1\" type = \"text\" title = \"Start here by typing a course...\"></input>";
        $form_html .= "<div id=\"my_courses_container\"><label for = \"my_courses_flag\">My Courses</label><input type=\"checkbox\" id=\"my_courses_flag\"  name=\"my_courses_flag\" value=\"0\"/></div>";
        $form_html .= "<input type=\"hidden\" id=\"course_count\" value=\"$count\" />";
        $form_html .= "</div>";
        $this->content->text = $form_html;
        
        return $this->content;
    }
}
