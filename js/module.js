/**
 * JavaScript required by the search automcomplete block
 *
 * @copyright  2013 University of Bath
 * @author Hittesh Ahuja
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
console.log("ejecutandose");
M.search_autocomplete = M.search_autocomplete || {};
M.search_autocomplete.block_name = "searchcourses";
// M.cfg.wwwroot + '/blocks/searchcourses/result.php?query={query}&course_count=' + params.course_count + '&my_courses_flag=' + params.mycourseflag

const cursos =[]

function reqListener() {
  console.log(this.responseText);
}

var oReq = new XMLHttpRequest(); // New request object
oReq.onload = function () {
  const response = JSON.parse(this.responseText)

  console.log("valeria")
  for (const property in response.results) {
    const obj = new Object()
    obj['id'] =property
    obj['fullname'] =response.results[property].fullname
    obj['shortname'] =response.results[property].shortname
    cursos.push(obj)
  }
  console.log("hidalgo")
  // This is where you handle what to do with the response.
  // The actual data is found on this.responseText
  alert(this.responseText); // Will alert: 42
};
oReq.open("get", `${M.cfg.wwwroot}/blocks/searchcourses/vale.php`, true);
//                               ^ Don't block the rest of the execution.
//                                 Don't wait until the request finishes to
//                                 continue.
oReq.send();


var mio = document.getElementById("searchform_search");
mio.addEventListener("input", (e) => {
  console.log(cursos)
  console.log("click")
});

YUI().use(
  "autocomplete",
  "autocomplete-highlighters",
  "cookie",
  "transition",
  function (Y) {
    var params = [];

    
    const box = document.getElementById("inst23");
    const answers_box = document.createElement("div");
    box.appendChild(answers_box);

    

    var InpNode = Y.one("#id_q_62e6e50cf39b1");
    //var InpNode = document.getElementById('id_q_62e6edd67f6e4');
    //Autocomplete plugin
    M.search_autocomplete.AutoCompletePlugin(Y, InpNode, params);

    InpNode.on("click", function (e) {
      console.log("js input click");
      var my_courses_flag = Y.one("#my_courses_flag");
      var val = my_courses_flag.get("checked");
      if (params.length == 0) {
        params.course_count = [];
      }
      params.course_count = Y.one("#course_count").get("value");

      params.mycourseflag = val;
      M.search_autocomplete.AutoCompletePlugin(Y, this, params);
    });
  }
);

M.search_autocomplete.init = function (Y, params) {
  console.log("js search_autocomplete init");
  this.Y = Y;
  YUI().use(
    "autocomplete",
    "autocomplete-highlighters",
    "cookie",
    function (Y) {
      if (params.length == 0) {
        params.course_count = [];
      }
      //Add title to the value of the text-box
      var txtBox = Y.one("#id_q_62e6e50cf39b1");
      var my_courses_flag = Y.one("#my_courses_flag");
      var val = my_courses_flag.get("checked");
      var InpNode = Y.one("#id_q_62e6e50cf39b1");
    }
  );
};
M.search_autocomplete.txtHelper = function (textBox) {
  console.log("js search_autocomplete txtHelper");
  var label = textBox.get("title");
  textBox.set("value", label);
  textBox.on(["click", "focus"], function (e) {
    e.target.set("value", "");
  });
  textBox.on(["mousedown", "blur"], function (e) {
    e.target.set("value", label);
  });
};
M.search_autocomplete.AutoCompletePlugin = function (Y, node, params) {
  console.log("js search_autocomplete AutoCompletePlugin");
  if (typeof params === "undefined") {
    params.course_count = [];
  }

  function courseFormatter(query, results) {
    console.log("js course formatter");
    console.log("results: " + results[0].text);
    return Y.Array.map(results, function (result) {
      var course = result.raw;
      var coursename = course.fullname;
      var courseshortname = course.shortname;
      var idnumber = course.idnumber;
      var highlighted = result.highlighted;
      var courselink = M.cfg.wwwroot + "/course/view.php?id=" + course.id;
      console.log(
        "hello aqui",
        coursename,
        courseshortname,
        idnumber,
        highlighted,
        courselink
      );
      if (course.id == "na") {
        var msg = "<i>No Results</i>";

        return Y.Lang.sub(noResTemplate, {
          msg: msg,
        });
      }
      // Use string substitution to fill out the  template and
      // return an HTML string for this result.

      return Y.Lang.sub(courseTemplate, {
        coursename: coursename,
        courselink: courselink,
        courseshortname: courseshortname,
        idnumber: idnumber,
        highlighted: highlighted,
      });
    });
  } //End of courseFormatter function

  node.plug(Y.Plugin.AutoComplete, {
    resultFormatter: courseFormatter,
    resultHighlighter: "phraseMatch",
    resultListLocator: "results",
    alwaysShowList: true,
    resultTextLocator: "fullname",
    source:
      M.cfg.wwwroot +
      "/blocks/searchcourses/result.php?query={query}&course_count=" +
      params.course_count +
      "&my_courses_flag=" +
      params.mycourseflag,
  });
};
var noResTemplate =
  "<div class='course_results_ac'><div class='title'>{msg}</div></div>";
var courseTemplate =
  "<div class='course_results_ac'><a href='{courselink}'><div class='title'>({courseshortname}) {highlighted}</div></a></div>";
