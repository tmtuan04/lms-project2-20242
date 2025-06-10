import cloudinary from "./cloudinary";

export async function getVideoMetadata(publicId: string) {

  const result = await cloudinary.api.resource(publicId, {
    resource_type: 'video',
  });

  console.log('Cloudinary result:', result);
  return result.duration;
}