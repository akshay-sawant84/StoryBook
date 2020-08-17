const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../helper/authHelper");

const Content = require("../models/Content");
const User = require("../models/UserModel");
// const { route } = require("./Auth");
// const { route } = require('./Auth');

//get stories
router.get("/newsfeed", ensureAuth, (req, res) => {
  Content.find({ status: "Public" })
    .populate("user")
    .sort({ date: "desc" })
    .then((data) => {
      res.render("newsfeed/index", {
        name: req.user.name,
        stories: data,
      });
    });
});

// show user stories only

router.get("/dashboard", ensureAuth, (req, res) => {
  Content.find({ user: req.user.id }).then((data) => {
    res.render("profile/index", {
      user: req.user,
      stories: data,
    });
  });
});

//my stories
router.get("/my", ensureAuth, (req, res) => {
  Content.find({ user: req.user.id })
  .populate('user')
  .then((data) => {
    res.render("profile/mystories", {
      user: req.user,
      stories: data,
    });
  });
});

router.get("/userContent/:id", ensureAuth, (req, res) => {
    Content.find({ user : req.params.id, status : "Public" })
    .populate('user')
    .then((data) => {
      res.render("profile/showstories", {
        stories : data
      })
    })
});

//add stories ui page
router.get("/story/add", ensureAuth, (req, res) => {
  res.render("newsfeed/add");
});

//add stories form
router.post("/stories", (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({ text: "Title Should not be empty" });
  }

  if (!req.body.description) {
    errors.push({ text: "description should not be empty" });
  }

  if (errors.length > 0) {
    res.render("newsfeed/add", {
      title: req.body.title,
      description: req.body.description,
      errors: errors,
    });
  } else {
    const newContent = {
      user: req.user.id,
      status: req.body.status,
      commentAllowance: Boolean(req.body.commentAllow),
      title: req.body.title,
      description: req.body.description,
    };
    const story = new Content(newContent);
    story
      .save()
      .then((data) => {
        req.flash("success_msg", "Story Added Successfully");
        res.redirect("/newsfeed");
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

//more info about story
router.get("/story/:id", ensureAuth, (req, res) => {
  Content.findOne({ _id: req.params.id })
    .populate("user")
    .then((data) => {
      res.render("newsfeed/show", {
        data,
      });
    })
    .catch((err) => console.log(err));
});

//edit story ui page
router.get("/edit/:id", ensureAuth, (req, res) => {
  Content.findOne({ _id: req.params.id })
    .then((story) => {
      res.render("newsfeed/edit", {
        data: story,
      });
    })
    .catch((err) => console.log(err));
});

//edit story
router.put("/stories/:id", ensureAuth, (req, res) => {
  Content.findOne({ _id: req.params.id })
    .then((data) => {
      data.title = req.body.title;
      data.description = req.body.description;
      data.status = req.body.status,
      data.commentAllowance = Boolean(req.body.commentAllow),
      data
        .save()
        .then((data) => {
          req.flash("success_msg", "Story Edited Successfuly");
          res.redirect("/story/" + data._id);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

//delete story
router.delete("/story/:id", ensureAuth, (req, res) => {
  Content.deleteOne({ _id: req.params.id }).then(() => {
    req.flash("success_msg", "Story Deleted Successfully");
    res.redirect("/newsfeed");
  });
});

// ************************************
// ====== Comment section of Story =====
// ************************************

//add comment ui page
router.get("/comments/add/:id", (req, res) => {
  Content.find({ _id: req.params.id })
    .then((data) => {
      res.render("comments/add", {
        data: data[0],
      });
    })
    .catch((err) => console.log(err));
});

//add comment to database post method
router.post("/comments/:id", (req, res) => {
  Content.find({ _id: req.params.id }).then((content) => {
    let errors = [];
    if (!req.body.commentBody) {
      errors.push({ text: "comment should not be empty" });
    } else {
      const newComment = {
        commentBody: req.body.commentBody,
        commentingUser: req.user.displayName,
      };
      content[0].comments.unshift(newComment);

      content[0]
        .save()
        .then((content) => {
          req.flash("success_msg", "Comment added Successfully");
          res.redirect("/story/" + content._id);
        })
        .catch((err) => console.log(err));
    }
  });
});

router.put("/story/:id/commentedit/:commentId", (req, res) => {
  Content.find({ _id: req.params.id }).then((data) => {
    console.log(data);
  });
});

module.exports = router;
