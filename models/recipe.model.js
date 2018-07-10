module.exports = function (mongoose) {
  let modelName = "recipe";
  let Types = mongoose.Schema.Types;
  let Schema = new mongoose.Schema({
    name: {
      type: Types.String,
      required: true
    },
    ingredients: {
      type: [Types.String],
      required: true
    },
    steps: {
      type: [Types.String],
      required: true
    }
  });
  
  Schema.statics = {
    collectionName: modelName,
    routeOptions: {}
  };
  
  return Schema;
};