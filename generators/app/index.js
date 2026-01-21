"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

const fs = require("fs");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the striking ${chalk.red("tex-yeoman")} generator!`)
    );

    const prompts = [
      {
        type: "list",
        name: "documentClass",
        message: "Document class:",
        choices: ["article", "report", "book"],
        default: "article"
      },
      {
        type: "input",
        name: "title",
        message: "Title:",
        default: "Title"
      },
      {
        type: "input",
        name: "subtitle",
        message: "Subtitle:",
        default: ""
      },
      {
        type: "confirm",
        name: "acronyms",
        message: "Would you like to setup acronyms?",
        default: false
      },
      /* TODO: Setup refs.bib and cryptobib */
      {
        type: "confirm",
        name: "ci",
        message: "Would you like to setup CI (Github Actions)?",
        default: false
      },
      {
        type: "confirm",
        name: "precommitHook",
        message: "Would you like to setup precommit hooks?",
        default: false
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath("dummyfile.txt"),
      this.destinationPath("dummyfile.txt")
    );

    fs.mkdirSync(this.destinationPath("img/"), { recursive: true });

    if (
      this.props.documentClass === "article" ||
      this.props.documentClass === "report"
    ) {
      fs.mkdirSync(this.destinationPath("sections/"), { recursive: true });
    }

    if (this.props.documentClass === "book") {
      fs.mkdirSync(this.destinationPath("chapters/"), { recursive: true });
    }

    // F: if (this.props.subtitle) { }

    // F: if (this.props.acronyms) { }

    if (this.props.ci) {
      this.fs.copy(
        this.templatePath("ci.yml"),
        this.destinationPath(".github/workflows/ci.yml")
      );
    }
  }
};
