import mongoose, { Schema } from 'mongoose';

const postSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true, // Corrected `require` to `required`
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

const Post = mongoose.models.Post || mongoose.model('post', postSchema);

export default Post;
