<?php
require_once('../../config.php');
require_login();

if(!defined('AJAX_SCRIPT')){
    define('AJAX_SCRIPT', true);
}

require_once($CFG->libdir . '/datalib.php');
global $CFG;
$USER;
$query            = $_GET['query'];
$my_courses_flag  = 0;
$total            = 0;
$courses['query'] = $query;
$course_count     = 10;

$courses['results'] = get_courses();
echo json_encode($courses);