<?php
require('../../config.php');
require_once($CFG->dirroot.'/mod/page/lib.php');
require_once($CFG->dirroot.'/mod/page/locallib.php');

$id      = optional_param('id', 0, PARAM_INT); 
$p       = optional_param('p', 0, PARAM_INT);  

if ($p) {
    if (!$page = $DB->get_record('page', array('id'=>$p))) {
        throw new \moodle_exception('invalidaccessparameter');
    }
    $cm = get_coursemodule_from_instance('page', $page->id, $page->course, false, MUST_EXIST);
} else {
    if (!$cm = get_coursemodule_from_id('page', $id)) {
        throw new \moodle_exception('invalidcoursemodule');
    }
    $page = $DB->get_record('page', array('id'=>$cm->instance), '*', MUST_EXIST);
}

$course = $DB->get_record('course', array('id'=>$cm->course), '*', MUST_EXIST);

require_course_login($course, true, $cm);
$context = context_module::instance($cm->id);
require_capability('mod/page:view', $context);

page_view($page, $course, $cm, $context);

$PAGE->set_url('/mod/page/view.php', array('id' => $cm->id));
$PAGE->set_title($course->shortname.': '.$page->name);
$PAGE->set_heading($course->fullname);

echo $OUTPUT->header();

$content = file_rewrite_pluginfile_urls($page->content, 'pluginfile.php', $context->id, 'mod_page', 'content', $page->revision);
$content = format_text($content, $page->contentformat, ['context' => $context]);
echo $OUTPUT->box($content, "generalbox center clearfix");

echo $OUTPUT->footer();