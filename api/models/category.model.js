const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, alias: 'id'},
    name: { type: String, required: true }
});

if (!categorySchema.options.toObject) {
    categorySchema.options.toObject = {};
}
  
categorySchema.options.toObject.transform =  function(doc, ret) {
    // Set the id from the retrun object value which will be a string.
    ret.id = ret._id;

    delete ret._id;
    delete ret.__v;
};
  

module.exports = mongoose.model('Category', categorySchema);
