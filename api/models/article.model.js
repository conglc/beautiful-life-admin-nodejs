const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, required: true },
    categoryId: { type: String, required: true },
});

module.exports = mongoose.model('Article', articleSchema);
