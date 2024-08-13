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

  // 배열
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

// 사전 처리
userSchema.pre('save', async function (done) {
  if (this.isModified('password') || this.isNew) {
    // 사용자 저장 전, 비밀번호 암호화
    const hashedPassword = await authenticationsService.pwdToHash(this.get('password') as string);
    this.set('password', hashedPassword);
  }

  done();
});

const User = mongoose.model('Post', userSchema) || mongoose.model('comment', userSchema);

export default User;
