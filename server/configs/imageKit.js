import ImageKit from "imagekit";

var imagekit = new ImageKit({
    publicKey : process.env.IK_PUBLIC_KEY,
    privateKey : process.env.IK_PRIVATE_KEY,
    urlEndpoint : process.env.IK_URL_END_POINT
});

export default imagekit