var PouchDB = require('pouchdb');
var Fuse = require('fuse.js');

class FusePouchDb extends PouchDB{
  constructor(options){
    if(typeof options == 'string'){
      super(options);
    }else{
      super(options.dbname,options.pouchdb ? options.pouchdb : {});
    }
    this.fuseOptions = options.fuse ? options.fuse : {};
  }
  getAllFused(options){
    return this.allDocs({include_docs: true}).then((docs)=>{
      var finalDocs = docs.rows.map((value)=>{
        return value.doc;
      });
      if(!finalDocs.length){
        throw 'Not Founded documents';
      }
      var fuseOptions = Object.assign({},options,this.fuseOptions);
      return new Fuse(finalDocs,fuseOptions);
    });
  }
  fusedSearch(options,word){
    return this.getAllFused(options).then((fused)=>{
      let fusedValue = fused.search(word);
      if(fusedValue.length){
        return fusedValue;
      }
      throw "Not Data Found In Fuse";
    });
  }
}

export default FusePouchDb;