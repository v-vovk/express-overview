import Post from './Post.js';
import FileService from './FileService.js';

class PostService {
  async create(post, picture) {
    const fileName = await FileService.saveFile(picture);
    return await Post.create({
      ...post,
      picture: fileName,
    });
  }

  async getAll() {
    const posts = await Post.find();
    return posts;
  }

  async getOne(id) {
    if (!id) {
      throw new Error('id is absent');
    }

    const post = await Post.findById(id);
    return post;
  }

  async update(post) {
    if (!post._id) {
      throw new Error('id is absent');
    }

    const updatedPost = await Post.findByIdAndUpdate(post._id, post,
        {new: true});
    return updatedPost;
  }

  async delete(id) {
    if (!id) {
      throw new Error('id is absent');
    }
    const post = await Post.findByIdAndDelete(id);
    return post;
  }
}

export default new PostService();
