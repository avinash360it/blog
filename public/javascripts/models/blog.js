/**
 * Created by root on 31/3/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title       : String,
    content     : String,
    image       : String,
    comments    : [{ body : String , userId : String , date : Date }],
    authorId    : String,
    tags        : [{tagName: String}],
    createdAt   : Date
});

var Blog = mongoose.model('Blog',blogSchema);
module.exports = Blog;