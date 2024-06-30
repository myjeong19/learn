import { authenticationsService } from 'common';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

userSchema.pre('save', async function (done) {
  if (this.isModified('password') || this.isNew) {
    const hashedPassword = await authenticationsService.pwdToHash(this.get('password') as string);
    this.set('password', hashedPassword);
  }

  done();
});

const User = mongoose.model('Post', userSchema) || mongoose.model('comment', userSchema);

export default User;
