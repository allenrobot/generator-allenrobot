'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

function firstLowerCase(str){
  if(!str || str.length<1){
    return str;
  }
  return str.slice(0,1).toLowerCase()+str.slice(1,str.length)
}

module.exports = class extends Generator {

  constructor(args,opts) {
    super(args,opts);


  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the impeccable ' + chalk.red('generator-allenrobot') + ' generator!'
    ));

    const prompts = [/*{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }*/];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const javaCompanyPackageName = "com.feinno";
    const javaCompanyPackagePathName = javaCompanyPackageName.replace(/\./g,"/");
    const javaDataSourceName = "bidbDataSource";


    let packageName = this.options['package-name'];
    const className = this.options['class-name'];   
    const columns = this.options['columns'];
    if(!columns || !packageName || !className){
      this.log([
        "Sorry",
        "I need more options to finish generate code",
        "please look this demo:",
        "yo allenrobot --package-name=bi/olap/config --class-name=DataSourceConfig --columns=NAME:名称,DATA_IP:IP地址",
        ].join("\n"))
      return ;
    }
    packageName = packageName.replace(/\./g,"/");
    const javaPackageName = packageName.replace(/\//g,".");
    const javaClassName = firstLowerCase(className);
    const packageLevel = !packageName?"..":packageName.split("/").map(function(){return ".."}).join("/");
    
    const params = {
      packageName:packageName,
      javaPackageName:javaPackageName,
      javaCompanyPackageName:javaCompanyPackageName,
      className:className,
      javaClassName:javaClassName,
      packageLevel:packageLevel,
      javaDataSourceName:javaDataSourceName,
      columns:columns
    }

    const serviceDestName = `dva\\services\\${packageName}\\${className}Service.js`;
    const modelDestName = `dva\\models\\${packageName}\\${className}Model.js`;
    const routeDestName = `dva\\routes\\${packageName}\\${className}Route.js`;
    const compDestName = `dva\\components\\${packageName}\\${className}\\${className}Comp.js`;
    const compEditModalDestName = `dva\\components\\${packageName}\\${className}\\${className}EditModal.js`;

    const compDestCssName = `dva\\components\\${packageName}\\${className}\\${className}Comp.css`;
    const routeDestCssName = `dva\\routes\\${packageName}\\${className}Route.css`;

   
    this.fs.copyTpl(
      this.templatePath('dva/services/users.js'),
      this.destinationPath(serviceDestName),
      params   
    );
    this.fs.copyTpl(
      this.templatePath('dva/models/users.js'),
      this.destinationPath(modelDestName),
      params   
    );
    this.fs.copyTpl(
      this.templatePath('dva/routes/Users.js'),
      this.destinationPath(routeDestName),
      params   
    );
    this.fs.copyTpl(
      this.templatePath('dva/components/Users/Users.js'),
      this.destinationPath(compDestName),
      params   
    );
    this.fs.copyTpl(
      this.templatePath('dva/components/Users/UserModal.js'),
      this.destinationPath(compEditModalDestName),
      params   
    );
    this.fs.copyTpl(
      this.templatePath('dva/routes/Users.css'),
      this.destinationPath(routeDestCssName),
      params   
    );
    this.fs.copyTpl(
      this.templatePath('dva/components/Users/Users.css'),
      this.destinationPath(compDestCssName),
      params   
    );

    //java
    const javaControllerDestName = `api\\${javaCompanyPackagePathName}\\controller\\${packageName}\\${className}Controller.java`;
    const javaServiceDestName = `api\\${javaCompanyPackagePathName}\\service\\${packageName}\\${className}Service.java`;
    const javaMapperDestName = `api\\${javaCompanyPackagePathName}\\mapper\\${packageName}\\${className}Mapper.java`;
    const javaMapperXmlDestName = `api\\${javaCompanyPackagePathName}\\mapper\\${packageName}\\${className}Mapper.xml`;

    this.fs.copyTpl(
      this.templatePath('api/controller/TempController.java'),
      this.destinationPath(javaControllerDestName),
      params   
    );
    this.fs.copyTpl(
      this.templatePath('api/service/TempService.java'),
      this.destinationPath(javaServiceDestName),
      params   
    );
    this.fs.copyTpl(
      this.templatePath('api/mapper/TempMapper.java'),
      this.destinationPath(javaMapperDestName),
      params   
    );
    this.fs.copyTpl(
      this.templatePath('api/mapper/TempMapper.xml'),
      this.destinationPath(javaMapperXmlDestName),
      params   
    );
  }

  install() {
    // this.installDependencies();
  }
};
