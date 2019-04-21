import FusePouchDb from '../src/main';

describe("FusePouchDB", function() {
  var fusePouchDb = new FusePouchDb('specdb');
  beforeAll(function(){
    return fusePouchDb.bulkDocs([
      {title: 'prueba', _id: 'doc1'},
      {title: 'prueba 2', _id: 'doc2'},
      {title: 'prueba 3', _id: 'doc3'}
    ]); 
  });
  it("Expect to show all documents", function() {
    return fusePouchDb.fusedSearch({keys:['title']},'prueba').then(function(docs){
      expect(docs.length).toEqual(3);
    });
  });
  it("Expect to find one document", function() {
    return fusePouchDb.fusedSearch({keys:['title']},'2').then(function(docs){
      expect(docs.length).toEqual(1);
    });
  });
  afterAll(function(){
    return fusePouchDb.destroy();
  });
});

