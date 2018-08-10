const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, alias: 'id'},
    title: { type: String, required: true },
    description: { type: String },
    content: { type: String },
    image: { type: String },
    createdAt: { type: Date },
    categoryId: { type: String, required: true },
});

if (!articleSchema.options.toObject) {
    articleSchema.options.toObject = {};
}
  
articleSchema.options.toObject.transform =  function(doc, ret) {
    // Set the id from the retrun object value which will be a string.
    ret.id = ret._id;

    delete ret._id;
    delete ret.__v;
};

module.exports = mongoose.model('Article', articleSchema);
