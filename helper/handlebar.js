const moment = require("moment");

module.exports = {
  formatDate: function (date, format) {
    return moment(date).format(format);
  },
  truncate: function (str, len) {
    if (str.length > len && str.length > 0) {
      var new_str = str + " ";
      new_str = str.substr(0, len);
      new_str = str.substr(0, new_str.lastIndexOf(" "));
      new_str = new_str.length > 0 ? new_str : str.substr(0, len);
      return new_str + "...";
    }
    return str;
  },
  stripTags: function (input) {
    return input.replace(/<(?:.|\n)*?>/gm, "");
  },
  editIcon: function (storyUser, loggedUser, storyId, floating = true) {
    if (storyUser._id.toString() == loggedUser._id.toString()) {
      if (floating) {
        return `<a class="mr-2 btn btn-warning" href="/edit/${storyId}" role="button"><i
        class="fas fa-edit"></i></a>  <form class="d-inline" action="/story/${storyId}?_method=DELETE" method="POST">
        <input type="hidden" name="_method" value="DELETE">
        <button class="btn btn-danger" role="button"><i class="fas fa-trash"></i></button>
    </form>`;
      } else {
        return `<a href="/stories/edit/${storyId}"><i class="fa fa-pencil"></i></a>`;
      }
    } else {
      return "";
    }
  },
};
