const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String },
    content: { type: String },
    image: { type: String },
    createdAt: { type: Date },
    categoryId: { type: String, required: true },
});

module.exports = mongoose.model('Article', articleSchema);
