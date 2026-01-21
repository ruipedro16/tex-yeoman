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
        type: "list",
        name: "lang",
        message: "Language:",
        choices: ["English", "Portuguese", "German"],
        default: "English"
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
        name: "gitignore",
        message: "Would you like to add a .gitignore?",
        default: true
      },
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
    this.fs.copyTpl(
      this.templatePath("preamble.tex"),
      this.destinationPath("preamble.tex"),
      { babelLang: this.props.lang.toLowerCase() }
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

    this.fs.copyTpl(
      this.templatePath("main.tex"),
      this.destinationPath("main.tex"),
      {
        documentClass: this.props.documentClass.toLowerCase(),
        title: this.props.title,
        subtitle: this.props.subtitle
          ? `\\posttitle{\\par\\end{center}\\begin{center}\\large ${this.props.subtitle}\\end{center}}`
          : ""
      }
    );

    this.fs.copyTpl(
      this.templatePath("Makefile"),
      this.destinationPath("Makefile"),
      {
        filename: "main"
      }
    );

    // F: if (this.props.acronyms) { }

    if (this.props.ci) {
      this.fs.copy(
        this.templatePath("ci.yml"),
        this.destinationPath(".github/workflows/ci.yml")
      );
    }

    if (this.props.gitignore) {
      this.fs.copy(
        this.templatePath(".gitignore"),
        this.destinationPath(".gitignore")
      );
    }

    if (this.props.precommitHook) {
      this.fs.copy(this.templatePath(".envrc"), this.destinationPath(".envrc"));

      fs.mkdirSync(this.destinationPath("hooks/"), { recursive: true });

      this.fs.copy(
        this.templatePath("pre-commit"),
        this.destinationPath("hooks/pre-commit")
      );
    }
  }

  end() {
    this.spawnCommand("direnv", ["allow"]);
  }
};
