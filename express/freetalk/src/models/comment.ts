import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  content: {
    type: String,
    require: true,
  },
});

const Comment = mongoose.model('Post', commentSchema) || mongoose.model('comment', commentSchema);

export default Comment;
