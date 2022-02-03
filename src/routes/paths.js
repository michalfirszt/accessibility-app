const paths = {
  root: '/',
  posts: '/posts',
  post: (postId = null) => (postId ? `/posts/${postId}` : '/posts/:postId'),
  product: (productId = null) =>
    productId ? `/products/${productId}` : '/products/:productId',
  channels: '/channels',
  channel: (channelId = null) =>
    channelId ? `/channels/${channelId}` : '/channels/:channelId',
};

export default paths;
